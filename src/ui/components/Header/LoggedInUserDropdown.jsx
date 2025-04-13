import { AnimatePresence, motion } from "framer-motion";
import { CircleUserRound, Power } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getUserFullName } from "../../../features/auth/authSlice";
import { Link } from "react-router-dom";

export const LoggedInUserDropdown = ({
  loggedInUserDropdown,
  setLoggedInUserDropdown,
}) => {
  const menuRef = useRef(null);
  const userFullName = useSelector(getUserFullName);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = loggedInUserDropdown ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loggedInUserDropdown]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        loggedInUserDropdown
      ) {
        setLoggedInUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loggedInUserDropdown]);

  return (
    <AnimatePresence>
      {loggedInUserDropdown && (
        <>
          <motion.div
            className="fixed inset-0 bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLoggedInUserDropdown(false)}
          />

          <motion.div
            ref={menuRef}
            initial={{ y: "-5%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-white h-full z-50  top-5 shadow-md"
          >
            <div className="bg-white h-full grid py-2 shadow-lg rounded-[10px]">
              <div className="flex items-center space-x-2 px-3 py-3">
                {/* <img src={<CircleUserRound />} alt="" /> */}
                <CircleUserRound className="" size={22} />
                <p className="flex text-xs text-balance mb-0">{userFullName}</p>
              </div>
              <hr />
              <div className="px-3 my-1 grid gap-2 py-2">
                <Link>My Account settings</Link>
                <Link className="flex justify-between w-full items-center">
                  <span>Purchases</span>
                  <span className="bg-[#FFDE11] px-3 text-[10px]">2</span>
                </Link>
              </div>
              <hr />
              <div className="flex items-center space-x-2 px-3 pb-4">
                <span>
                  <Power />
                </span>
                <p className="mb-0 py-3">Log out</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
