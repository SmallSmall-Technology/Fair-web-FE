import { NavLink } from 'react-router-dom';

const ShoppingOverviewSideBar = () => {
  return (
    <ul className="lg:hidden xl:block flex items-center lg:items-start pt-2 space-x-3 mb-4 border-b-2 w-full pb-4 lg:border-none lg:pb-0 overflow-x-auto lg:overflow-x-clip lg:flex-col lg:space-y-4 lg:space-x-0">
      {/* <li className="border-b-2 border-black pb-[15px] lg:border-none lg:pb-0"> */}
      <li>
        <NavLink
          to="/user-dashboard/shopping-overview/summary"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-20 py-2'
              : 'font-semibold px-6'
          }
        >
          Summary
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/user-dashboard/shopping-overview/purchases"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-[76px] py-2 '
              : 'font-semibold px-6'
          }
        >
          Purchases
        </NavLink>
      </li>{' '}
      <li className="min-w-fit">
        <NavLink
          to="/user-dashboard/shopping-overview/direct-debit"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-20 py-2 '
              : 'font-semibold px-6'
          }
        >
          Direct Debit
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/user-dashboard/shopping-overview/wallet"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-[105px] py-2 '
              : 'font-semibold px-6'
          }
        >
          Wallet
        </NavLink>
      </li>{' '}
      <li>
        <NavLink
          to="/user-dashboard/shopping-overview/favorites"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-20 py-2 '
              : 'font-semibold px-6'
          }
        >
          Favorites
        </NavLink>
      </li>
      <li className="text-nowrap">
        <NavLink
          to="/user-dashboard/shopping-overview/recently-viewed"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 py-2 '
              : 'font-semibold px-6'
          }
        >
          Recently viewed
        </NavLink>
      </li>
    </ul>
  );
};

export default ShoppingOverviewSideBar;
