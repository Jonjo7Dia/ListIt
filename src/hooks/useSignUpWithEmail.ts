import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, firestore, storage } from "../firebase/firebase";

interface UserInputs {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  image: File;
}
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import useShowToasts from "./useShowToasts";
import useAuthStore from "../store/authStore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const useSignUpWithEmail = () => {
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToasts();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginUser = useAuthStore((state) => state.login);

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

    const usersRef = collection(firestore, "users");

    const qUsername = query(usersRef, where("username", "==", inputs.username));
    const qEmail = query(usersRef, where("email", "==", inputs.email));
    const querySnapshotEmail = await getDocs(qEmail);
    const querySnapshotUsername = await getDocs(qUsername);

    if (!querySnapshotEmail.empty) {
      showToast("Error", "Email already exists", "error");
      return;
    }

    if (!querySnapshotUsername.empty) {
      showToast("Error", "Username already exists", "error");
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
        let profilePicUrl = "";

        if (inputs.image) {
          const imageRef = ref(
            storage,
            `profilePictures/${newUser.user.uid}/${inputs.image.name}`
          );
          const snapshot = await uploadBytes(imageRef, inputs.image);
          profilePicUrl = await getDownloadURL(snapshot.ref);
        }
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          username_lower: inputs.username.toLowerCase(),
          bio: "",
          profilePicUrl: profilePicUrl,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
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
