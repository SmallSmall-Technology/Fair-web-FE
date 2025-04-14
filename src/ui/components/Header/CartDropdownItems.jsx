import { X } from "lucide-react";
import { Subtotal } from "./NavBar";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavBarCartItem } from "./NavBarCartItem";
import { motion, AnimatePresence } from "framer-motion";
import {
  getCart,
  getTotalCartQuantity,
} from "../../../features/cart/cartSlice";

export const CartDropdownItems = ({ isOpen, setIsOpen }) => {
  const CartItems = useSelector(getCart);
  const CartQuantity = useSelector(getTotalCartQuantity);

  const menuRef = useRef(null);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            ref={menuRef}
            initial={{ y: "-5%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-white z-50 h-fit top-5 shadow-md"
          >
            <div className="flex justify-between items-center px-5 mb-5">
              <p className="min-w-fit pt-4">Cart Summary</p>
              <button
                className="w-full flex justify-end"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>
            </div>
            <hr className="my-3" />
            <section>
              {CartQuantity >= 1 ? (
                <p className="text-[#16161A] px-5">
                  You have {CartQuantity} {CartQuantity > 1 ? "items" : "item"}{" "}
                  in your cart.
                </p>
              ) : (
                <p className="text-[#16161A] px-5 flex justify-center items-center">
                  Your cart is currently empty. Head back to the home page to
                  add some great products!
                </p>
              )}

              <ul className="overflow-scroll h-96">
                {CartItems.map((item, index) => (
                  <NavBarCartItem item={item} key={index} />
                ))}
              </ul>
            </section>
            {CartQuantity >= 1 ? <Subtotal /> : ""}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
