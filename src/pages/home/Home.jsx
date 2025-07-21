import GetApp from './homeLandingPage/GetApp';
import React, { useEffect, useState } from 'react';
import FeaturesBar from './homeLandingPage/FeaturesBar';
import IntroSection from './homeLandingPage/IntroSection';
import { useLocation, useNavigate } from 'react-router-dom';
import LandingHeader from './homeLandingPage/LandingHeader';
import CreditSection from './homeLandingPage/CreditSection';
import { HomeHeroBanner } from './homeLandingPage/HomeHeroBanner';
import RecentlyViewedProducts from './homeLandingPage/RecentlyViewedProducts';
import PopularCategories from './homeLandingPage/popularProductsCategories/PopularCategories';
import { DirectDebitBankSetupSuccessModal } from '../checkoutItems/directDebitSetup/directDebitBankSetUp/DirectDebitBankSetupSuccessModal';

const Home = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.showSuccessModal) {
      setShowModal(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  return (
    <div>
      <LandingHeader />
      <DirectDebitBankSetupSuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onGotoPurchases={() => {
          navigate('/user-dashboard/shopping-overview/purchases');
        }}
      />
      <main>
        <div className="pt-8 mx-5">
          <HomeHeroBanner />
          <IntroSection />
          <FeaturesBar />
        </div>
        <PopularCategories />
        <div className="pt-8 mx-5">
          <CreditSection />
          <RecentlyViewedProducts />
          <GetApp />
        </div>
      </main>
    </div>
  );
};

export default React.memo(Home);
