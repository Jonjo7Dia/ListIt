/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Step 1: Define an interface for your store's state
interface AuthState {
  user: any; // Replace 'any' with a more specific type if possible
  login: (user: any) => void;
  logout: () => void;
  setUser: (user: any) => void;
}

// Step 2: Use the interface in the create function
const useAuthStore = create<AuthState>((set) => ({
  user: parseUserInfo(localStorage.getItem("user-info")),
  login: (user: any) => set({ user }),
  logout: () => set({ user: null }),
  setUser: (user: any) => set({ user }),
}));

export default useAuthStore;

// Helper function to safely parse user info from localStorage
function parseUserInfo(userInfo: string | null): any {
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null; // or a default value for user
}
