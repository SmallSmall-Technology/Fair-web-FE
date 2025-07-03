import React from 'react';
import { NavBar } from './NavBar';
import { Link } from 'react-router-dom';
import SearchQuery from './SearchQuery';
import { MobileNavBar } from './MobileNavBar';
// import LandingHeader from '../../../pages/home/homeLandingPage/LandingHeader';

const Header = () => {
  return (
    <header
      className="max-w-[1740px] mx-auto w-full fixed top-0 left-0 right-0 bg-white z-30 py-4 flex justify-between lg:border-b border-gray-200 transition-all motion-safe:duration-200"
      role="banner"
      aria-label="Main site navigation"
    >
      <div className="hidden lg:flex justify-between items-center w-full px-4 sm:px-6 lg:px-10 max-w-full mx-auto">
        <Link
          to="/"
          aria-label="Fair Home"
          // className="transition-transform focus:scale-105 focus:outline-none"
        >
          <img
            src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
            alt="Fair Logo"
            width={120}
            height={40}
            loading="eager"
            decoding="defer"
            // className="motion-safe:transition-transform"
          />
        </Link>

        <SearchQuery />
        <NavBar />
      </div>

      {/* Mobile view header */}
      <div className="grid gap-4 lg:hidden w-full px-4 sm:px-6 ">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            aria-label="Fair Home"
            className="transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
          >
            <img
              src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
              alt="Fair Logo"
              width={120}
              height={40}
              loading="eager"
              className="motion-safe:transition-transform"
            />
          </Link>
          <MobileNavBar />
        </div>
        <SearchQuery />
        {/* <LandingHeader /> */}
      </div>
    </header>
  );
};

export default React.memo(Header);
