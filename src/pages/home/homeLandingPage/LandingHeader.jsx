import { NavLink } from 'react-router-dom';

export default function LandingHeader() {
  return (
    <header className="overflow-x-auto">
      <nav className="flex gap-4 px-4 py-2 whitespace-nowrap text-sm w-fit">
        <NavLink
          to="/home-living"
          className={({ isActive }) =>
            isActive ? 'text-red-700 font-semibold' : 'hover:text-red-500'
          }
        >
          Home & Living
        </NavLink>

        <NavLink
          to="/lifestyle"
          className={({ isActive }) =>
            isActive ? 'text-red-700 font-semibold' : 'hover:text-red-500'
          }
        >
          Lifestyle & Consumer Goods
        </NavLink>

        <NavLink
          to="/electronics"
          className={({ isActive }) =>
            isActive ? 'text-red-700 font-semibold' : 'hover:text-red-500'
          }
        >
          Electronics
        </NavLink>

        <NavLink
          to="/food-drink"
          className={({ isActive }) =>
            isActive ? 'text-red-700 font-semibold' : 'hover:text-red-500'
          }
        >
          Food & Drink
        </NavLink>

        <NavLink
          to="/real-estate"
          className={({ isActive }) =>
            isActive ? 'text-red-700 font-semibold' : 'hover:text-red-500'
          }
        >
          Real Estate
        </NavLink>

        <NavLink
          to="/education-training"
          className={({ isActive }) =>
            isActive ? 'text-red-700 font-semibold' : 'hover:text-red-500'
          }
        >
          Education & Training
        </NavLink>

        <NavLink
          to="/automotive"
          className={({ isActive }) =>
            isActive ? 'text-red-700 font-semibold' : 'hover:text-red-500'
          }
        >
          Automotive
        </NavLink>

        <NavLink
          to="/sales-offers"
          className={({ isActive }) =>
            isActive
              ? 'text-red-700 font-semibold underline'
              : 'hover:text-red-500'
          }
        >
          Sales & Offers
        </NavLink>
      </nav>
    </header>
  );
}
