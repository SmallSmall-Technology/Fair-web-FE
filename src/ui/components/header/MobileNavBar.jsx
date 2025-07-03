import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, ShoppingCart, User, X } from 'lucide-react';
import { getTotalCartQuantity } from '../../../features/cart/cartSlice';
import {
  getUserIsAuthenticated,
  logout,
} from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import CartDropdownItems from './CartDropdownItems';
import UserMenuDropdown from './UserMenuDropdown';
import Shop from './Shop';
import React from 'react';

export const MobileNavBar = () => {
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shopIsOpen, setShopIsOpen] = useState(false);
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const totalProductsInCart = useSelector(getTotalCartQuantity);
  const isAuthenticated = useSelector(getUserIsAuthenticated);
  const dispatch = useDispatch();

  const hanldeCartDropdownItems = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogOutUser = () => {
    dispatch(logout());
    toast.success('Logged Out Successfully', {
      className: 'bg-[#FFDE11] text-black text-sm rounded-md min-h-0',
    });
    setHamburgerIsOpen(false);
  };

  const handleShopToggle = () => {
    setHamburgerIsOpen(false);
    setShopIsOpen(true);
  };

  {
    shopIsOpen && (
      <Shop
        isOpen={shopIsOpen}
        onClose={() => {
          setShopIsOpen(false);
          setTimeout(() => setHamburgerIsOpen(true), 300);
        }}
      />
    );
  }

  const handleBackFromShop = () => {
    setShopIsOpen(false);
    setTimeout(() => setHamburgerIsOpen(true), 100);
  };

  useEffect(() => {
    document.body.style.overflow = hamburgerIsOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [hamburgerIsOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerIsOpen
      ) {
        setHamburgerIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hamburgerIsOpen]);

  return (
    <>
      <nav aria-label="Main navigation ">
        <ul className="flex items-center gap-4">
          <li>
            <User
              onClick={() => setUserMenuIsOpen(!userMenuIsOpen)}
              color={isAuthenticated ? '#FFDE11' : undefined}
              className="cursor-pointer"
            />
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

            <div className="absolute right-0 top-[4.02rem] min-w-[320px] max-w-[412px] bg-gray-700">
              <CartDropdownItems isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </li>

          <li>
            <Hamburger toggled={hamburgerIsOpen} toggle={setHamburgerIsOpen} />
          </li>
        </ul>
      </nav>
      {hamburgerIsOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setHamburgerIsOpen(false)}
          />
          <div
            ref={menuRef}
            className="absolute inset-0 bg-white h-screen transform transition-transform duration-300"
          >
            <div className="flex justify-end px-4 pt-5">
              <button onClick={() => setHamburgerIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="p-6 pt-10 space-y-6">
              <li
                onClick={handleShopToggle}
                className="flex justify-between items-center cursor-pointer"
              >
                <span className="font-semibold">Shop</span>
                <ChevronRight />
              </li>
              {['Gift card', 'Sell', 'Help'].map((item) => (
                <li
                  key={item}
                  className="font-semibold cursor-pointer hover:underline"
                >
                  {item}
                </li>
              ))}
              <hr className="my-2" />
              {isAuthenticated ? (
                <li
                  className="font-semibold cursor-pointer"
                  onClick={handleLogOutUser}
                >
                  Log out
                </li>
              ) : (
                <li className="flex space-x-3">
                  <Link
                    to="/login"
                    className="font-semibold"
                    onClick={() => setHamburgerIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <span className="text-[#89898A]">or</span>
                  <Link
                    to="/sign-up"
                    className="font-semibold"
                    onClick={() => setHamburgerIsOpen(false)}
                  >
                    Create account
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      <Shop isOpen={shopIsOpen} onClose={handleBackFromShop} />

      {userMenuIsOpen && (
        <UserMenuDropdown
          userMenuIsOpen={userMenuIsOpen}
          setUserMenuIsOpen={setUserMenuIsOpen}
        />
      )}
    </>
  );
};
