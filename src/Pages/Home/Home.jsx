import React from 'react';
import GetApp from './homeLandingPage/GetApp';
import FeaturesBar from './homeLandingPage/FeaturesBar';
import IntroSection from './homeLandingPage/IntroSection';
import LandingHeader from './homeLandingPage/LandingHeader';
import CreditSection from './homeLandingPage/CreditSection';
import { HomeHeroBanner } from './homeLandingPage/HomeHeroBanner';
import RecentlyViewedProducts from './homeLandingPage/RecentlyViewedProducts';
import PopularCategories from './homeLandingPage/popularProductsCategories/PopularCategories';

const Home = () => {
  return (
    <div>
      <LandingHeader />
      <main className="pt-8 mx-5">
        <HomeHeroBanner />
        <IntroSection />
        <FeaturesBar />
        <PopularCategories />
        <CreditSection />
        <RecentlyViewedProducts />
        <GetApp />
      </main>
    </div>
  );
};

export default React.memo(Home);
