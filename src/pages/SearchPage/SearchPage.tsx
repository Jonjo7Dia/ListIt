import { Avatar, Button, Container, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchName, setSearchName] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const { isLoading, getUserProfile, user } = useSearchUser();

  const handleSearch = () => {
    getUserProfile(searchName);
  };
  useEffect(() => {
    if (user) {
      setShowResult(true);
      // Perform other actions based on the new user data
    }
  }, [user]);
  return (
    <Container display={"flex"} flexDirection={"column"} gap={"4"}>
      <Input
        type={"search"}
        placeholder="Search a Username"
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />

      <Button
        w={"100%"}
        visibility={searchName.length > 0 ? "visible" : "hidden"}
        isLoading={isLoading}
        onClick={handleSearch}
      >
        Search
      </Button>

      {showResult && (
        <Flex
          alignItems={"center"}
          gap={4}
          cursor={"pointer"}
          onClick={() => {
            navigate(`/${user.username}`);
          }}
        >
          <Avatar src={user.profilePicUrl} />
          <Text fontWeight={600}>{user.username}</Text>
        </Flex>
      )}
    </Container>
  );
};

export default SearchPage;
