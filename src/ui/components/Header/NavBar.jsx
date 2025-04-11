import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart, ShoppingCart } from "lucide-react";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../../../features/cart/cartSlice";
import { getTotalFavouritesQuantity } from "../../../features/favourite/favouriteSlice";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { YellowButton } from "../../../utils/Button";
import { CartDropdownItems } from "./CartDropdownItems";

export const NavBar = () => {
  const totalProductsInCart = useSelector(getTotalCartQuantity);
  const totalFavouritesProduct = useSelector(getTotalFavouritesQuantity);
  const [isOpen, setIsOpen] = useState(false);

  const hanldeCartDropdownItems = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center space-x-6">
        <li className="flex items-center space-x-1 font-medium text-[#333]">
          <a
            href="/download"
            aria-label="Download our mobile app"
            className="text-[#737376] hover:text-black focus:text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors motion-safe:duration-200 hover:underline"
          >
            Download app
            <img
              src="/images/mobile-phone.svg"
              alt="Mobile phone icon"
              width={24}
              height={24}
              className="inline-block ml-1 transition-transform hover:scale-110 motion-safe:duration-200"
              loading="lazy"
            />
          </a>
        </li>
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
        <li aria-hidden="true">
          <hr className="mx-2 h-[22px] w-[1.5px] bg-[#DEDEDE]" />
        </li>
        <li>
          <button
            className="bg-[#F6F6F6] px-4 py-2 rounded-full font-medium flex items-center space-x-1 hover:bg-gray-200 active:bg-gray-300 focus:ring-2 focus:ring-[#FFDE11] transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
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
            // className="rounded transition-colors motion-safe:duration-200 hover:scale-110 active:scale-90"
          >
            <Heart size={24} aria-hidden="true" />
          </Link>
        </li>
        <div>
          <li className="relative" onClick={hanldeCartDropdownItems}>
            {totalProductsInCart > 0 && (
              <div className="bg-[#FB0202] text-white text-[11px] font-medium p-1 rounded-full absolute bottom-[14px] left-3 min-w-6 flex justify-center">
                {totalProductsInCart}
              </div>
            )}
            <button
              aria-label="View shopping cart"
              // className="rounded transition-colors motion-safe:duration-200 hover:scale-110 active:scale-90"
            >
              <ShoppingCart size={26} aria-hidden="true" />
            </button>
          </li>

          <div className="absolute right-2 top-[4.02rem] w-[412px]">
            <CartDropdownItems isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
        <li>
          <button
            type="button"
            className="group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[#FFDE11] border-2 border-[#FFDE11] px-4 py-2 text-lg font-medium text-black hover:bg-gray-50 hover:text-black transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
          >
            <span className="absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all duration-400 ease-in-out group-hover:top-0 group-hover:h-full"></span>
            <span className="relative transform duration-700 group-hover:-translate-x-1 font-medium text-base">
              Sell
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export const Subtotal = () => {
  const subTotal = useSelector(getTotalCartPrice);

  return (
    <article className="px-5 py-5 pb-10 top-shadow">
      <div className="flex items-center justify-between mb-4">
        <p>Subtotal</p>
        <p>{formatCurrency(subTotal)}</p>
      </div>
      <div className="w-[90%] mx-auto">
        <YellowButton>Check Out</YellowButton>
      </div>
    </article>
  );
};
