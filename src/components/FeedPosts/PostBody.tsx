import { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import styles from "./PostBody.module.scss"; // Import the CSS module
interface PostBodyProps {
  listName: string;
  listItems: string[];
}
const PostBody: React.FC<PostBodyProps> = ({ listName, listItems }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll(!showAll);

  const getWidthClass = (index: number) => {
    if (index === 0 || showAll) {
      return styles.widthFull;
    } else {
      switch (index) {
        case 1:
          return styles.width70;
        case 2:
          return styles.width50;
        default:
          return styles.widthFull;
      }
    }
  };

  return (
    <Flex direction={"column"}>
      <Text mb={2}>{listName}</Text>
      <Flex
        direction="column"
        align="center"
        gap={4}
        onClick={toggleShowAll}
        overflow={showAll ? "scroll" : "hidden"}
        height={"170px"}
        p={4}
        cursor="pointer"
      >
        {listItems.map((item, index) => {
          if (!showAll && index >= 3) return null;
          return (
            <Box
              key={index}
              className={getWidthClass(index)}
              background="#FFE8D8"
              textAlign="center"
              py={2}
              borderRadius={8}
            >
              <Text width="100%" textAlign="center" userSelect={"none"}>
                {listItems.length - index}. {item}
              </Text>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default PostBody;
