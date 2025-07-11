
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSlider } from '@/hooks/useSlider';
import { DataService } from '@/services/dataService';
import { ANIMATION_DELAYS } from '@/constants';
import { useResponsive } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const bannerSlides = DataService.getBannerSlides();
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useSlider(
    bannerSlides.length, 
    ANIMATION_DELAYS.SLIDE_INTERVAL
  );
  const { below } = useResponsive();
  const isMobile = below.sm;

  return (
    <section className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-b-xl sm:rounded-b-2xl md:rounded-b-3xl shadow-elegant">
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent sm:from-black/60 sm:via-black/30 sm:to-transparent" />
            <div className="absolute inset-0 flex items-center justify-start pl-4 sm:pl-8 md:pl-16">
              <div className="text-left text-white space-y-2 sm:space-y-4 md:space-y-6 animate-fade-in max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold font-serif leading-tight">
                  {isMobile && slide.title.length > 20 
                    ? `${slide.title.substring(0, 20)}...` 
                    : slide.title}
                </h1>
                <p className="text-sm sm:text-base md:text-xl lg:text-2xl font-light opacity-90 leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {slide.subtitle}
                </p>
                <Button 
                  asChild 
                  size={isMobile ? "sm" : "lg"} 
                  className="mt-2 sm:mt-4 md:mt-8 bg-secondary hover:bg-secondary/90 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-warm"
                >
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
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      {/* Dots indicator */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
