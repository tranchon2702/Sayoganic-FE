import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/admin';

  // Kiểm tra nếu đã đăng nhập thì chuyển hướng
  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.role === 'admin' && !loading) {
      console.log('User already authenticated as admin, redirecting to /admin');
      navigate('/admin', { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, navigate, loading]);

  // Sau khi đăng nhập thành công, chuyển hướng
  useEffect(() => {
    if (loginSuccess && auth.isAuthenticated && auth.user?.role === 'admin') {
      console.log('Login successful, redirecting to /admin after delay');
      const redirectTimer = setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 1000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [loginSuccess, auth.isAuthenticated, auth.user, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setLoginSuccess(false);

    console.log('Login attempt with:', { email });

    try {
      console.log('Sending login request to API...');
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response received:', response.status);
      const { token, ...userData } = response.data;
      
      // Kiểm tra xem người dùng có phải là admin không
      console.log('User data:', userData);
      if (userData.role !== 'admin') {
        setError('Bạn không có quyền truy cập vào trang quản trị.');
        toast.error('Bạn không có quyền truy cập vào trang quản trị.');
        setLoading(false);
        return;
      }
      
      // Lưu token trực tiếp vào localStorage trước
      console.log('Saving token directly to localStorage:', token);
      window.localStorage.setItem('token', token);
      
      // Sau đó mới gọi auth.login
      console.log('Calling auth.login with token and user data');
      auth.login(token, userData);
      toast.success('Đăng nhập thành công!');
      
      // Kiểm tra xem token đã được lưu chưa
      const savedToken = window.localStorage.getItem('token');
      console.log('Token saved in localStorage:', savedToken);
      
      // Đánh dấu đăng nhập thành công để useEffect xử lý chuyển hướng
      setLoginSuccess(true);
      
      // Chuyển hướng ngay lập tức nếu có token
      if (savedToken) {
        console.log('Token exists, navigating to /admin immediately');
        navigate('/admin', { replace: true });
      }

    } catch (err) {
      console.error('Login error:', err);
      let message = 'Đã xảy ra lỗi. Vui lòng thử lại.';
      if (err instanceof AxiosError && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Nếu đã đăng nhập thành công và đang chờ chuyển hướng
  if (loginSuccess && auth.isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0d6938]"></div>
                </div>
                <p className="text-lg font-medium">Đăng nhập thành công!</p>
                <p className="text-gray-500">Đang chuyển hướng đến trang quản trị...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img src="/image/logo/logo.jpg" alt="Logo" className="w-16 h-16 rounded-full" />
            </div>
            <CardTitle className="text-3xl font-bold font-playfair text-[#0d6938]">Admin Dashboard</CardTitle>
            <CardDescription>Đăng nhập để truy cập trang quản trị</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button type="submit" className="w-full bg-[#0d6938] hover:bg-[#095127]" disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <footer className="py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Sayoganic365 - Trang quản trị
      </footer>
    </div>
  );
};

export default AdminLogin; 