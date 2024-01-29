import { useEffect, useState } from "react";
import useShowToasts from "./useShowToasts";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";

const useGetUserProfile = (username: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToasts();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where("username_lower", "==", username.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return setUserProfile(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        let userDoc: any;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });
        setUserProfile(userDoc);
        console.log(userDoc);
      } catch (error) {
        const err = error as Error;
        showToast("Error", err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile };
};

export default useGetUserProfile;
