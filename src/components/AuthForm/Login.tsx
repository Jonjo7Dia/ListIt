import { Alert, AlertIcon, Button, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

interface LoginProps {
  loginStateHandler: (loginState: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ loginStateHandler }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, error, login } = useLogin();
  return (
    <>
      <Input
        placeholder={"Email"}
        fontSize={16}
        type={"email"}
        borderColor={"BBC8D4"}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder={"Password"}
        borderColor={"BBC8D4"}
        type={"password"}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      {error && (
        <Alert status="error" fontSize={14} p={2} borderRadius={4}>
          <AlertIcon fontSize={13} />
          {error.message};
        </Alert>
      )}
      <Button
        w={"full"}
        colorScheme={"blue"}
        onClick={() => login(inputs)}
        isLoading={loading}
      >
        Log in
      </Button>
      <Text>
        Dont Have an account?{" "}
        <Link color={"blue"} onClick={() => loginStateHandler(false)}>
          Sign up
        </Link>
      </Text>
    </>
  );
};

export default Login;
