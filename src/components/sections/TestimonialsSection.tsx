
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DataService } from '@/services/dataService';
import { ANIMATION_DELAYS } from '@/constants';

const TestimonialsSection = () => {
  const testimonials = DataService.getTestimonials();

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mb-6">
            Khách hàng <span className="text-primary font-script text-5xl md:text-6xl">nói gì</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Những phản hồi chân thật từ khách hàng đã tin tưởng chúng tôi
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="hover:shadow-elegant transition-all duration-500 animate-scale-in rounded-2xl border-0 shadow-soft" style={{ animationDelay: `${index * ANIMATION_DELAYS.STAGGER_DELAY}s` }}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="w-8 h-8 text-primary/30 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
