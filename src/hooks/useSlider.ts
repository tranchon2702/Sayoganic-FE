
import { useState, useEffect } from 'react';

export const useSlider = (itemsLength: number, interval: number = 5000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % itemsLength);
    }, interval);
    return () => clearInterval(timer);
  }, [itemsLength, interval]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % itemsLength);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + itemsLength) % itemsLength);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  };
};
