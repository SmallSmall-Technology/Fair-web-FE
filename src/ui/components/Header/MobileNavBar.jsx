import { Link } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { useDispatch, useSelector } from 'react-redux';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShoppingCart, User, X } from 'lucide-react';
import { getTotalCartQuantity } from '../../../features/cart/cartSlice';
import {
  getUserIsAuthenticated,
  logout,
} from '../../../features/auth/authSlice';
import { toast } from 'react-toastify';

const CartDropdownItems = React.lazy(() => import('./CartDropdownItems'));
const UserMenuDropdown = React.lazy(() => import('./UserMenuDropdown'));
const Shop = React.lazy(() => import('./Shop'));

export const MobileNavBar = () => {
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [shopIsOpen, setShopIsOpen] = useState(false);
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const totalProductsInCart = useSelector(getTotalCartQuantity);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const isAuthenticated = useSelector(getUserIsAuthenticated);
  const dispatch = useDispatch();

  const handleLogOutUser = () => {
    dispatch(logout());
    toast.dismiss();
    toast.success('Logged Out Successfully', {
      className: 'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
      bodyClassName: 'm-0 p-0',
      closeButton: false,
    });
    setHamburgerIsOpen(false);
  };

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = hamburgerIsOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [hamburgerIsOpen]);

  // Close menu on outside click
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hamburgerIsOpen]);

  const handleShopMenu = () => {
    setShopIsOpen((shopIsOpen) => !shopIsOpen);
  };

  const handleUserMenuDropdown = () => {
    setUserMenuIsOpen((userMenuIsOpen) => !userMenuIsOpen);
  };

  const hanldeCartDropdownItems = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-4">
          <li className="cursor-pointer">
            <User
              onClick={handleUserMenuDropdown}
              color={isAuthenticated ? '#FFDE11' : undefined}
            />
          </li>

          <div>
            <li className="relative">
              {totalProductsInCart > 0 && (
                <div className="bg-[#FB0202] text-white text-[11px] font-medium p-1 rounded-full absolute bottom-[14px] left-3 min-w-6 flex justify-center">
                  {totalProductsInCart}
                </div>
              )}
              <button
                aria-label="View shopping cart"
                onClick={hanldeCartDropdownItems}
              >
                <ShoppingCart size={26} aria-hidden="true" />
              </button>
            </li>

            <Suspense fallback={''}>
              <div className="absolute right-2 top-[4.02rem] w-[412px]">
                <CartDropdownItems isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </Suspense>
          </div>

          <li className="relative">
            <Hamburger toggled={hamburgerIsOpen} toggle={setHamburgerIsOpen} />
          </li>

          <AnimatePresence>
            {hamburgerIsOpen && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setHamburgerIsOpen(false)}
                />

                <motion.div
                  ref={menuRef}
                  initial={{ y: '-100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="absolute inset-0 bg-white z-50 h-screen"
                >
                  <button
                    className="w-full flex justify-end pt-5 pr-5"
                    onClick={() => setHamburgerIsOpen(false)}
                  >
                    <X />
                  </button>
                  <ul className="flex flex-col space-y-6 p-6 pt-10 h-full w-full">
                    {[
                      { label: 'Shop' },
                      { label: 'Gift card' },
                      { label: 'Sell' },
                      { label: 'Help' },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="text-base font-semibold  cursor-pointer transition-colors duration-200 hover:underline focus:outline-none focus:text-black"
                      >
                        {item.label === 'Shop' ? (
                          <p
                            className="flex items-center justify-between cursor-pointer mb-0"
                            aria-label={item.label}
                            onClick={handleShopMenu}
                          >
                            <span>{item.label}</span>
                            <ChevronRight />
                          </p>
                        ) : (
                          item.label
                        )}
                      </li>
                    ))}
                    <hr className="my-2" />
                    {!isAuthenticated ? (
                      <li className="font-semibold flex space-x-3">
                        <Link
                          to="/login"
                          onClick={() => setHamburgerIsOpen(false)}
                        >
                          Log in
                        </Link>
                        <span className="text-[#89898A]">or</span>
                        <Link
                          to="/sign-up"
                          onClick={() => setHamburgerIsOpen(false)}
                        >
                          Create account
                        </Link>
                      </li>
                    ) : (
                      <li className="font-semibold" onClick={handleLogOutUser}>
                        Log out
                      </li>
                    )}
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </ul>
      </nav>
      {shopIsOpen && (
        <Suspense
          fallback={
            <div class="max-w-sm p-4 border rounded-lg shadow-md bg-white">
              <div class="animate-pulse space-y-4">
                <div class="h-48 bg-gray-300 rounded-lg"></div>

                <div class="h-6 bg-gray-300 rounded w-3/4"></div>
                <div class="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          }
        >
          <Shop
            setHamburgerIsOpen={setHamburgerIsOpen}
            setShopIsOpen={setShopIsOpen}
            shopIsOpen={shopIsOpen}
          />
        </Suspense>
      )}

      {userMenuIsOpen && (
        <Suspense
          fallback={
            <div class="max-w-sm p-4 border rounded-lg shadow-md bg-white">
              <div class="animate-pulse space-y-4">
                <div class="h-48 bg-gray-300 rounded-lg"></div>

                <div class="h-6 bg-gray-300 rounded w-3/4"></div>
                <div class="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          }
        >
          <UserMenuDropdown
            userMenuIsOpen={userMenuIsOpen}
            setUserMenuIsOpen={setUserMenuIsOpen}
          />
        </Suspense>
      )}
    </>
  );
};
