// import { useEffect, useState } from 'react';
// import { Button } from '../../../utils/Button';
// import { heroCards } from '../../../utils/data';

// export const HeroCards = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (heroCards.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % heroCards.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [heroCards.length]);

//   return (
//     <>
//       <div className="relative grid gap-6 lg:justify-center items-center overflow-hidden md:overflow-visible">
//         <div className="hidden lg:flex justify-center mx-auto items-center absolute bg-[#FFDE11] w-[100%] 2xl:hidden h-60 z-0 overflow-clip">
//           <img
//             src="/images/hero-card-bg.svg"
//             alt="Decorative background"
//             className="object-contain w-full h-full"
//           />
//           <img
//             src="/images/hero-card-bg.svg"
//             alt="Decorative background"
//             className="object-contain w-full h-full"
//           />
//         </div>

//         <div>
//           <ul className="hidden lg:flex gap-4 justify-between items-center relative z-10 mx-auto h-96 my-8 ">
//             {heroCards.map((heroCard, index) => (
//               <li
//                 key={index}
//                 className={`hidden lg:block justify-between h-full transition-all duration-700 ease-in-out ${
//                   index === 1
//                     ? 'min-h-[440px] min-w-[620px]'
//                     : 'h-[402px] w-full'
//                 }`}
//               >
//                 <span
//                   className={`flex h-full w-full ${
//                     index === currentIndex ? 'opacity-100' : 'opacity-100'
//                   }
//                   `}
//                 >
//                   <img src={heroCard.image} alt={heroCard.alt} />
//                 </span>
//               </li>
//             ))}
//           </ul>

//           <ul className="lg:hidden relative flex h-56 md:h-96 rounded-lg w-full">
//             {heroCards.map((heroCard, index) => (
//               <li
//                 key={heroCard.id}
//                 className={`absolute flex w-full h-full transition-opacity duration-700 ease-in-out ${
//                   index === currentIndex ? 'opacity-100' : 'opacity-0'
//                 }`}
//                 aria-hidden={index !== currentIndex}
//               >
//                 <img
//                   src={heroCard.image}
//                   alt={heroCard.alt}
//                   className="w-full h-full object-cover rounded-[10px]"
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className=" my-2 mb-0 flex justify-center space-x-4">
//           {heroCards.map((_, index) => (
//             <button
//               aria-label={`Go to card ${index + 1}`}
//               key={index}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === currentIndex ? 'bg-[#CDCBCC]' : 'bg-[#ECEAEA]'
//               }`}
//               onClick={() => setCurrentIndex(index)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   setCurrentIndex(index);
//                 }
//               }}
//             ></button>
//           ))}
//         </div>
//       </div>
//       <div className="grid grid-cols-1 gap-4 place-items-center text-center mb-8 mt-4">
//         <p>Steps to buying</p>
//         <div className=" flex space-x-2">
//           <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-black  border-2 border-black px-3 md:px-12 py-3 text-base font-medium text-white hover:bg-gray-50 hover:text-black">
//             <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>

//             <span className="relative transform duration-700 group-hover:-translate-x-1">
//               Shop
//             </span>
//           </Button>

//           <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-white  border-2 border-black px-3 md:px-12 py-3 text-base font-medium text-black hover:bg-gray-50 hover:text-white">
//             <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-black opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>

//             <span className="relative transform duration-700 group-hover:-translate-x-1">
//               Small small
//             </span>
//           </Button>

//           <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-white  border-2 border-black px-3 md:px-12 py-3 text-basefont-medium text-black hover:bg-gray-50 hover:text-white">
//             <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-black opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>
//             <span className="relative transform duration-700 group-hover:-translate-x-1">
//               Own
//             </span>
//           </Button>
//         </div>
//       </div>
//       <hr className="mb-" />
//     </>
//   );
// };

// const SingleHeroCard = ({ heroCard, isMiddle }) => {
//   return (
//     <div
//       className={`${
//         isMiddle
//           ? 'md:w-[620px] md:h-[440px] z-20 rounded-lg transform transition-transform duration-300'
//           : 'w-[440px] h-[350px] md:w-[342px] md:h-[402px] rounded-xl'
//       } relative`}
//     >
//       <img
//         src={heroCard.image}
//         alt={heroCard.alt}
//         className="relative w-full h-full object-cover rounded-lg"
//       />
//       <p className="absolute bottom-10 grid grid-cols-1 mx-6 md:ml-6">
//         <span className="flex items-baseline gap-2 text-white font-semibold text-lg md:text-xl">
//           {heroCard.text} <img src={heroCard.shoppingCart} alt="Add to cart" />
//         </span>
//         <span className="text-white font-normal text-base md:text-lg">
//           {heroCard.textDetails}
//         </span>
//       </p>
//     </div>
//   );
// };

import { useEffect, useState } from 'react';
import { Button } from '../../../utils/Button';
import { heroCards } from '../../../utils/data';

export const HeroCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (heroCards.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroCards.length]);

  return (
    <>
      {/* Carousel region for screen readers */}
      <div
        className="relative grid gap-6 lg:justify-center items-center overflow-hidden md:overflow-visible"
        aria-roledescription="carousel"
        aria-label="Featured product cards"
        aria-live="polite"
      >
        <h2 className="sr-only">Featured product cards</h2>

        <div className="hidden lg:flex justify-center mx-auto items-center absolute bg-[#FFDE11] w-[100%] 2xl:hidden h-60 z-0 overflow-clip">
          <img
            src="/images/hero-card-bg.svg"
            alt=""
            aria-hidden="true"
            className="object-contain w-full h-full"
          />
          <img
            src="/images/hero-card-bg.svg"
            alt=""
            aria-hidden="true"
            className="object-contain w-full h-full"
          />
        </div>

        {/* Desktop carousel view */}
        <div>
          <ul className="hidden lg:flex gap-4 justify-between items-center relative z-10 mx-auto h-96 my-8">
            {heroCards.map((heroCard, index) => (
              <li
                key={index}
                className={`hidden lg:block transition-all duration-700 ease-in-out ${
                  index === 1
                    ? 'min-h-[440px] min-w-[620px]'
                    : 'h-[402px] w-full'
                }`}
              >
                <span className="flex h-full w-full">
                  <img
                    src={heroCard.image}
                    alt={heroCard.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </span>
              </li>
            ))}
          </ul>

          {/* Mobile carousel view */}
          <ul className="lg:hidden relative flex h-56 md:h-96 rounded-lg w-full">
            {heroCards.map((heroCard, index) => (
              <li
                key={heroCard.id}
                className={`absolute flex w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden={index !== currentIndex}
              >
                <img
                  src={heroCard.image}
                  alt={heroCard.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Indicators */}
        <div className="my-2 mb-0 flex justify-center space-x-4">
          {heroCards.map((_, index) => (
            <button
              aria-label={`Go to card ${index + 1}`}
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#CDCBCC]' : 'bg-[#ECEAEA]'
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

      {/* Buttons below carousel */}
      <div className="grid grid-cols-1 gap-4 place-items-center text-center mb-8 mt-4">
        <p>Steps to buying</p>
        <div className="flex space-x-2">
          <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-black border-2 border-black px-3 md:px-12 py-3 text-base font-medium text-white hover:bg-gray-50 hover:text-black">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
            <span className="relative transform duration-700 group-hover:-translate-x-1">
              Shop
            </span>
          </Button>

          <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-white border-2 border-black px-3 md:px-12 py-3 text-base font-medium text-black hover:bg-gray-50 hover:text-white">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-black opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
            <span className="relative transform duration-700 group-hover:-translate-x-1">
              Small small
            </span>
          </Button>

          <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-white border-2 border-black px-3 md:px-12 py-3 text-base font-medium text-black hover:bg-gray-50 hover:text-white">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-black opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
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

// Optional: If you use SingleHeroCard elsewhere, make sure it's used effectively
const SingleHeroCard = ({ heroCard, isMiddle }) => {
  return (
    <div
      className={`${
        isMiddle
          ? 'md:w-[620px] md:h-[440px] z-20 rounded-lg transform transition-transform duration-300'
          : 'w-[440px] h-[350px] md:w-[342px] md:h-[402px] rounded-xl'
      } relative`}
    >
      <img
        src={heroCard.image}
        alt={heroCard.alt}
        className="relative w-full h-full object-cover rounded-lg"
        loading="lazy"
        decoding="async"
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
