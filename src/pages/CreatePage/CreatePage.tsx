import {
  Button,
  Container,
  Flex,
  FormControl,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateList from "../../hooks/useCreateList";
import useAuthStore from "../../store/authStore";

const CreatePage = () => {
  const [listName, setListName] = useState<string>("");
  const [lists, setLists] = useState<string[]>([""]);
  const authUser = useAuthStore((state) => state.user);

  const { isLoading, handleCreateList } = useCreateList();
  const [makePublic, setMakePublic] = useState(false);
  const navigate = useNavigate();

  const handleItemChange = (value: string, index: number) => {
    setLists((prevState) => {
      const updatedLists = [...prevState];
      updatedLists[index] = value;

      // Delete the last input field if it's empty and it's not the only field
      if (index === prevState.length - 1 && !value && prevState.length > 1) {
        updatedLists.pop();
      }
      // Add a new input field only if the current input is the last one,
      // it's not empty, and total fields are less than 10
      else if (
        index === prevState.length - 1 &&
        value &&
        prevState.length < 10
      ) {
        updatedLists.push("");
      }
      return updatedLists;
    });
  };

  const submitHandler = async () => {
    if (!listName || listName.length === 0) {
      alert("You must give a list name");
      return;
    }

    // Filter out empty strings from the lists array
    const filteredLists = lists.filter((item) => item.length > 0);

    if (filteredLists.length < 2) {
      alert("You must have at least 2 items");
      return;
    }

    const listData = {
      listName: listName,
      listItems: filteredLists,
      isPublic: makePublic,
      likes: [],
      comments: [],
      createdAt: new Date(), // Set the current date as creation date
      createdBy: authUser.uid, // Set the creator ID
    };

    const success = await handleCreateList(listData);

    if (success) {
      navigate(`/${authUser.username}`);
    } // Call the function to create the list
  };

  const backHandler = () => {
    if (lists[0].length > 0 || listName.length > 0) {
      alert("You have unsaved changes");
      return;
    }
    navigate(`/${authUser.username}`);
  };

  return (
    <Container>
      <Flex mb={4}>
        <Button onClick={backHandler}>Back</Button>
      </Flex>
      <FormControl display="flex" flexDirection="column" gap={4}>
        <Input
          placeholder="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        {lists.map((item, index) => (
          <Input
            key={index}
            placeholder={`${index + 1}. Add List Item`}
            value={item}
            onChange={(e) => handleItemChange(e.target.value, index)}
            borderStyle={item === "" ? "dashed" : "solid"}
          />
        ))}
        <Checkbox
          checked={makePublic}
          color={"grey"}
          onChange={() => {
            setMakePublic(!makePublic);
          }}
        >
          Make Public
        </Checkbox>
        <Button
          colorScheme="blue"
          onClick={submitHandler}
          isLoading={isLoading}
        >
          Submit List
        </Button>
      </FormControl>
    </Container>
  );
};

export default CreatePage;
