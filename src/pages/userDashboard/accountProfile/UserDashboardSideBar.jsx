import { NavLink } from 'react-router-dom';

export const UserDashboardSideBar = ({ sideBarData, children }) => {
  return (
    <ul className=" lg:hidden xl:block flex items-center lg:items-start pt-2  mb-4 border-b-2 w-full pb-4 lg:border-none lg:pb-0 overflow-x-auto lg:overflow-x-clip lg:flex-col lg:space-y-4 lg:space-x-0">
      {sideBarData.map((data) => (
        <li className="min-w-fit" key={data.title}>
          <NavLink
            to={data.link}
            className={({ isActive }) =>
              isActive
                ? 'font-semibold md:bg-[#F6F6F6] md:rounded-[20px] md:border-none border-b-2 border-black px-6 lg:pr-10 md:py-2 py-4'
                : 'font-semibold px-6 '
            }
          >
            {data.title}
          </NavLink>
        </li>
      ))}
      {children}
    </ul>
  );
};
