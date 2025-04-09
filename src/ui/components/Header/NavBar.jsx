import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Heart } from "lucide-react";
import { getTotalCartQuantity } from "../../../features/cart/cartSlice";
import { getTotalFavouritesQuantity } from "../../../features/favourite/favouriteSlice";

export const NavBar = () => {
  const totalProductsInCart = useSelector(getTotalCartQuantity);
  const totalFavouritesProduct = useSelector(getTotalFavouritesQuantity);

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center space-x-6">
        <li className="flex items-center space-x-1 font-medium text-[#333]">
          <a
            href="/download"
            aria-label="Download our mobile app"
            className="text-[#737376] hover:text-[#FFDE11] focus:text-[#FFDE11] focus:outline-none focus:ring-2 focus:ring-[#FFDE11] transition-colors motion-safe:duration-200 hover:underline"
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
            className="text-[#737376] hover:text-[#FFDE11] focus:text-[#FFDE11] focus:outline-none focus:ring-2 focus:ring-[#FFDE11] transition-colors motion-safe:duration-200 hover:underline"
          >
            Sign up
          </Link>
        </li>
        <li className="font-medium text-[#333]">
          <Link
            to="/login"
            aria-label="Log in to your account"
            className="text-[#737376] hover:text-[#FFDE11] focus:text-[#FFDE11] focus:outline-none focus:ring-2 focus:ring-[#FFDE11] transition-colors motion-safe:duration-200 hover:underline"
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
            <div className="bg-[#FFDE11] text-xs font-bold p-1 rounded-full absolute bottom-[14px] left-3 min-w-5 flex justify-center">
              {totalFavouritesProduct}
            </div>
          )}
          <Link
            to="/user-dashboard/shopping-overview/favorites"
            aria-label="View favorite items"
            className="text-[#333] rounded transition-colors motion-safe:duration-200 hover:scale-110 active:scale-90"
          >
            <Heart size={20} aria-hidden="true" />
          </Link>
        </li>
        <li className="relative">
          {totalProductsInCart > 0 && (
            <div className="bg-[#FFDE11] text-xs font-bold p-1 rounded-full absolute bottom-4 left-3 min-w-5 flex justify-center">
              {totalProductsInCart}
            </div>
          )}
          <Link
            to="/cart-items"
            aria-label="View shopping cart"
            className="rounded transition-transform motion-safe:duration-200 hover:scale-110 active:scale-90"
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
          <button
            type="button" // Changed to "button" for clarity
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
