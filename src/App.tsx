import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import CustomerService from "./pages/CustomerService";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLoginRedirect from "./pages/admin/AdminLoginRedirect";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import ProductForm from "./pages/admin/ProductForm";
import NewsManagement from "./pages/admin/NewsManagement";
import NewsForm from "./pages/admin/NewsForm";
import CategoryManagement from "./pages/admin/CategoryManagement";
import NewsCategoryManagement from "./pages/admin/NewsCategoryManagement";
import ProtectedRoute from "./components/ui/ProtectedRoute";

// ScrollToTop component that will reset scroll position when route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:category" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:slug" element={<NewsDetail />} />
              <Route path="/customer-service" element={<CustomerService />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Trang chuyển hướng tự động cho admin */}
              <Route path="/admin-redirect" element={<AdminLoginRedirect />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                
                {/* Quản lý sản phẩm */}
                <Route path="products" element={<ProductManagement />} />
                <Route path="products/add" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                <Route path="categories" element={<CategoryManagement />} />
                
                {/* Quản lý tin tức */}
                <Route path="news" element={<NewsManagement />} />
                <Route path="news/add" element={<NewsForm />} />
                <Route path="news/edit/:id" element={<NewsForm />} />
                <Route path="news-categories" element={<NewsCategoryManagement />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
