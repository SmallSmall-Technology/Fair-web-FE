import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const UserMenuDropdown = ({ setUserMenuIsOpen, userMenuIsOpen }) => {
  const menuRef = useRef(null);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = userMenuIsOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [userMenuIsOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        userMenuIsOpen
      ) {
        setUserMenuIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuIsOpen]);
  return (
    <>
      <AnimatePresence>
        {userMenuIsOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUserMenuIsOpen(false)}
            />

            <motion.div
              ref={menuRef}
              initial={{ y: "-2%", opacity: 0.5 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white z-50 h-fit pb-80 top-20 bottom-shadow"
            >
              <ul className="flex flex-col space-y-3 p-6 pt-2 h-full w-full">
                {[
                  { label: "My account", href: "/user-dashboard" },
                  { label: "Shopping overview", href: "" },
                  { label: "Notifications", href: "#" },
                  { label: "Account profile", href: "#" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="text-base font-semibold cursor-pointer transition-colors duration-200 hover:text-black hover:underline focus:outline-none focus:text-black"
                    onClick={() => se(false)}
                  >
                    <a href={item.href} aria-label={item.label}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
