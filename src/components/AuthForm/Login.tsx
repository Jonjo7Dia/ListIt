import { Button, Input, Link, Text } from "@chakra-ui/react";
import { useState } from "react";

interface LoginProps {
  loginStateHandler: (loginState: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ loginStateHandler }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
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
      <Button w={"full"} colorScheme={"blue"}>
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
