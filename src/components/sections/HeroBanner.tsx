
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSlider } from '@/hooks/useSlider';
import { DataService } from '@/services/dataService';
import { ANIMATION_DELAYS } from '@/constants';

const HeroBanner = () => {
  const bannerSlides = DataService.getBannerSlides();
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useSlider(
    bannerSlides.length, 
    ANIMATION_DELAYS.SLIDE_INTERVAL
  );

  return (
    <section className="relative h-[600px] overflow-hidden rounded-b-3xl shadow-elegant">
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 
            'opacity-0 scale-105'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16">
              <div className="text-left text-white space-y-6 animate-fade-in max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl font-light opacity-90 leading-relaxed">
                  {slide.subtitle}
                </p>
                <Button asChild size="lg" className="mt-8 bg-secondary hover:bg-secondary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-warm">
                  <Link to={slide.link}>{slide.cta}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="sm"
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
