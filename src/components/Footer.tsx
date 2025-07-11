import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import api from '@/lib/api';
import { Category } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Không thể tải danh mục sản phẩm:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Display only first 4 categories on mobile unless "show more" is clicked
  const displayedCategories = showMoreCategories 
    ? categories 
    : categories.slice(0, 4);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                <img
                  src="/image/logo/logo.jpg"
                  alt="Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-serif">SAYOGANIC365</h3>
                <p className="text-xs sm:text-sm text-gray-400">Thực phẩm sạch từ thiên nhiên</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Chúng tôi cam kết mang đến cho bạn những sản phẩm thực phẩm sạch, 
              chất lượng cao từ vùng đất Tây Nguyên màu mỡ.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Liên kết nhanh</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-0 sm:space-y-2">
              <li>
                <Link to="/" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link to="/customer-service" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Chăm sóc khách hàng
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Danh mục sản phẩm</h4>
            <ul className="space-y-2">
              {isLoading ? (
                Array(4).fill(0).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-4 sm:h-5 w-24 bg-gray-800" />
                  </li>
                ))
              ) : displayedCategories.length > 0 ? (
                <>
                  {displayedCategories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        to={`/products/${category.slug}`} 
                        className="text-gray-400 text-sm hover:text-primary transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  {categories.length > 4 && (
                    <li>
                      <button 
                        onClick={() => setShowMoreCategories(!showMoreCategories)}
                        className="text-primary text-sm hover:underline"
                      >
                        {showMoreCategories ? 'Hiển thị ít hơn' : 'Xem thêm...'}
                      </button>
                    </li>
                  )}
                </>
              ) : (
                <li className="text-gray-500 text-sm">Không có danh mục</li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold">Thông tin liên hệ</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-xs sm:text-sm">
                Thôn 6 Xã phúc Thọ Lâm Hà Lâm Đồng Vietnam
                </p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <p className="text-gray-400 text-xs sm:text-sm">0869415919 - 08651800039</p>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <p className="text-gray-400 text-xs sm:text-sm">sayoganic365@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 Sayoganic365. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
