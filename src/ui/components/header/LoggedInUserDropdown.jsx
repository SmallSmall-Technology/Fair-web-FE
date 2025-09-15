import { Power } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, performLogout } from '../../../features/auth/authSlice';
import { getUserFullName } from '../../../features/user/userSlice';
import { useOrders } from '../../../pages/userDashboard/shopping/shoppingOverviewContents/purchase/useOrders';

export const LoggedInUserDropdown = ({
  loggedInUserDropdown,
  setLoggedInUserDropdown,
}) => {
  const menuRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const userFullName = useSelector(getUserFullName);
  const dispatch = useDispatch();
  const { onGoingOrders } = useOrders();

  useEffect(() => {
    if (loggedInUserDropdown) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [loggedInUserDropdown]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setLoggedInUserDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogOutUser = () => {
    dispatch(performLogout());
    toast.success('Logged Out Successfully', {
      className:
        'bg-[var(--yellow-primary)] text-black text-sm rounded-md min-h-0',
    });
    setLoggedInUserDropdown(false);
  };

  if (!isMounted) return null;

  return (
    <div
      ref={menuRef}
      className={`absolute top] w-56 h-[184px] rounded-[10px] inset-0 !bg-white  z-50 top-10 shadow-md transform transition-all duration-300 ease-out ${
        loggedInUserDropdown
          ? 'translate-y-0 opacity-100'
          : '-translate-y-4 opacity-0'
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white h-full grid py-2 shadow-lg rounded-[10px] >">
        <div className="flex items-center space-x-2 px-3 py-3">
          <img src="/images/user.svg" alt="User avatar" />
          <p className="flex text-xs text-balance mb-0">
            {userFullName || 'Guest'}
          </p>
        </div>
        <hr />
        <div className="px-3 my-1 grid gap-2 py-2 text-xs pb-4">
          <Link
            to="/user-dashboard/account-profile/profile-summary"
            className="text-black no-underline"
          >
            My Account settings
          </Link>
          <Link
            to="/user-dashboard/shopping-overview/purchases"
            className="flex justify-between w-full items-center text-black no-underline"
          >
            <span>Purchases</span>
            <span className="bg-[var(--yellow-primary)] px-3 text-[10px]">
              {onGoingOrders.length}
            </span>
          </Link>
        </div>
        <hr />
        <div
          className="flex items-center space-x-2 px-3 cursor-pointer"
          onClick={handleLogOutUser}
        >
          <Power size={14} />
          <p className="mb-0 py-3 text-xs">Log out</p>
        </div>
      </div>
    </div>
  );
};
