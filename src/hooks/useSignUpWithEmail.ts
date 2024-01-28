import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";

interface UserInputs {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToasts from "./useShowToasts";
const useSignUpWithEmail = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToasts();

  const signup = async (inputs: UserInputs) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.confirmPassword
    ) {
      showToast("Error", "please fill all user information please", "error");
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      showToast("Error", "passwords do not match", "error");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser && error) {
        showToast("Error", error.message, "error");
        return;
      }
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          bio: "",
          profilePicUrl: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast("Error", error.message, "error");
      } else {
        // Handle the case where the error is not an instance of Error
        showToast("Error", "An unknown error occurred", "error");
      }
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmail;
