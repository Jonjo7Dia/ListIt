import { Avatar, Button, Container, Flex, Text } from "@chakra-ui/react";
import profilepic from "/profilepic.png";
import FeedPost from "../../components/FeedPosts/FeedPost";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const navigate = useNavigate();

  const createHandler = () => {
    navigate("/create");
  };
  return (
    <Container w="100%" padding={0}>
      <Flex
        justifyContent={"center"}
        direction={"column"}
        alignItems={"center"}
        gap={4}
        width={"100%"}
        borderBottom={"solid black 2px"}
        paddingBottom={4}
      >
        <Avatar src={profilepic} name={"jonoHjelmstrom"} size={"2xl"} />
        <Text fontWeight={"bold"}>jonoHjelmstrom</Text>
      </Flex>
      <Flex direction={"column"} px={4}>
        <Flex marginTop={4} marginBottom={4}>
          <Button borderRadius={"full"} onClick={createHandler}>
            +
          </Button>
        </Flex>
        <FeedPost />
        <FeedPost />
      </Flex>
    </Container>
  );
};

export default ProfilePage;
