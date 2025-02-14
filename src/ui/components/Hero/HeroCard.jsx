import { useEffect, useState } from "react";
import { heroCards } from "../../../utils/data";
import { Button } from "../../../utils/Button";

export const HeroCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % heroCards.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const isMiddleCard = (index) => {
    const middleOffset = Math.floor(heroCards.length / 2);
    const middleIndex = (currentIndex + middleOffset) % heroCards.length;
    return index === middleIndex;
  };

  return (
    <>
      <div
        className="relative grid gap-6 lg:justify-center items-center overflow-hidden md:overflow-visible mx-5 lg:mx-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* Background for desktop view */}
        <div className="hidden lg:flex justify-around items-center absolute bg-[#FFDE11] w-[90%] 2xl:hidden h-60 z-0 overflow-clip">
          <img
            src="/images/hero-card-bg.svg"
            alt="Decorative background"
            className="object-contain w-full h-full"
          />
          <img
            src="/images/hero-card-bg.svg"
            alt="Decorative background"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Hero Cards */}
        <div className="flex gap-4 justify-center items-center relative z-10">
          {/* Desktop view */}
          {heroCards.map((heroCard, index) => (
            <div key={heroCard.id} className="hidden lg:block">
              <SingleHeroCard
                heroCard={heroCard}
                isMiddle={isMiddleCard(index)}
              />
            </div>
          ))}

          {/* Mobile view */}
          <ul className="lg:hidden relative flex h-56 md:h-96 rounded-lg w-full">
            {heroCards.map((heroCard, index) => (
              <li
                key={heroCard.id}
                className={`absolute flex w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={index !== currentIndex}
              >
                <img
                  src={heroCard.image}
                  alt={heroCard.alt}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className=" my-2 mb-0 flex justify-center space-x-4">
          {heroCards.map((_, index) => (
            <button
              aria-label={`Go to card ${index + 1}`}
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-[#CDCBCC]" : "bg-[#ECEAEA]"
              }`}
              onClick={() => setCurrentIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setCurrentIndex(index);
                }
              }}
            ></button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 place-items-center text-center mb-8 mt-4">
        <p>Steps to buying</p>
        <div className=" flex space-x-2">
          <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-black  border-2 border-black px-6 md:px-12 py-3 text-base font-medium text-white hover:bg-gray-50 hover:text-black">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>

            <span className="relative transform duration-700 group-hover:-translate-x-1">
              Shop
            </span>
          </Button>

          <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-white  border-2 border-black px-6 md:px-12 py-3 text-base font-medium text-black hover:bg-gray-50 hover:text-white">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-black opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>

            <span className="relative transform duration-700 group-hover:-translate-x-1">
              Small small
            </span>
          </Button>

          <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-white  border-2 border-black px-6 md:px-12 py-3 text-basefont-medium text-black hover:bg-gray-50 hover:text-white">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-black opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>
            <span className="relative transform duration-700 group-hover:-translate-x-1">
              Own
            </span>
          </Button>
        </div>
      </div>
      <hr className="mb-" />
    </>
  );
};

const SingleHeroCard = ({ heroCard, isMiddle }) => {
  return (
    <div
      className={`${
        isMiddle
          ? "md:w-[620px] md:h-[440px] z-20 rounded-lg transform transition-transform duration-300"
          : "w-[440px] h-[350px] md:w-[342px] md:h-[402px] rounded-xl"
      } relative`}
    >
      <img
        src={heroCard.image}
        alt={heroCard.alt}
        className="relative w-full h-full object-cover rounded-lg"
      />
      <p className="absolute bottom-10 grid grid-cols-1 mx-6 md:ml-6">
        <span className="flex items-baseline gap-2 text-white font-semibold text-lg md:text-xl">
          {heroCard.text} <img src={heroCard.shoppingCart} alt="Add to cart" />
        </span>
        <span className="text-white font-normal text-base md:text-lg">
          {heroCard.textDetails}
        </span>
      </p>
    </div>
  );
};
