import { Box, Button, Input, VStack, Text, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      alert("please fill all the fields");
      return;
    }
    navigate("/");
  };
  return (
    <>
      <Box>
        <VStack spacing={6}>
          <Input
            placeholder={"Email"}
            fontSize={16}
            type={"email"}
            borderColor={"BBC8D4"}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          {!isLogin && (
            <Input
              placeholder={"Username"}
              fontSize={16}
              type={"text"}
              borderColor={"BBC8D4"}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          )}
          <Input
            placeholder={"Password"}
            borderColor={"BBC8D4"}
            type={"password"}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />

          {!isLogin && (
            <Input
              placeholder={"ConfirmPassword"}
              fontSize={16}
              type={"password"}
              borderColor={"BBC8D4"}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          )}

          <Button w={"full"} colorScheme={"blue"} onClick={handleAuth}>
            {isLogin ? "Log in" : "Signup"}
          </Button>
          {isLogin && (
            <Text>
              Don't have an account?{" "}
              <Link
                color={"blue"}
                onClick={() => {
                  setIsLogin(false);
                }}
              >
                Sign up
              </Link>
            </Text>
          )}
          {!isLogin && (
            <Text>
              Have an account?{" "}
              <Link
                color={"blue"}
                onClick={() => {
                  setIsLogin(true);
                }}
              >
                Login
              </Link>
            </Text>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default AuthForm;
