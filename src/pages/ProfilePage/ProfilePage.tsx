import {
  Avatar,
  Button,
  Container,
  Flex,
  Link,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
// import FeedPost from "../../components/FeedPosts/FeedPost";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import useFollowUser from "../../hooks/useFollowUser";
import FeedPost from "../../components/FeedPosts/FeedPost";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { isLoading, userProfile, listItems, isOwner } = useGetUserProfile(
    username ? username : ""
  );
  const userNotFound = !isLoading && !userProfile;
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    userProfile?.uid
  );

  if (userNotFound) return <UserNotFound />;

  const createHandler = () => {
    navigate("/create");
  };
  return (
    <Container w="100%" padding={0}>
      {isLoading && <ProfileHeaderSkeleton />}
      {!isLoading && (
        <Flex
          justifyContent={"center"}
          direction={"column"}
          alignItems={"center"}
          gap={4}
          width={"100%"}
          borderBottom={"solid black 2px"}
          paddingBottom={4}
        >
          <Avatar
            src={userProfile.profilePicUrl}
            name={userProfile.username}
            size={"2xl"}
          />
          <Text fontWeight={"bold"}>{userProfile.username}</Text>
          {!isOwner && (
            <Button
              fontSize={12}
              onClick={handleFollowUser}
              isLoading={isUpdating}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </Flex>
      )}
      <Flex direction={"column"} px={4}>
        <Flex marginTop={4} marginBottom={4}>
          {isOwner && (
            <Button borderRadius={"full"} onClick={createHandler}>
              +
            </Button>
          )}
        </Flex>
        {listItems?.map((list, index) => (
          <FeedPost list={list} key={index} />
        ))}
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      justifyContent={"center"}
      direction={"column"}
      alignItems={"center"}
      gap={4}
      width={"100%"}
      borderBottom={"solid black 2px"}
      paddingBottom={4}
    >
      <SkeletonCircle size={"128px"} />

      <VStack
        alignItems={{ base: "center", sm: "flex-start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Skeleton height="24px" width="150px" />
      </VStack>
    </Flex>
  );
};

const UserNotFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link
        as={RouterLink}
        to={"/"}
        color={"blue.500"}
        w={"max-content"}
        mx={"auto"}
      >
        Go home
      </Link>
    </Flex>
  );
};
