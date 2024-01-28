import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToasts from "./useShowToasts";
import useAuthStore from "../store/authStore";

const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const showToast = useShowToasts();
  const logoutUser = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-info");
      logoutUser();
    } catch (error) {
      const err = error as Error;
      showToast("Error", err.message, "error");
    }
  };

  return { handleLogout, loading, error };
};

export default useLogout;
