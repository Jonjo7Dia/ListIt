/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Updated interface to reflect the store's state
interface UserProfileState {
  addList: any;
  userProfile: any;
  deletePost: any; // Replace 'any' with a more specific type if possible
  setUserProfile: (userProfile: any) => void;
}

// Use the interface in the create function
const useUserProfileStore = create<UserProfileState>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile: any) => set({ userProfile }),
  addList: (list: any) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        lists: [list.id, ...state.userProfile.posts],
      },
    })),
  deletePost: (listId: string) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        posts: state.userProfile.posts.filter((id: string) => id !== listId),
      },
    })),
}));

export default useUserProfileStore;
