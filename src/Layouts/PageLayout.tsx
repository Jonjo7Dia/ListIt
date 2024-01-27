import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import MenuButton from "../components/MenuButton/MenuButton";
import { useLocation } from "react-router-dom";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      minH="500px"
      width="100%"
      bg="gray.100"
    >
      <Box
        width="full"
        maxW="500px"
        minH="100vh"
        border={{ base: "none", md: "1px solid gray" }}
        bg="white"
        boxShadow={{ md: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
        borderRadius="md"
        p={4}
        position="relative" // Added for positioning the MenuButton
      >
        {pathname !== "/auth" && (
          <Flex position="absolute" top="0" right="0" p="4">
            <MenuButton />
          </Flex>
        )}
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
