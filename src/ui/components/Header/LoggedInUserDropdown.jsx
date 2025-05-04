import { Power } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { getOngoingOrders } from '../../../features/order/orderSlice';
import { getUserFullName, logout } from '../../../features/auth/authSlice';

export const LoggedInUserDropdown = ({
  loggedInUserDropdown,
  setLoggedInUserDropdown,
}) => {
  const menuRef = useRef(null);
  const userFullName = useSelector(getUserFullName);
  const ongoingOrders = useSelector(getOngoingOrders);
  const dispatch = useDispatch();

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = loggedInUserDropdown ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [loggedInUserDropdown]);

  const handleLogOutUser = () => {
    dispatch(logout());
    toast.dismiss();
    toast.success('Logged Out Successfully', {
      className: 'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
      bodyClassName: 'm-0 p-0',
      closeButton: false,
    });
  };

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
            initial={{ y: '-5%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-10%', opacity: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-white h-full z-50 top-2 shadow-md rounded-[10px]"
          >
            <div className="bg-white h-full grid py-2 shadow-lg rounded-[10px]">
              <div className="flex items-center space-x-2 px-3 py-3">
                <img src="/images/user.svg" alt="User avatar" />
                <p className="flex text-xs text-balance mb-0">{userFullName}</p>
              </div>
              <hr />
              <div className="px-3 my-1 grid gap-2 py-2 text-xs pb-4">
                <Link className="text-black no-underline">
                  My Account settings
                </Link>
                <Link className="flex justify-between w-full items-center text-black no-underline">
                  <span>Purchases</span>
                  <span className="bg-[#FFDE11] px-3 text-[10px] ">
                    {ongoingOrders.length}
                  </span>
                </Link>
              </div>
              <hr />
              <div
                className="flex items-center space-x-2 px-3"
                onClick={handleLogOutUser}
              >
                <span>
                  <Power size={14} />
                </span>
                <p className="mb-0 py-3 text-xs">Log out</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
