import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineModeComment } from "react-icons/md";
import classes from "./PostFooter.module.scss";

const PostFooter = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  const likedHandler = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <>
      <Flex
        alignItems={"center"}
        gap={4}
        w={"full"}
        pt={0}
        mb={2}
        mt={4}
        justifyContent={"space-between"}
      >
        <Box
          onClick={likedHandler}
          display={"flex"}
          flexDirection={"row"}
          gap={"2"}
        >
          <FaHeart
            className={`${classes["postFooter__like"]}${
              liked ? ` ${classes["postFooter__like--active"]}` : ""
            }`}
          />

          <MdOutlineModeComment />
        </Box>
        <Text fontWeight={600} userSelect={"none"}>
          {likes} likes
        </Text>
      </Flex>
      <Flex fontSize={14} color={"grey"}>
        <Text>View all 1,000 comments</Text>
      </Flex>
      <Flex
        alignItems={"center"}
        gap={2}
        justifyContent={"space-between"}
        w={"full"}
      >
        <InputGroup>
          <Input variant={"flushed"} placeholder={"Add a comment..."} />
          <InputRightElement>
            <Button font-size={14} bg={"transparent"}>
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </>
  );
};

export default PostFooter;
