
import { Product, NewsItem, Testimonial, BannerSlide, Category, Feature } from '@/types';
import { Leaf, Award, Truck, Shield } from 'lucide-react';

export class DataService {
  static getBannerSlides(): BannerSlide[] {
    return [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=600&fit=crop",
        title: "Cà phê Arabica Đắk Lắk",
        subtitle: "Hương vị đậm đà từ núi rừng Tây Nguyên",
        cta: "Khám phá ngay",
        link: "/products/coffee"
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=1200&h=600&fit=crop",
        title: "Chè shan tuyết cổ thụ",
        subtitle: "Trà nguyên chất từ vùng cao Tây Bắc",
        cta: "Xem sản phẩm",
        link: "/products/tea"
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
        title: "Mật ong rừng nguyên chất",
        subtitle: "Thu hoạch từ tổ ong tự nhiên",
        cta: "Mua ngay",
        link: "/products/honey"
      }
    ];
  }

  static getFeaturedProducts(): Product[] {
    return [
      {
        id: "1",
        name: "Cà phê Arabica Đắk Lắk",
        price: 250000,
        originalPrice: 300000,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        category: "Cà phê",
        rating: 4.8,
        isHot: true
      },
      {
        id: "2", 
        name: "Chè shan tuyết cổ thụ",
        price: 180000,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop",
        category: "Chè",
        rating: 4.9,
        isNew: true
      },
      {
        id: "3",
        name: "Tiêu đen Phú Quốc",
        price: 120000,
        originalPrice: 150000,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
        category: "Gia vị",
        rating: 4.7
      },
      {
        id: "4",
        name: "Mật ong rừng nguyên chất",
        price: 350000,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        category: "Mật ong",
        rating: 4.9,
        isHot: true
      }
    ];
  }

  static getCategories(): Category[] {
    return [
      {
        name: "Cà phê",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
        link: "/products/coffee",
        count: 25
      },
      {
        name: "Chè",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop",
        link: "/products/tea",
        count: 18
      },
      {
        name: "Gia vị",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop",
        link: "/products/spices",
        count: 32
      },
      {
        name: "Mật ong",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
        link: "/products/honey",
        count: 12
      }
    ];
  }

  static getFeatures(): Feature[] {
    return [
      {
        icon: Leaf,
        title: "100% Tự nhiên",
        description: "Sản phẩm từ thiên nhiên, không chất bảo quản",
        color: "text-green-600"
      },
      {
        icon: Award,
        title: "Chất lượng cao",
        description: "Được kiểm định và đảm bảo chất lượng",
        color: "text-yellow-600"
      },
      {
        icon: Truck,
        title: "Giao hàng nhanh",
        description: "Miễn phí vận chuyển toàn quốc",
        color: "text-blue-600"
      },
      {
        icon: Shield,
        title: "Đổi trả dễ dàng",
        description: "Cam kết hoàn tiền 100% nếu không hài lòng",
        color: "text-purple-600"
      }
    ];
  }

  static getTestimonials(): Testimonial[] {
    return [
      {
        id: 1,
        name: "Nguyễn Thị Lan",
        location: "Hà Nội",
        rating: 5,
        comment: "Cà phê Đắk Lắk ở đây thật sự rất ngon, hương vị đậm đà và thơm ngon. Đã mua nhiều lần và luôn hài lòng với chất lượng.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b512?w=100&h=100&fit=crop&crop=face"
      },
      {
        id: 2,
        name: "Trần Văn Minh",
        location: "TP. Hồ Chí Minh",
        rating: 5,
        comment: "Mật ong rừng nguyên chất, vị ngọt tự nhiên và rất tốt cho sức khỏe. Giao hàng nhanh, đóng gói cẩn thận.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      {
        id: 3,
        name: "Lê Thị Hương",
        location: "Đà Nẵng",
        rating: 5,
        comment: "Chè shan tuyết có hương vị rất đặc biệt, uống một lần là nhớ mãi. Sẽ tiếp tục ủng hộ shop.",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      }
    ];
  }

  static getStats() {
    return [
      { number: "10,000+", label: "Khách hàng hài lòng" },
      { number: "50+", label: "Sản phẩm chất lượng" },
      { number: "5", label: "Năm kinh nghiệm" },
      { number: "100%", label: "Sản phẩm tự nhiên" }
    ];
  }
}
