import { NavBar } from './NavBar';
// import { Link } from 'react-router-dom';
import SearchQuery from './SearchQuery';
import { MobileNavBar } from './MobileNavBar';
import Logo from '../Logo';
import React from 'react';

const Header = () => {
  return (
    <header
      className="max-w-[1740px] mx-auto w-full fixed top-0 left-0 right-0 bg-white z-30 py-4 flex justify-between lg:border-b border-gray-200 transition-all motion-safe:duration-200"
      role="banner"
      aria-label="Main site navigation"
    >
      <div className="hidden lg:flex justify-between items-center w-full px-4 sm:px-6 lg:px-10 max-w-full mx-auto">
        <Logo />
        <SearchQuery />
        <NavBar />
      </div>

      {/* Mobile view header */}
      <div className="grid gap-4 lg:hidden w-full px-4 sm:px-6 ">
        <div className="flex justify-between items-center">
          <Logo className="motion-safe:transition-transform" />
          <MobileNavBar />
        </div>
        <SearchQuery />
      </div>
    </header>
  );
};

export default React.memo(Header);
