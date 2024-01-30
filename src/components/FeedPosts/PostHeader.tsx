import { Avatar, Flex, Box } from "@chakra-ui/react";

interface PostHeaderProps {
  profilePic: string;
  createdBy: string;
}
const PostHeader: React.FC<PostHeaderProps> = ({ profilePic, createdBy }) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      marginBottom={4}
    >
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={profilePic} size={"sm"} />
        <Flex fontSize={14} fontWeight={"bold"} gap={"2"}>
          {createdBy}
          <Box color={"gray.500"}>∙ 1w</Box>
        </Flex>
      </Flex>
      <Box></Box>
    </Flex>
  );
};

export default PostHeader;
