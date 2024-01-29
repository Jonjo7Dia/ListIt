import { useState } from "react";
import useShowToast from "./useShowToasts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>();
  const showToast = useShowToast();

  const getUserProfile = async (username: string) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(firestore, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast("Error", "User not found", "error");

      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      const err = error as Error;
      showToast("Error", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
