
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@/hooks/useForm';

const NewsletterSection = () => {
  const { formData, handleChange, reset } = useForm({
    email: ''
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      alert('Cảm ơn bạn đã đăng ký nhận tin tức!');
      reset();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Đăng ký nhận tin tức
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Nhận thông tin mới nhất về sản phẩm, khuyến mãi và những kiến thức bổ ích về thực phẩm sạch
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Nhập địa chỉ email của bạn"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:bg-white/20"
              />
              <Button type="submit" variant="secondary" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                <Mail className="w-4 h-4 mr-2" />
                Đăng ký
              </Button>
            </form>
            <p className="text-sm opacity-80 mt-4">
              Chúng tôi cam kết không spam và bảo vệ thông tin cá nhân của bạn
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
