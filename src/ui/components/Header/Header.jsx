import { Field, Form, Formik } from "formik";
import { Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { YellowButton } from "../../../utils/Button";

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 bg-white z-30 py-4 flex justify-between items-center shadow-md transition-all motion-safe:duration-200"
      role="banner"
      aria-label="Main site navigation"
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-16 max-w-[1440px] mx-auto">
        <Link
          to="/"
          aria-label="Fair Home"
          className="transition-transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FFDE11]"
        >
          <img
            src="/images/fair-logo.svg"
            alt="Fair Logo"
            width={120}
            height={40}
            loading="eager"
            className="motion-safe:transition-transform"
          />
        </Link>
        <SearchQuery />
        <NavBar />
      </div>
    </header>
  );
};

export default Header;

const SearchQuery = () => {
  const initialValues = {
    search: "",
  };

  const handleSearchQuery = (values, { resetForm }) => {
    const searchTerm = values.search.trim().toLowerCase();
    resetForm();
  };

  return (
    <div className="flex w-full md:w-1/3">
      <Formik initialValues={initialValues} onSubmit={handleSearchQuery}>
        <Form className="w-full">
          <label htmlFor="search" className="sr-only">
            Search for products
          </label>
          <div className="relative flex items-center">
            <Field
              type="text"
              id="search"
              name="search"
              placeholder="Search for anything"
              className="rounded-md p-2 border text-sm w-full focus:ring-2 focus:ring-[#FFDE11] focus:border-transparent transition-all hover:border-[#FFDE11] motion-safe:duration-200"
              aria-describedby="search-button"
            />
            <button
              type="submit"
              id="search-button"
              aria-label="Submit search"
              className="absolute right-1 flex items-center py-1 px-2 bg-[#FFDE11] rounded border-[#737376] hover:bg-[#FFD700] active:bg-[#FFC107] focus:ring-2 focus:ring-[#FFDE11] transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
            >
              <Search size={12} aria-hidden="true" />
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const NavBar = () => {
  return (
    <nav aria-label="Main navigation" className="hidden lg:block">
      <ul className="flex items-center space-x-4">
        <li className="flex items-center space-x-1 font-medium text-[#333]">
          <a
            href="/download"
            aria-label="Download our mobile app"
            className="hover:text-[#FFDE11] focus:text-[#FFDE11] focus:outline-none focus:ring-2 focus:ring-[#FFDE11] transition-colors motion-safe:duration-200 hover:underline"
          >
            Download app
            <img
              src="/images/mobile-phone.svg"
              alt="Mobile phone icon"
              width={16}
              height={16}
              className="inline-block ml-1 transition-transform hover:scale-110 motion-safe:duration-200"
              loading="lazy"
            />
          </a>
        </li>
        <li className="font-medium text-[#333]">
          <Link
            to="/sign-up"
            aria-label="Create a new account"
            className="hover:text-[#FFDE11] focus:text-[#FFDE11] focus:outline-none focus:ring-2 focus:ring-[#FFDE11] transition-colors motion-safe:duration-200 hover:underline"
          >
            Sign up
          </Link>
        </li>
        <li className="font-medium text-[#333]">
          <Link
            to="/log-in"
            aria-label="Log in to your account"
            className="hover:text-[#FFDE11] focus:text-[#FFDE11] focus:outline-none focus:ring-2 focus:ring-[#FFDE11] transition-colors motion-safe:duration-200 hover:underline"
          >
            Log in
          </Link>
        </li>
        <li aria-hidden="true">
          <span className="mx-2 h-4 w-px bg-gray-300" />
        </li>
        <li>
          <button
            className="bg-[#F6F6F6] px-4 py-1 rounded-full font-medium flex items-center space-x-1 hover:bg-gray-200 active:bg-gray-300 focus:ring-2 focus:ring-[#FFDE11] transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
            aria-label="Purchase a gift card"
          >
            <img
              src="/images/gift.svg"
              alt="Gift card icon"
              width={24}
              height={24}
              loading="lazy"
              className="transition-transform hover:rotate-12 motion-safe:duration-200"
            />
            <span>Get a gift card</span>
          </button>
        </li>
        <li>
          <Link
            to="/user-dashboard/shopping-overview/favorites"
            aria-label="View favorite items"
            className="text-[#333] hover:text-[#FFDE11] focus:text-[#FFDE11] focus:ring-2 focus:ring-[#FFDE11] rounded transition-colors motion-safe:duration-200 hover:scale-110 active:scale-90"
          >
            <Heart size={20} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            aria-label="View shopping cart"
            className="focus:ring-2 focus:ring-[#FFDE11] rounded transition-transform motion-safe:duration-200 hover:scale-110 active:scale-90"
          >
            <img
              src="/images/shopping-cart.svg"
              alt="Shopping cart"
              width={24}
              height={24}
              loading="lazy"
              className="transition-all hover:brightness-125 motion-safe:duration-200"
            />
          </Link>
        </li>
        <li>
          <YellowButton
            aria-label="Sell an item"
            className="hover:bg-[#FFD700] active:bg-[#FFC107] focus:ring-2 focus:ring-[#FFDE11] transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
          >
            Sell
          </YellowButton>
        </li>
      </ul>
    </nav>
  );
};
