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
          {/* <PhoneNumberForm /> */}
          <GetApp />
        </div>
      </main>
    </div>
  );
};

export default React.memo(Home);

// import { useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// import { postPhoneNumber } from '../../services/api';

// export const PhoneNumberForm = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');

//   // const {
//   //   mutate,
//   //   data,
//   //   error,
//   //   isPending: isLoading,
//   // } = useMutation({
//   //   mutationFn: postPhoneNumber,
//   // });

//   const { mutate, data, error, isPending } = useMutation({
//     mutationFn: postPhoneNumber,
//     onSuccess: (data) => {
//       console.log('Phone number validated:', data);
//     },
//     onError: (err) => {
//       console.error('Error validating phone number:', err.message);
//     },
//   });

//   const handleSendNumber = (e) => {
//     e.preventDefault();
//     mutate(phoneNumber);
//     setPhoneNumber('');
//   };

//   return (
//     <form onSubmit={handleSendNumber}>
//       <label htmlFor="number">phoneNumber</label>
//       <input
//         type="number"
//         id="number"
//         className="border"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <button type="submit" className="border bg-slate-500 rounded-md">
//         Submit
//       </button>
//     </form>
//   );
// };
