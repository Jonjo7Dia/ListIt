import { Alert, AlertIcon, Button, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmail from "../../hooks/useSignUpWithEmail";
interface SignupProps {
  loginStateHandler: (loginState: boolean) => void;
}
const Signup: React.FC<SignupProps> = ({ loginStateHandler }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const { loading, error, signup } = useSignUpWithEmail();
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
        placeholder={"Username"}
        fontSize={16}
        type={"text"}
        borderColor={"BBC8D4"}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder={"Password"}
        borderColor={"BBC8D4"}
        type={"password"}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      <Input
        placeholder={"ConfirmPassword"}
        fontSize={16}
        type={"password"}
        borderColor={"BBC8D4"}
        onChange={(e) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
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
        onClick={() => signup(inputs)}
        isLoading={loading}
      >
        Signup
      </Button>
      <Text>
        Have an account?{" "}
        <Link color={"blue"} onClick={() => loginStateHandler(true)}>
          Login
        </Link>
      </Text>
    </>
  );
};

export default Signup;
