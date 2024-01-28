import { Container, Flex, Box } from "@chakra-ui/react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";

const HomePage = () => {
  return (
    <Container>
      <Flex flex={2} padding={"none"}>
        <Box width={"100%"} padding={"none"}>
          <FeedPosts />
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
