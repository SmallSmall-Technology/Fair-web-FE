import React, { useState, useEffect } from 'react';
import { productAds } from '../../../utils/data';

const ProductAds = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    Array(productAds.length).fill(false)
  );

  // Preload the first image immediately
  useEffect(() => {
    const img = new Image();
    img.src = productAds[0].image;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productAds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => {
      const newLoadedState = [...prev];
      newLoadedState[index] = true;
      return newLoadedState;
    });
  };

  return (
    <div className="relative mt-4 mx-auto">
      <h2 id="product-carousel-heading" className="sr-only">
        Product advertisements
      </h2>

      <div
        className="relative h-56 md:h-96 overflow-hidden rounded-lg"
        aria-live="polite"
        role="region"
        aria-labelledby="product-carousel-heading"
        aria-roledescription="carousel"
      >
        {productAds.map((productAd, index) => (
          <div
            key={productAd.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            {!imageLoaded[index] && (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            )}

            <img
              src={productAd.image}
              alt={productAd.name}
              className={`w-full h-full object-cover ${
                imageLoaded[index] ? 'block' : 'hidden'
              }`}
              onLoad={() => handleImageLoad(index)}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'low'}
              decoding="async"
            />
            {/* <img
              src={productAd.image}
              alt={productAd.name}
              className={`w-full h-full object-cover ${
                imageLoaded[index] ? 'block' : 'hidden'
              }`}
              onLoad={() => handleImageLoad(index)}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'low'}
              decoding="async"
              width="1920"
              height="1080"
              style={{
                contentVisibility: 'auto',
                aspectRatio: '16/9',
              }}
            /> */}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        {productAds.map((_, index) => (
          <button
            aria-label={`Go to slide ${index + 1}`}
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-[#CDCBCC] scale-125' : 'bg-[#ECEAEA]'
            }`}
            onClick={() => setCurrentIndex(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setCurrentIndex(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductAds);
