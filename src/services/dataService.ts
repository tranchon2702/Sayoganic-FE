
import { Product, NewsItem, Testimonial, BannerSlide, Category, Feature } from '@/types';
import { Leaf, Award, Truck, Shield } from 'lucide-react';

export class DataService {
  static getBannerSlides(): BannerSlide[] {
    return [
      {
        id: 1,
        image: "/image/chuoihotrung.jpeg",
        title: "Chuối Hột Rừng Sấy Tây Nguyên - Tinh Túy Đại Ngàn",
        subtitle: "Vị ngọt tự nhiên, giàu chất xơ và khoáng chất từ rừng già Tây Nguyên",
        cta: "Khám phá ngay",
        link: "/products/dried-fruit"
      },
      {
        id: 2,
        image: "/image/macca.jpg",
        title: "Hạt Macca Organic - Vàng Trắng Từ Đất Bazan",
        subtitle: "Thơm béo tự nhiên, giàu dưỡng chất, thu hoạch và chế biến thủ công",
        cta: "Xem sản phẩm",
        link: "/products/nuts"
      },
      {
        id: 3,
        image: "/image/ruou.png",
        title: "Rượu Chuối Hột Rừng - Tinh Hoa Nhiều Năm Ủ Mùi",
        subtitle: "Hương thơm quyến rũ, vị ngọt thanh tao, sản xuất theo phương pháp truyền thống",
        cta: "Mua ngay",
        link: "/products/wine"
      }
    ];
  }

  static getFeaturedProducts(): Product[] {
    return [
      {
        id: "1",
        name: "Cà phê Arabica Đắk Lắk",
        slug: "ca-phe-arabica-dak-lak",
        price: 250000,
        originalPrice: 300000,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        category: {
          id: "1",
          name: "Cà phê",
          slug: "coffee",
          description: "Cà phê nguyên chất từ Tây Nguyên"
        },
        rating: 4.8,
        isHot: true,
        images: []
      },
      {
        id: "2", 
        name: "Chè shan tuyết cổ thụ",
        slug: "che-shan-tuyet-co-thu",
        price: 180000,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop",
        category: {
          id: "2",
          name: "Chè",
          slug: "tea",
          description: "Chè nguyên chất từ vùng cao Tây Bắc"
        },
        rating: 4.9,
        isNewProduct: true,
        images: []
      },
      {
        id: "3",
        name: "Tiêu đen Phú Quốc",
        slug: "tieu-den-phu-quoc",
        price: 120000,
        originalPrice: 150000,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
        category: {
          id: "3",
          name: "Gia vị",
          slug: "spices",
          description: "Gia vị tự nhiên từ Phú Quốc"
        },
        rating: 4.7,
        images: []
      },
      {
        id: "4",
        name: "Mật ong rừng nguyên chất",
        slug: "mat-ong-rung-nguyen-chat",
        price: 350000,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        category: {
          id: "4",
          name: "Mật ong",
          slug: "honey",
          description: "Mật ong thu hoạch từ rừng tự nhiên"
        },
        rating: 4.9,
        isHot: true,
        images: []
      }
    ];
  }

  static getCategories(): Category[] {
    return [
      {
        id: "1",
        name: "Cà phê",
        slug: "coffee",
        description: "Cà phê nguyên chất từ Tây Nguyên",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop",
        link: "/products/coffee",
        count: 25
      },
      {
        id: "2",
        name: "Chè",
        slug: "tea",
        description: "Chè nguyên chất từ vùng cao Tây Bắc",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop",
        link: "/products/tea",
        count: 18
      },
      {
        id: "3",
        name: "Gia vị",
        slug: "spices",
        description: "Gia vị tự nhiên từ Phú Quốc",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop",
        link: "/products/spices",
        count: 32
      },
      {
        id: "4",
        name: "Mật ong",
        slug: "honey",
        description: "Mật ong thu hoạch từ rừng tự nhiên",
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
        comment: "Chuối Sấy ở đây thật sự rất ngon, hương vị đậm đà và thơm ngon. Đã mua nhiều lần và luôn hài lòng với chất lượng.",
        avatar: "https://images.unsplash.com/photo-1750231211588-53a860ea7b4b?w=200&h=200&fit=crop&crop=face"
      },
      {
        id: 2,
        name: "Trần Văn Minh",
        location: "TP. Hồ Chí Minh",
        rating: 5,
        comment: "Rượu chuối ngâm có hương vị rất đặc biệt, uống một lần là nhớ mãi. Sẽ tiếp tục ủng hộ shop.",
        avatar: "https://images.unsplash.com/photo-1634716700084-4eee747627d6?w=100&h=100&fit=crop&crop=face"
      },
      {
        id: 3,
        name: "Lê Thị Hương",
        location: "Đà Nẵng",
        rating: 5,
        comment: "Mật ong rừng nguyên chất, vị ngọt tự nhiên và rất tốt cho sức khỏe. Giao hàng nhanh, đóng gói cẩn thận.",
        avatar: "https://images.unsplash.com/photo-1742402281952-432c2416d7fe?w=100&h=100&fit=crop&crop=face"
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
