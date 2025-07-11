import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Phone, Mail, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useResponsive } from '@/hooks/use-mobile';
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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { below } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) && 
        menuButtonRef.current && 
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = (name: string) => {
    if (below.md) {
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isMobileSearchOpen) {
      setSearchQuery('');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#0d6938] text-white py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 mb-1 sm:mb-0">
            <div className="flex items-center space-x-1">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">0869415919 - 08651800039</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm">sayoganic365@gmail.com</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-xs sm:text-sm">Miễn phí vận chuyển cho đơn hàng từ 500,000đ</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-2 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 flex items-center justify-center">
              <img
                src="/image/logo/logo.jpg"
                alt="Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0d6938] font-serif leading-tight">SAYOGANIC365</h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600">Thực phẩm sạch từ thiên nhiên</p>
            </div>
          </Link>

          {/* Mobile Search Toggle */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileSearch}
              className="mr-2"
              aria-label={isMobileSearchOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
            >
              {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>

          {/* Search bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <div className="absolute right-0 top-0 h-full flex items-center">
                <Button
                  type="submit"
                  size="sm"
                  className="h-full bg-[#0d6938] text-white hover:bg-[#095127] rounded-l-none"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Cart, User and Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="outline" size="sm" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Giỏ hàng</span>
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
                  <Button variant="outline" size="sm" className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user?.username}</span>
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
              <Button variant="outline" size="sm" asChild className="p-1 sm:p-2">
                <Link to="/login" className="flex items-center space-x-1 sm:space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Link>
              </Button>
            )}
            
            <Button
              ref={menuButtonRef}
              variant="outline"
              size="sm"
              className="md:hidden p-1 sm:p-2"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search - Conditional */}
        {isMobileSearchOpen && (
          <div className="md:hidden mt-2 px-1">
            <form onSubmit={handleSearch} className="flex w-full relative">
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
                autoFocus
              />
              <div className="absolute right-0 top-0 h-full flex items-center">
                {searchQuery && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-full px-1 mr-8 text-gray-500 hover:text-gray-700"
                    onClick={clearSearch}
                    aria-label="Xóa từ khóa tìm kiếm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  size="sm"
                  className="h-full bg-[#0d6938] text-white hover:bg-[#095127] rounded-l-none"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Navigation - Desktop */}
        <nav className="hidden md:block mt-5">
          <div className="flex flex-row items-center space-x-8">
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
                className={`text-gray-700 hover:text-[#0d6938] font-medium transition-colors flex items-center ${
                  location.pathname.startsWith('/products') ? 'text-[#0d6938] font-bold' : ''
                }`}
              >
                Sản phẩm
                <ChevronDown className="ml-1 w-4 h-4" />
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

        {/* Navigation - Mobile */}
        {isMenuOpen && (
          <div ref={menuRef} className="md:hidden mt-4 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
            <nav className="flex flex-col">
              <div className="flex justify-between items-center border-b border-gray-100 bg-gray-50">
                <h3 className="px-4 py-3 font-medium text-gray-800">Menu</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleMenu}
                  className="mr-2"
                  aria-label="Đóng menu"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <Link
                to="/"
                className={`px-4 py-3 border-b border-gray-100 text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] ${
                  location.pathname === '/' ? 'bg-[#e6f4ec] text-[#0d6938] font-medium' : ''
                }`}
              >
                Trang chủ
              </Link>
              <Link
                to="/about"
                className={`px-4 py-3 border-b border-gray-100 text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] ${
                  location.pathname === '/about' ? 'bg-[#e6f4ec] text-[#0d6938] font-medium' : ''
                }`}
              >
                Về chúng tôi
              </Link>
              
              {/* Products with collapsible submenu */}
              <div className="border-b border-gray-100">
                <div 
                  className={`px-4 py-3 flex justify-between items-center text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] cursor-pointer ${
                    location.pathname.startsWith('/products') ? 'bg-[#e6f4ec] text-[#0d6938] font-medium' : ''
                  }`}
                  onClick={() => toggleDropdown('products')}
                >
                  <Link
                    to="/products"
                    className="flex-grow"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Sản phẩm
                  </Link>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'products' ? 'transform rotate-180' : ''}`} />
                </div>
                
                {activeDropdown === 'products' && (
                  <div className="bg-gray-50 pl-4">
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
                          className={`block px-4 py-2 text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] ${
                            location.pathname === `/products/${category.slug}` ? 'text-[#0d6938] font-medium' : ''
                          }`}
                        >
                          {category.name}
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">Không có danh mục</div>
                    )}
                  </div>
                )}
              </div>
              
              <Link
                to="/news"
                className={`px-4 py-3 border-b border-gray-100 text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] ${
                  location.pathname === '/news' ? 'bg-[#e6f4ec] text-[#0d6938] font-medium' : ''
                }`}
              >
                Tin tức
              </Link>
              <Link
                to="/customer-service"
                className={`px-4 py-3 border-b border-gray-100 text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] ${
                  location.pathname === '/customer-service' ? 'bg-[#e6f4ec] text-[#0d6938] font-medium' : ''
                }`}
              >
                Chăm sóc khách hàng
              </Link>
              <Link
                to="/contact"
                className={`px-4 py-3 text-gray-700 hover:bg-[#e6f4ec] hover:text-[#0d6938] ${
                  location.pathname === '/contact' ? 'bg-[#e6f4ec] text-[#0d6938] font-medium' : ''
                }`}
              >
                Liên hệ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
