import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const setLoginState = (logingState: boolean) => {
    setIsLogin(logingState);
  };

  return (
    <>
      <Box>
        <VStack spacing={6}>
          {isLogin ? (
            <Login loginStateHandler={setLoginState} />
          ) : (
            <Signup loginStateHandler={setLoginState} />
          )}
        </VStack>
      </Box>
    </>
  );
};

export default AuthForm;
