import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone, Mail, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from '@/lib/api';
import { Category } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Không thể tải danh mục sản phẩm:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#0d6938] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>0869415919 - 08651800039</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>sayoganic365@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Miễn phí vận chuyển cho đơn hàng từ 500,000đ</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="w-24 h-24 flex items-center justify-center">
              <img
                src="/image/logo/logo.jpg"
                alt="Logo"
                className="w-28 h-28 object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#0d6938] font-serif leading-tight">SAYOGANIC365</h1>
              <p className="text-base text-gray-600">Thực phẩm sạch từ thiên nhiên</p>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#0d6938] text-white hover:bg-[#095127]"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Cart, User and Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden md:inline">Giỏ hàng</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">{user?.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Tài khoản của tôi</DropdownMenuItem>
                  <DropdownMenuItem>Đơn hàng của tôi</DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Quản trị</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/login" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Đăng nhập</span>
                </Link>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-5 `}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
            <Link
              to="/"
              className={`text-gray-700 hover:text-[#0d6938] font-medium transition-colors ${
                location.pathname === '/' ? 'text-[#0d6938] font-bold' : ''
              }`}
            >
              Trang chủ
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 hover:text-[#0d6938] font-medium transition-colors ${
                location.pathname === '/about' ? 'text-[#0d6938] font-bold' : ''
              }`}
            >
              Về chúng tôi
            </Link>
            <div className="relative group">
              <Link
                to="/products"
                className={`text-gray-700 hover:text-[#0d6938] font-medium transition-colors ${
                  location.pathname.startsWith('/products') ? 'text-[#0d6938] font-bold' : ''
                }`}
              >
                Sản phẩm
              </Link>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {isLoadingCategories ? (
                    Array(4).fill(0).map((_, index) => (
                      <div key={index} className="px-4 py-2">
                        <Skeleton className="h-5 w-24" />
                      </div>
                    ))
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/products/${category.slug}`}
                        className={`block px-4 py-2 text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] transition-colors ${
                          location.pathname === `/products/${category.slug}` ? 'text-[#0d6938] font-bold' : ''
                        }`}
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">Không có danh mục</div>
                  )}
                </div>
              </div>
            </div>
            <Link
              to="/news"
              className={`text-gray-700 hover:text-[#0d6938] font-medium transition-colors ${
                location.pathname === '/news' ? 'text-[#0d6938] font-bold' : ''
              }`}
            >
              Tin tức
            </Link>
            <Link
              to="/customer-service"
              className={`text-gray-700 hover:text-[#0d6938] font-medium transition-colors ${
                location.pathname === '/customer-service' ? 'text-[#0d6938] font-bold' : ''
              }`}
            >
              Chăm sóc khách hàng
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 hover:text-[#0d6938] font-medium transition-colors ${
                location.pathname === '/contact' ? 'text-[#0d6938] font-bold' : ''
              }`}
            >
              Liên hệ
            </Link>
          </div>
        </nav>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
