import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToasts from "./useShowToasts";

const useLogout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const showToast = useShowToasts();
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("user-infor");
    } catch (error) {
      const err = error as Error;
      showToast("Error", err.message, "error");
    }
  };

  return { handleLogout, loading, error };
};

export default useLogout;
