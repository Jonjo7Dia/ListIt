import { useState } from "react";
import useShowToast from "./useShowToasts";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
interface List {
  listName: string;
  listItems: string[];
  isPublic: boolean;
  likes: string[];
  comments: string[];
  createdAt: Date;
  createdBy: string;
}

const useGetFeedLists = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);

  const handleFetchFeedList = async () => {
    if (isLoading) return false;
    setIsLoading(true);

    try {
      const userDocRef = doc(firestore, "users", authUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        showToast("Error", "no data available", "error");
      }
      const followers = userDoc.data()?.followers ?? [];
      console.log(followers);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const publicLists = <any>[];
      for (const followerId of followers) {
        const followerDocRef = doc(firestore, "users", followerId);
        const followerDoc = await getDoc(followerDocRef);
        const followerData = followerDoc.data();
        const posts = followerData?.posts ?? [];
        const publicPosts = posts.filter(
          (post: List) => post.isPublic === true
        );
        publicPosts.forEach((post: List) => {
          publicLists.push({
            ...post,
            profilePicUrl: followerData?.profilePicUrl,
            username: followerData?.username,
          });
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      publicLists.sort((a: any, b: any) => {
        // Assuming createdAt is a Date object or timestamp
        return b.createdAt - a.createdAt;
      });

      return publicLists;
    } catch (error) {
      const err = error as Error;
      showToast("Error", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleFetchFeedList };
};

export default useGetFeedLists;
