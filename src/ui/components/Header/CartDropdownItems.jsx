import { X } from 'lucide-react';
import { Subtotal } from './NavBar';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavBarCartItem } from './NavBarCartItem';
import {
  getCart,
  getTotalCartQuantity,
} from '../../../features/cart/cartSlice';

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
        className={`fixed w-[320px] md:w-[420px] h-fit right-0 bg-white z-50 pb-52 top-[75px] transform transition-all duration-300 ease-in-out shadow-lg ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-5%] opacity-0'
        }`}
      >
        <div className="flex justify-between items-center px-5 mb-5">
          <p className="min-w-fit pt-4">Cart Summary</p>
          <button
            className="w-full flex justify-end pt-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
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
            <p className="text-[#16161A] flex justify-center items-center">
              Your cart is currently empty.
            </p>
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
