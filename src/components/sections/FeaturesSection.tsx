
import { DataService } from '@/services/dataService';
import { ANIMATION_DELAYS } from '@/constants';

const FeaturesSection = () => {
  const features = DataService.getFeatures();

  return (
    <section className="py-20 bg-gradient-to-r from-accent/30 to-warm-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6">
            Tại sao chọn <span className="text-primary font-script text-5xl md:text-6xl">Sayoganic365 </span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Chúng tôi cam kết mang đến những sản phẩm tốt nhất với dịch vụ tuyệt vời
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-6 animate-slide-up group" style={{ animationDelay: `${index * ANIMATION_DELAYS.STAGGER_DELAY}s` }}>
              <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-elegant group-hover:shadow-warm transition-all duration-300 group-hover:scale-110 ${feature.color}`}>
                <feature.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-serif">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
