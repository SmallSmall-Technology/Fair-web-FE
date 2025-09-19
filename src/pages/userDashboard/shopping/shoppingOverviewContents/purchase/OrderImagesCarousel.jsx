import { useEffect, useState } from 'react';

export const OrderImagesCarousel = ({ orders }) => {
  const items = orders?.items ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (currentIndex >= items.length) {
      setCurrentIndex(0);
    }
  }, [items.length, currentIndex]);

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="mb-6 flex justify-center">
      <div className="bg-[#FAFAFA] h-[51px] w-[51px] lg:h-[104px] lg:w-[104px] border border-[#E8EBEA] rounded-[7px] flex justify-center items-center">
        <img
          src={currentItem?.coverImage || '/placeholder-image.jpg'}
          alt={currentItem?.productName || 'Product image'}
          className="lg:w-[76px] lg:h-[76px] object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};
