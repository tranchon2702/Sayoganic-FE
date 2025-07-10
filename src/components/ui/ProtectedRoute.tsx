import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  allowedRoles?: ('user' | 'admin')[];
  children?: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Debug: log thông tin khi component render
  useEffect(() => {
    console.log('ProtectedRoute: rendered with', {
      path: location.pathname,
      isAuthenticated,
      userRole: user?.role,
      isLoading,
      allowedRoles
    });
  }, [location.pathname, isAuthenticated, user, isLoading, allowedRoles]);

  if (isLoading) {
    console.log('ProtectedRoute: still loading user data');
    // Hiển thị spinner khi đang tải thông tin người dùng
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d6938]"></div>
        <span className="ml-3">Đang tải...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute: user not authenticated, redirecting to login');
    // Kiểm tra xem đường dẫn có chứa '/admin' không để chuyển hướng đến trang đăng nhập phù hợp
    const loginPath = location.pathname.includes('/admin') ? '/admin/login' : '/login';
    // Redirect them to the appropriate login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }
  
  // If allowedRoles is provided, check if the user's role is in the list
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    console.log('ProtectedRoute: user role not allowed, redirecting to home', {
      userRole: user.role,
      allowedRoles
    });
     // Redirect to a 'not authorized' page or home page
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  console.log('ProtectedRoute: access granted');
  // If children are provided, render them. Otherwise, render the nested routes.
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute; 