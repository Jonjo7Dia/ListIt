import { useEffect, useState } from "react";
import useShowToasts from "./useShowToasts";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import useAuthStore from "../store/authStore";

const useGetUserProfile = (username: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const authUser = useAuthStore((state) => state.user);
  const isOwner = username == authUser.username;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [listItems, setListItems] = useState<any[]>();
  const showToast = useShowToasts();
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, "users"),
          where(
            "username_lower",
            "==",
            username.toLowerCase().replace(/ /g, "-")
          )
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) return setUserProfile(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        let userDoc: any;
        querySnapshot.forEach((doc) => {
          userDoc = doc.data();
        });

        const posts = userDoc.posts;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let publicPosts: any[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lists: any[] = [];
        if (!isOwner) {
          publicPosts = posts.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (post: any) => post.isPublic === true
          );
        } else {
          publicPosts = posts;
        }
        publicPosts.forEach((post) => {
          lists.push({
            ...post,
            profilePicUrl: userDoc.profilePicUrl,
            username: userDoc.username,
          });
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        lists.sort((a: any, b: any) => {
          // Assuming createdAt is a Date object or timestamp
          return b.createdAt - a.createdAt;
        });
        setListItems(lists);
        setUserProfile(userDoc);
      } catch (error) {
        const err = error as Error;
        showToast("Error", err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, username, showToast]);

  return { isLoading, userProfile, listItems, isOwner };
};

export default useGetUserProfile;
