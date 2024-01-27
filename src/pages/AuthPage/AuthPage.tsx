import { Container, Flex, Image, VStack } from "@chakra-ui/react";
import logo from "/Logo.svg";
import AuthForm from "../../components/AuthForm/AuthForm";
const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container
        maxW={"500px"}
        padding={35}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
      >
        <VStack spacing={8}>
          <Image
            borderRadius={"full"}
            boxSize={"100px"}
            src={logo}
            alt={"listit logo"}
          />
          <AuthForm />
        </VStack>
      </Container>
    </Flex>
  );
};

export default AuthPage;
