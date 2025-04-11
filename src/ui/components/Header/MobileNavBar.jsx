"use client";
import { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChevronRight, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTotalCartQuantity } from "../../../features/cart/cartSlice";

export const MobileNavBar = () => {
  const menuRef = useRef(null);
  const totalProductsInCart = useSelector(getTotalCartQuantity);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = hamburgerIsOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hamburgerIsOpen]);

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-4">
        <li>
          <Link to="user-dashboard">
            <User />
          </Link>
        </li>
        <li className="relative">
          {totalProductsInCart > 0 && (
            <div className="bg-[#FFDE11] text-xs font-bold p-1 rounded-full absolute bottom-4 left-3 min-w-5 flex justify-center">
              {totalProductsInCart}
            </div>
          )}
          <Link to="/cart-items" aria-label="View shopping cart">
            <img
              src="/images/shopping-cart.svg"
              alt="Shopping cart"
              width={24}
              height={24}
              loading="lazy"
            />
          </Link>
        </li>
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
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
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
                    { label: "Shop", href: "/download" },
                    { label: "Gift card" },
                    { label: "Sell" },
                    { label: "Help" },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="font-semibold"
                      onClick={() => setHamburgerIsOpen(false)}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-center justify-between"
                          aria-label={item.label}
                        >
                          <span>{item.label}</span>
                          <ChevronRight />
                        </a>
                      ) : (
                        item.label
                      )}
                    </li>
                  ))}
                  <hr className="my-2" />
                  <li className="font-semibold flex space-x-3">
                    <Link to="/login" onClick={() => setHamburgerIsOpen(false)}>
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
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </ul>
    </nav>
  );
};
