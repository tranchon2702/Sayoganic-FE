import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Leaf, Users, Award, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Tự nhiên & Sạch",
      description: "Cam kết mang đến sản phẩm 100% tự nhiên, không chất bảo quản"
    },
    {
      icon: Users,
      title: "Hỗ trợ nông dân",
      description: "Làm việc trực tiếp với nông dân địa phương, đảm bảo thu nhập ổn định"
    },
    {
      icon: Award,
      title: "Chất lượng cao",
      description: "Quy trình kiểm định nghiêm ngặt, đảm bảo chất lượng tốt nhất"
    },
    {
      icon: Heart,
      title: "Tận tâm phục vụ",
      description: "Đặt sự hài lòng của khách hàng lên hàng đầu"
    }
  ];

  const team = [
    {
      name: "Nguyễn Văn An",
      position: "Giám đốc điều hành",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Với hơn 15 năm kinh nghiệm trong ngành thực phẩm"
    },
    {
      name: "Trần Thị Bình",
      position: "Trưởng phòng Chất lượng",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Chuyên gia kiểm định chất lượng thực phẩm"
    },
    {
      name: "Lê Minh Cường",
      position: "Trưởng phòng Sản xuất",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Giám sát quy trình sản xuất và đóng gói"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-[#0d6938] to-[#0b4e29]">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
              Về Sayoganic365
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Câu chuyện của chúng tôi
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair">
                Khởi nguồn từ tình yêu đất mẹ
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Sayoganic365 được thành lập vào năm 2010 với khát vọng mang những sản phẩm 
                tinh hoa từ vùng đất Tây Nguyên đến với mọi người. Chúng tôi bắt đầu từ một 
                trang trại cà phê nhỏ ở Đắk Lắk và dần mở rộng để trở thành một trong những 
                thương hiệu uy tín về thực phẩm sạch.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Với hơn 13 năm kinh nghiệm, chúng tôi đã xây dựng mạng lưới hợp tác với hơn 
                500 nông hộ địa phương, cam kết mang đến những sản phẩm chất lượng cao nhất 
                từ vùng đất bazan đỏ màu mỡ.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544966503-7cc5ac882d2a?w=600&h=400&fit=crop"
                alt="Tây Nguyên landscape"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#f3f7f5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-gray-600 text-lg">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 bg-[#0d6938] rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-playfair">
                Sứ mệnh
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Mang đến cho người tiêu dùng những sản phẩm thực phẩm sạch, chất lượng cao 
                từ vùng Tây Nguyên, đồng thời góp phần nâng cao thu nhập và đời sống cho 
                nông dân địa phương thông qua các mối quan hệ hợp tác bền vững.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 font-playfair">
                Tầm nhìn
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Trở thành thương hiệu hàng đầu Việt Nam về thực phẩm sạch từ Tây Nguyên, 
                được tin tưởng bởi hàng triệu gia đình và mở rộng ra thị trường quốc tế, 
                đưa hương vị đặc trưng của Việt Nam đến với thế giới.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-[#0d6938] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">500+</h3>
              <p className="text-lg">Nông hộ hợp tác</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">100,000+</h3>
              <p className="text-lg">Khách hàng tin tưởng</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">50+</h3>
              <p className="text-lg">Sản phẩm chất lượng</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-4xl font-bold">13+</h3>
              <p className="text-lg">Năm kinh nghiệm</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
