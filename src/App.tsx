import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreatePage from "./pages/CreatePage/CreatePage";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/:username" element={<ProfilePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
