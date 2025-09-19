import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from '../../../features/cart/cartSlice';
import { getUserIsAuthenticated } from '../../../features/auth/authSlice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartDropdownItems from './CartDropdownItems';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { YellowButton } from '../../../utils/Button';
import { LoggedInUserDropdown } from './LoggedInUserDropdown';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { ChevronDown, ChevronUp, Heart, ShoppingCart } from 'lucide-react';
import { getUserFirstName } from '../../../features/user/userSlice';
import { useQuery } from '@tanstack/react-query';
import { fetchFavouriteProducts } from '../../../api/product-api';
import DownloadApp from '../../../utils/DownloadApp';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUserDropdown, setLoggedInUserDropdown] = useState(false);
  const userFullName = useSelector(getUserFirstName);
  const isAuthenticated = useSelector(getUserIsAuthenticated);
  const totalProductsInCart = useSelector(getTotalCartQuantity);

  const { data: favourites = [], isLoading } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavouriteProducts,
  });

  // Filter favourites to only in-stock products once
  const inStockFavourites = favourites.filter(
    (product) => product.inStock === true || product.inStock === 'true'
  );

  const totalFavouritesProduct = inStockFavourites.length;

  const hanldeCartDropdownItems = () => {
    setIsOpen(!isOpen);
  };

  const handleUserAuthDropdown = (e) => {
    e.stopPropagation();
    setLoggedInUserDropdown((prev) => !prev);
  };

  return (
    <nav aria-label="Main navigation" className="font-inter font-medium">
      <ul className="flex items-center space-x-6">
        <li className="lg:hidden xl:flex items-center space-x-1 font-medium text-[#333]">
          <DownloadApp />
        </li>
        {!isAuthenticated ? (
          <>
            <li className="font-medium text-[#333]">
              <Link
                to="/sign-up"
                aria-label="Create a new account"
                className="text-[#737376] hover:text-black focus:text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors motion-safe:duration-200 hover:underline"
              >
                Sign up
              </Link>
            </li>
            <li className="font-medium text-[#333]">
              <Link
                to="/login"
                aria-label="Log in to your account"
                className="text-[#737376] hover:text-black  focus:text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors motion-safe:duration-200 hover:underline"
              >
                Log in
              </Link>
            </li>
          </>
        ) : (
          <div className="relative">
            <li
              className="font-medium flex items-center space-x-1 cursor-pointer"
              role="button"
              onClick={handleUserAuthDropdown}
            >
              <span className="text-[#737376]">Hi,</span>
              <span>{userFullName}!</span>
              {loggedInUserDropdown ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </li>
            {loggedInUserDropdown && (
              <LoggedInUserDropdown
                loggedInUserDropdown={loggedInUserDropdown}
                setLoggedInUserDropdown={setLoggedInUserDropdown}
              />
            )}
          </div>
        )}
        <li aria-hidden="true">
          <hr className="mx-2 h-[22px] w-[1.5px] bg-[#DEDEDE]" />
        </li>
        <li className="lg:hidden xl:flex">
          <button
            className="bg-[#F6F6F6] px-4 py-2 rounded-full font-medium flex items-center space-x-1 hover:bg-gray-200 active:bg-gray-300 focus:ring-2 focus:ring-bg-[var(--yellow-primary)]  transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
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
        <li className="relative">
          {totalFavouritesProduct > 0 && (
            <div className="bg-[#FB0202] text-white text-[11px] font-medium p-1 rounded-full absolute bottom-[10px] left-3 min-w-6 flex justify-center">
              {totalFavouritesProduct}
            </div>
          )}
          <Link
            to="/user-dashboard/shopping-overview/favorites"
            aria-label="View favorite items"
          >
            <Heart size={24} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <div className="relative" onClick={hanldeCartDropdownItems}>
            {totalProductsInCart > 0 && (
              <div className="bg-[#FB0202] text-white text-[11px] font-medium p-1 rounded-full absolute bottom-[14px] left-3 min-w-6 flex justify-center">
                {totalProductsInCart}
              </div>
            )}
            <button aria-label="View shopping cart">
              <ShoppingCart size={26} aria-hidden="true" />
            </button>
          </div>

          <div className="absolute right-2 top-[4.02rem] w-[412px]">
            <CartDropdownItems isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </li>
        <li>
          <button
            type="button"
            className="group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)]  border-bg-[var(--yellow-primary)]  px-6 py-2 text-lg font-medium text-black hover:bg-gray-50 hover:text-black transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
          >
            <span className="absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all duration-400 ease-in-out group-hover:top-0 group-hover:h-full"></span>
            <span className="font-inter relative transform duration-700 group-hover:-translate-x-1 font-medium text-base">
              Sell
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export const Subtotal = () => {
  const [isUpgraded, setIsUpgraded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const subTotal = useSelector(getTotalCartPrice);

  const handleCheckout = () => {
    navigate('/cart-items/checkout');
  };

  const handleCheckoutItems = () => {
    if (location.pathname !== '/cart-items') {
      navigate('/cart-items');
    }
  };

  return (
    <article className="px-5 py-5 pb-10 top-shadow">
      <div className="flex items-center justify-between mb-4">
        <p>Subtotal</p>
        <p>{formatCurrency(subTotal)}</p>
      </div>
      <div className="w-[90%] mx-auto">
        {subTotal >= 500000 ? (
          <YellowButton onClick={handleCheckoutItems}>Check Out</YellowButton>
        ) : (
          <button
            type="submit"
            onClick={handleCheckout}
            className={`group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)]  border-2  w-full mx-auto  md:px-12 py-2 text-lg font-medium  hover:bg-gray-50   ${subTotal >= 500000 && !isUpgraded ? 'bg-[#E5E5E5] text-[#CDCBCC]' : 'bg-yellow-300 text-black'}`}
          >
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>

            <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
              Check Out
            </span>
          </button>
        )}
      </div>
    </article>
  );
};
