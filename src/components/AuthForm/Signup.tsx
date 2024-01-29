import {
  Alert,
  AlertIcon,
  Button,
  Input,
  Link,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmail from "../../hooks/useSignUpWithEmail";
import useShowToast from "../../hooks/useShowToasts";

interface SignupProps {
  loginStateHandler: (loginState: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ loginStateHandler }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    image: new File([], ""),
  });
  const { loading, error, signup } = useSignUpWithEmail();
  const showToast = useShowToast();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.size > 500 * 1024) {
      // 500KB
      showToast("Error", "File size should not exceed 500KB", "error");
    } else {
      setInputs({ ...inputs, image: file });
    }
  };

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={16}
        type="email"
        borderColor="BBC8D4"
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Username"
        fontSize={16}
        type="text"
        borderColor="BBC8D4"
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        placeholder="Password"
        borderColor="BBC8D4"
        type="password"
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      <Input
        placeholder="ConfirmPassword"
        fontSize={16}
        type="password"
        borderColor="BBC8D4"
        onChange={(e) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
      />
      <Box border="1px" borderColor="BBC8D4" borderRadius="md" p={2}>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          size="sm"
          variant="unstyled"
        />
      </Box>
      {error && (
        <Alert status="error" fontSize={14} p={2} borderRadius={4}>
          <AlertIcon fontSize={13} />
          {error.message};
        </Alert>
      )}
      <Button
        w="full"
        colorScheme="blue"
        onClick={() => signup(inputs)}
        isLoading={loading}
      >
        Signup
      </Button>
      <Text>
        Have an account?{" "}
        <Link color="blue" onClick={() => loginStateHandler(true)}>
          Login
        </Link>
      </Text>
    </>
  );
};

export default Signup;
