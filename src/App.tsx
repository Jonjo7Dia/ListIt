import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreatePage from "./pages/CreatePage/CreatePage";
import SearchPage from "./pages/SearchPage/SearchPage";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  const [authUser] = useAuthState(auth);
  const isLoggedIn = authUser != null;
  return (
    <PageLayout>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/search"
          element={isLoggedIn ? <SearchPage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!isLoggedIn ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<ProfilePage />} />
        <Route
          path="/create"
          element={isLoggedIn ? <CreatePage /> : <Navigate to="/auth" />}
        />
      </Routes>
    </PageLayout>
  );
}

export default App;
