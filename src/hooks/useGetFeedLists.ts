import { useEffect, useState } from "react";
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
  profilePicUrl: string;
  username: string;
}

const useGetFeedLists = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const [feedLists, setFeedLists] = useState<List[]>([]);
  const authUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchFeedLists = async () => {
      if (!authUser) return;

      setIsLoading(true);

      try {
        const userDocRef = doc(firestore, "users", authUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          showToast("Error", "User data not found", "error");
          return;
        }

        const followers = userDoc.data()?.followers ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const publicLists: any[] = [];

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

        publicLists.sort((a, b) => b.createdAt - a.createdAt);
        setFeedLists(publicLists);
      } catch (error) {
        const err = error as Error;
        showToast("Error", err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedLists();
  }, [authUser, showToast]);

  return { isLoading, feedLists };
};

export default useGetFeedLists;
