import "./App.css";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import CategoryAdminPage from "./pages/admin/CategoryAdminPage";
import ProductAdminListPage from "./pages/admin/ProductAdminListPage";
import ProductAdminCreatePage from "./pages/admin/ProductAdminCreatePage";
import ProductAdminDetailPage from "./pages/admin/ProductAdminDetailPage";
import ProductAdminEditPage from "./pages/admin/ProductAdminEditPage";

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
      <Route
        path="/admin/category"
        element={
          <ProtectedRoute>
            <CategoryAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product"
        element={
          <ProtectedRoute>
            <ProductAdminListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/create"
        element={
          <ProtectedRoute>
            <ProductAdminCreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/detail/:id"
        element={
          <ProtectedRoute>
            <ProductAdminDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/edit/:id"
        element={
          <ProtectedRoute>
            <ProductAdminEditPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default App;
