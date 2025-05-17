import { useState, useEffect, useRef, useCallback } from 'react';

export function useCarousel({ slideCount, autoSlideInterval }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, autoSlideInterval);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, autoSlideInterval, nextSlide]);

  return {
    currentIndex,
    nextSlide,
    prevSlide,
    isPaused,
    togglePause,
  };
}
