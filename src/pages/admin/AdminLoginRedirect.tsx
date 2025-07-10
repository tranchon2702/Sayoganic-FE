import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminLoginRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu đã đăng nhập và là admin, chuyển hướng đến trang admin
    if (isAuthenticated && user?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d6938]"></div>
        <span className="ml-3">Đang tải...</span>
      </div>
    );
  }

  // Nếu đã đăng nhập và là admin, chuyển hướng đến trang admin
  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // Nếu đã đăng nhập nhưng không phải admin, chuyển hướng đến trang chủ
  if (isAuthenticated && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập admin
  return <Navigate to="/admin/login" replace />;
};

export default AdminLoginRedirect; 