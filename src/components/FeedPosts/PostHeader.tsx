import { Avatar, Flex, Box } from "@chakra-ui/react";
import profilepic from "/profilepic.png";
const PostHeader = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      marginBottom={2}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={profilepic} size={"sm"} />
        <Flex fontSize={14} fontWeight={"bold"} gap={"2"}>
          jonoHjelmstrom
          <Box color={"gray.500"}>∙ 1w</Box>
        </Flex>
      </Flex>
      <Box></Box>
    </Flex>
  );
};

export default PostHeader;
