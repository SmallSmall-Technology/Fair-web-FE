import { useEffect, useState } from 'react';

export const useImageCarousel = (images, delay = 3000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => clearInterval(interval);
  }, [images, delay]);

  return { currentImageIndex, setCurrentImageIndex };
};
