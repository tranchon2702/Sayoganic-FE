
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif leading-tight">
              Câu chuyện của <span className="text-primary font-script text-5xl md:text-6xl">chúng tôi</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Sayoganic365 Food được thành lập với sứ mệnh mang đến cho người tiêu dùng 
              những sản phẩm thực phẩm sạch, chất lượng cao từ vùng đất Tây Nguyên 
              màu mỡ. Chúng tôi cam kết làm việc trực tiếp với các nông dân địa phương 
              để đảm bảo chất lượng và tính bền vững.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Từ những hạt cà phê arabica thơm ngon, lá chè shan tuyết quý hiếm, 
              đến các loại gia vị đặc trưng và mật ong rừng nguyên chất, tất cả 
              đều được tuyển chọn kỹ lưỡng và xử lý theo quy trình nghiêm ngặt.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-warm">
              <Link to="/about">Tìm hiểu thêm về chúng tôi</Link>
            </Button>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1544966503-7cc5ac882d2a?w=600&h=400&fit=crop"
              alt="Tây Nguyên landscape"
              className="relative rounded-2xl shadow-elegant w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
