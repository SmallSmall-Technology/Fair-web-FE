import { useState, useEffect } from "react";
import { productAds } from "../../../utils/data";

export const ProductAds = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    Array(productAds.length).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productAds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [productAds.length]);

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => {
      const newLoadedState = [...prev];
      newLoadedState[index] = true;
      return newLoadedState;
    });
  };

  return (
    <div className="relative w-[90%] mx-auto mt-4">
      {/* Image Container */}
      <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
        {productAds.map((productAd, index) => (
          <div
            key={productAd.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {!imageLoaded[index] && (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            )}

            <img
              src={productAd.productAdsImage}
              alt={productAd.productAdsName}
              className={`w-full h-full object-cover ${
                imageLoaded[index] ? "block" : "hidden"
              }`}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        {productAds.map((_, index) => (
          <button
            aria-label="next carousel image"
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-[#CDCBCC] scale-125" : "bg-[#ECEAEA]"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
