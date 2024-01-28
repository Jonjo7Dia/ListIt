import { Container, Flex, Box } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";

const HomePage = () => {
  return (
    <Container>
      <Flex flex={2} py={10} border={"1px solid red"}>
        <Box width={"100%"}>
          <FeedPosts />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
