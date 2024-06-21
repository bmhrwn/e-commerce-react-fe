import "./App.css";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <DashboardAdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default App;
