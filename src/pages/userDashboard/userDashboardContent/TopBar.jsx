import { NavLink } from 'react-router-dom';

const TopBar = () => {
  return (
    <ul className="hidden lg:flex space-x-10 border-b-2 w-full pb-3">
      <li>
        <NavLink
          to="/user-dashboard/shopping-overview/summary"
          className={({ isActive }) =>
            isActive
              ? 'text-[#222224] border-b-2 border-black pb-[14px]'
              : 'text-[#737376]'
          }
        >
          Shopping overview
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/user-dashboard/notifications"
          className={({ isActive }) =>
            isActive
              ? 'text-[#222224] border-b-2 border-black pb-[14px]'
              : 'text-[#737376]'
          }
        >
          Notifications
        </NavLink>
      </li>{' '}
      <li>
        <NavLink
          to="/user-dashboard/account-profile/profile-summary"
          className={({ isActive }) =>
            isActive
              ? 'text-[#222224] border-b-2 border-black pb-[14px]'
              : 'text-[#737376]'
          }
        >
          Account profile
        </NavLink>
      </li>{' '}
    </ul>
  );
};

export default TopBar;
