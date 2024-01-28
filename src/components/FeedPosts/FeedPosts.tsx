import { Container } from "@chakra-ui/react";
import FeedPost from "./FeedPost";

const FeedPosts = () => {
  return (
    <Container width={"100%"} py={4} px={2} border={"blue solid 1px"}>
      <FeedPost />
      {/* <FeedPost />
      <FeedPost />
      <FeedPost />
      <FeedPost /> */}
    </Container>
  );
};

export default FeedPosts;
