import { useToast } from "@chakra-ui/react";

type StatusTypes =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "loading"
  | undefined;

const useShowToasts = () => {
  const toast = useToast();
  const showToast = (
    title: string,
    description: string,
    status: StatusTypes
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useShowToasts;
