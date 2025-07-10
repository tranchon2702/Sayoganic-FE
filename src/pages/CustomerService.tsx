import { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, Award, Shield, Truck, HeartHandshake, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomerService = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const serviceFeatures = [
    {
      icon: HeartHandshake,
      title: "Tư vấn tận tâm",
      description: "Đội ngũ chuyên gia sẵn sàng tư vấn về sản phẩm và cách sử dụng",
      color: "text-[#0d6938]"
    },
    {
      icon: Clock,
      title: "Hỗ trợ 24/7",
      description: "Phục vụ khách hàng mọi lúc, mọi nơi với dịch vụ chăm sóc không ngừng",
      color: "text-[#0d6938]"
    },
    {
      icon: Shield,
      title: "Đảm bảo chất lượng",
      description: "Cam kết hoàn tiền 100% nếu sản phẩm không đúng như mô tả",
      color: "text-[#0d6938]"
    },
    {
      icon: Truck,
      title: "Giao hàng nhanh chóng",
      description: "Vận chuyển toàn quốc trong 1-3 ngày làm việc",
      color: "text-[#0d6938]"
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Hotline",
      info: "0123 456 789",
      subtitle: "Miễn phí từ 8:00 - 22:00",
      color: "bg-[#0d6938]"
    },
    {
      icon: Mail,
      title: "Email",
      info: "support@taynguyenfood.vn",
      subtitle: "Phản hồi trong 24h",
      color: "bg-[#0d6938]"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      info: "Chat trực tuyến",
      subtitle: "Hỗ trợ tức thì",
      color: "bg-[#0d6938]"
    }
  ];

  const faqs = [
    {
      question: "Làm thế nào để đặt hàng online?",
      answer: "Bạn có thể đặt hàng dễ dàng bằng cách: 1) Chọn sản phẩm và thêm vào giỏ hàng, 2) Điền thông tin giao hàng, 3) Chọn phương thức thanh toán, 4) Xác nhận đơn hàng. Chúng tôi sẽ liên hệ xác nhận trong vòng 30 phút."
    },
    {
      question: "Thời gian giao hàng là bao lâu?",
      answer: "Thời gian giao hàng phụ thuộc vào khu vực: Nội thành Hà Nội, TP.HCM: 1-2 ngày. Các tỉnh thành khác: 2-5 ngày làm việc. Chúng tôi sẽ thông báo chi tiết khi xác nhận đơn hàng."
    },
    {
      question: "Có được đổi trả sản phẩm không?",
      answer: "Có, chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ khi nhận hàng với điều kiện: sản phẩm còn nguyên vẹn, chưa sử dụng, có hóa đơn mua hàng. Phí vận chuyển đổi trả sẽ được chúng tôi hỗ trợ."
    },
    {
      question: "Làm sao để biết sản phẩm có chất lượng tốt?",
      answer: "Tất cả sản phẩm của chúng tôi đều có: Giấy chứng nhận ATTP, Tem truy xuất nguồn gốc, Hạn sử dụng rõ ràng, Đánh giá từ khách hàng đã mua. Chúng tôi cam kết 100% sản phẩm tự nhiên, không chất bảo quản."
    },
    {
      question: "Có những hình thức thanh toán nào?",
      answer: "Chúng tôi hỗ trợ nhiều hình thức thanh toán: Tiền mặt khi nhận hàng (COD), Chuyển khoản ngân hàng, Ví điện tử (MoMo, ZaloPay), Thẻ tín dụng/ghi nợ. Tất cả đều an toàn và bảo mật."
    },
    {
      question: "Có chương trình khuyến mãi nào không?",
      answer: "Chúng tôi thường xuyên có các chương trình: Giảm giá cho khách hàng mới, Tích điểm đổi quà, Miễn phí vận chuyển, Combo sản phẩm giá tốt. Theo dõi website và fanpage để cập nhật khuyến mãi mới nhất."
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24h.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#0d6938]/10 to-[#0d6938]/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 font-serif mb-6">
              Chăm sóc <span className="text-[#0d6938] font-script text-6xl md:text-7xl">Khách hàng</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi luôn đặt khách hàng lên hàng đầu với dịch vụ chăm sóc tận tâm và chuyên nghiệp
            </p>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
              Dịch vụ chăm sóc khách hàng
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-500 animate-scale-in group rounded-2xl border-0 shadow-soft" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:shadow-warm transition-all duration-300 group-hover:scale-110 ${feature.color}`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-serif mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="text-gray-600 text-lg">
              Chọn cách thức liên hệ phù hợp với bạn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-500 group rounded-2xl border-0 shadow-soft">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 font-serif mb-2">{method.title}</h3>
                  <p className="text-2xl font-bold text-[#0d6938] mb-2">{method.info}</p>
                  <p className="text-gray-600 text-sm">{method.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
                Gửi tin nhắn cho chúng tôi
              </h2>
              <p className="text-gray-600 text-lg">
                Điền thông tin bên dưới, chúng tôi sẽ phản hồi sớm nhất có thể
              </p>
            </div>
            
            <Card className="shadow-elegant rounded-2xl border-0">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Nhập địa chỉ email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chủ đề *
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="Nhập chủ đề"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nội dung *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full"
                      placeholder="Nhập nội dung tin nhắn..."
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button type="submit" size="lg" className="bg-[#0d6938] hover:bg-[#095127] text-white px-12 py-4 text-lg font-semibold rounded-full shadow-elegant">
                      Gửi tin nhắn
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">
              Câu hỏi thường gặp
            </h2>
            <p className="text-gray-600 text-lg">
              Tìm hiểu những câu trả lời cho các thắc mắc phổ biến
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-soft hover:shadow-elegant transition-all duration-300 rounded-2xl border-0">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-900">
                    <span>{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#0d6938]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#0d6938]" />
                    )}
                  </CardTitle>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerService;
