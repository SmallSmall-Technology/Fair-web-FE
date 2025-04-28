import { Suspense, lazy } from 'react';
import HeroCards from './HeroCards';
import HeroText from './HeroText';
import ProductAds from './ProductAds';
// const HeroCards = lazy(() => import('./HeroCards'));
// const ProductAds = lazy(() => import('./ProductAds'));

import { MiniProductCategories } from './MiniProductCategories';

const Hero = () => {
  return (
    <section className="mx-6 md:mx-[76px]">
      <MiniProductCategories />
      {/* <Suspense
        fallback={
          <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-full h-full bg-gray-300 rounded-lg" />
            </div>
          </div>
        }
      >
        <ProductAds />
      </Suspense> */}
      <ProductAds />
      <HeroText />
      {/* <Suspense
        fallback={
          <div className="relative h-56 md:h-96 overflow-hidden rounded-lg">
            <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-3/4 h-3/4 bg-gray-300 rounded-lg" />
            </div>
          </div>
        }
      > */}
      <HeroCards />
      {/* </Suspense> */}
    </section>
  );
};

export default Hero;

// import React, { lazy, Suspense } from 'react';

// // Dynamically import components
// const HeroCards = lazy(() => import('./HeroCards'));
// const HeroText = lazy(() => import('./HeroText'));
// const ProductAds = lazy(() => import('./ProductAds'));
// const MiniProductCategories = lazy(() => import('./MiniProductCategories'));

// const Hero = () => {
//   return (
//     <section className="mx-6 md:mx-[76px]">
//       <Suspense fallback={<div>Loading...</div>}>
//         <MiniProductCategories />
//         <ProductAds />
//         <HeroText />
//         <HeroCards />
//       </Suspense>
//     </section>
//   );
// };

// export default Hero;
