/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Updated interface to reflect the store's state
interface UserProfileState {
  userProfile: any; // Replace 'any' with a more specific type if possible
  setUserProfile: (userProfile: any) => void;
}

// Use the interface in the create function
const useUserProfileStore = create<UserProfileState>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile: any) => set({ userProfile }), // Fixed the typo here
}));

export default useUserProfileStore;
