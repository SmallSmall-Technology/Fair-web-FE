import { X } from 'lucide-react';
import { Subtotal } from './NavBar';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavBarCartItem } from './NavBarCartItem';
import {
  getCart,
  getTotalCartQuantity,
} from '../../../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const CartDropdownItems = ({ isOpen, setIsOpen }) => {
  const CartItems = useSelector(getCart);
  const CartQuantity = useSelector(getTotalCartQuantity);
  const [internalOpen, setInternalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setInternalOpen(true);
    } else {
      const timer = setTimeout(() => setInternalOpen(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!internalOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={menuRef}
        className={`shadow-2xl fixed w-full md:w-[420px] h-fit right-0 bg-white z-50 pb-52 top-[130px] md:top-[77px] transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-5%] opacity- 0'
        }`}
      >
        <div className="flex justify-between items-center px-5 mb-5">
          <p className="hidden md:flex min-w-fit pt-4 font-medium">
            Cart Summary
          </p>
          <p className="min-w-fit pt-4 font-medium md:hidden">Shopping Cart</p>

          <button
            className="w-full flex justify-end pt-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="hidden md:flex w-5 h-5" />
          </button>
        </div>

        <hr className="my-3" />

        <section className="px-5">
          {CartQuantity >= 1 ? (
            <p className="text-[#16161A]">
              You have {CartQuantity} {CartQuantity > 1 ? 'items' : 'item'} in
              your cart.
            </p>
          ) : (
            <div className="flex flex-col justify-between md:h-screen">
              <p className="hidden text-[#16161A] md:flex items-center font-semibold">
                Your cart is empty.
              </p>

              <div className="md:hidden flex flex-col justify-center h-full text-center mt-6">
                <p className="text-[#16161A] flex items-center font-semibold justify-center mb-3">
                  Your shopping cart is empty
                </p>
                <Link to="/" className="underline mb-1">
                  Shop
                </Link>
                <Link to="/home-living" className="underline mb-1">
                  {' '}
                  Home & Living
                </Link>
                <Link to="/lifestyle" className="underline mb-1">
                  {' '}
                  Lifestyle & Consumer goods
                </Link>
                <Link to="/electronics" className="underline">
                  {' '}
                  Electronics
                </Link>
              </div>
            </div>
          )}

          <ul className="overflow-y-auto h-[50svh] mt-4">
            {CartItems.map((item, index) => (
              <NavBarCartItem item={item} key={index} />
            ))}
          </ul>
        </section>

        {CartQuantity >= 1 && (
          <div className="absolute bottom-10 w-full">
            <Subtotal />
          </div>
        )}
      </div>
    </>
  );
};

export default CartDropdownItems;
