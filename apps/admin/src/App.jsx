import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./admin/adminLogin";
import AdminRegister from "./admin/adminRegister";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/dashboard";
import AdminProducts from "./admin/pages/adminProducts";
import AdminPortfolio from "./admin/pages/adminPortfolio";
import AdminOrders from "./admin/pages/adminOrders";
import AdminCustomers from "./admin/pages/adminCustomers";
import AdminBlog from "./admin/pages/adminBlog";
import AdminMessages from "./admin/pages/adminMessages";
import ProtectedRoute from "./admin/protectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  );
}