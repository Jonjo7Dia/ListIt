import {
  Container,
  Flex,
  VStack,
  SkeletonCircle,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import useGetFeedLists from "../../hooks/useGetFeedLists";

interface List {
  listName: string;
  listItems: string[];
  isPublic: boolean;
  likes: string[];
  comments: string[];
  createdAt: Date;
  createdBy: string;
  profilePicUrl: string;
  username: string;
}

const FeedPosts = () => {
  const { isLoading, feedLists } = useGetFeedLists();

  return (
    <Container width={"100%"} py={4} px={2}>
      {isLoading
        ? [0, 1, 2].map((_, idx) => (
            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
              <Flex gap="2">
                <SkeletonCircle size="10" />
                <VStack
                  gap={2}
                  alignItems={"flex-start"}
                  justifyContent={"center"}
                >
                  <Skeleton height="10px" w={"100px"} />
                </VStack>
              </Flex>
              <Skeleton w={"full"}>
                <Box h={"300px"}>contents wrapped</Box>
              </Skeleton>
            </VStack>
          ))
        : feedLists.map((post: List, index: number) => (
            <FeedPost key={index} list={post} />
          ))}
    </Container>
  );
};

export default FeedPosts;
