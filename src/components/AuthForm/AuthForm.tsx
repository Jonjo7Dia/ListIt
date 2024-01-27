import { Box, Button, Input, VStack, Text, Link } from "@chakra-ui/react";
import { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <>
      <Box>
        <VStack spacing={6}>
          <Input
            placeholder={"Email"}
            fontSize={16}
            type={"email"}
            borderColor={"BBC8D4"}
          />
          {!isLogin && (
            <Input
              placeholder={"Username"}
              fontSize={16}
              type={"text"}
              borderColor={"BBC8D4"}
            />
          )}
          <Input
            placeholder={"Password"}
            borderColor={"BBC8D4"}
            type={"password"}
          />

          {!isLogin && (
            <Input
              placeholder={"ConfirmPassword"}
              fontSize={16}
              type={"password"}
              borderColor={"BBC8D4"}
            />
          )}

          <Button w={"full"} colorScheme={"blue"}>
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
