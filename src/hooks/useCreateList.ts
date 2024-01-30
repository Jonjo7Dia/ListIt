import { useState } from "react";
import useShowToast from "./useShowToasts";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

interface List {
  listName: string;
  listItems: string[];
  isPublic: boolean;
  likes: string[];
  comments: string[];
  createdAt: Date;
  createdBy: string;
}

const useCreateList = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);

  const handleCreateList = async (list: List) => {
    if (isLoading) return false;
    setIsLoading(true);
    try {
      const userDocRef = doc(firestore, "users", authUser.uid);
      await updateDoc(userDocRef, {
        posts: arrayUnion(list),
      });
      return true; // Indicate success
    } catch (error) {
      const err = error as Error;
      showToast("Error", err.message, "error");
      return false; // Indicate failure
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, handleCreateList };
};

export default useCreateList;
