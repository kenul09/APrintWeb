import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AuroraBackground from "./components/AuroraBackground";
import Home from "./pages/home";
import Products from "./pages/products";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import Portfolio from "./pages/portfolio";
import Pricing from "./pages/pricing";
import AdminLogin from "./admin/adminLogin";
import AdminLayout from "./admin/adminLayout";
import Dashboard from "./admin/pages/dashboard";
import AdminProducts from "./admin/pages/adminProducts";
import AdminOrders from "./admin/pages/adminOrders";
import AdminCustomers from "./admin/pages/adminCustomers";
import AdminBlog from "./admin/pages/adminBlog";
import AdminMessages from "./admin/pages/adminMessages";
import ProtectedRoute from "./admin/protectedRoute";

function PublicLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AuroraBackground />
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  // ✅ Dil dəyişdikdə bütün App yenidən render olur
  const { i18n } = useTranslation();

  return (
    <Routes key={i18n.language}>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <adminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="messages" element={<AdminMessages />} />
      </Route>
    </Routes>
  );
}