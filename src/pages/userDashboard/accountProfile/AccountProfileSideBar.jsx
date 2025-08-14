import { NavLink } from 'react-router-dom';

const accountProfileData = [
  {
    title: 'Profile Summary',
    link: '/user-dashboard/account-profile/profile-summary',
  },
  {
    title: 'Account Verification',
    link: '/user-dashboard/account-profile/account-verification',
  },
  {
    title: 'Delivery Address',
    link: '/user-dashboard/account-profile/delivery-address',
  },
  {
    title: 'Feedback',
    link: '/user-dashboard/account-profile/feedback',
  },
  {
    title: 'Resolution Centre',
    link: '/user-dashboard/account-profile/resolution-centre',
  },
];

export const AccountProfileSideBar = () => {
  return (
    <ul className=" lg:hidden xl:block flex items-center lg:items-start pt-2  mb-4 border-b-2 w-full pb-4 lg:border-none lg:pb-0 overflow-x-auto lg:overflow-x-clip lg:flex-col lg:space-y-4 lg:space-x-0">
      {accountProfileData.map((data) => (
        <li className="min-w-fit">
          <NavLink
            to={data.link}
            className={({ isActive }) =>
              isActive
                ? 'font-semibold  border-b-2 border-black px-6 lg:pr-10 py-4'
                : 'font-semibold px-6 '
            }
          >
            {data.title}
          </NavLink>
        </li>
      ))}
      {/* <li className="min-w-fit">
        <NavLink
          to="/user-dashboard/account-profile/profile-summary"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-10 py-2'
              : 'font-semibold px-6 '
          }
        >
          Profile Summary
        </NavLink>
      </li>
      <li className="min-w-fit">
        <NavLink
          to="/user-dashboard/account-profile/account-verification"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 py-2 '
              : 'font-semibold px-6'
          }
        >
          Account Verification
        </NavLink>
      </li>{' '}
      <li className="min-w-fit">
        <NavLink
          to="/user-dashboard/account-profile/delivery-address"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-10 py-2 '
              : 'font-semibold px-6'
          }
        >
          Delivery Address
        </NavLink>
      </li>
      <li className="min-w-fit">
        <NavLink
          to="/user-dashboard/account-profile/feedback"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-20 py-2 '
              : 'font-semibold px-6'
          }
        >
          Feedback
        </NavLink>
      </li>{' '}
      <li className="min-w-fit">
        <NavLink
          to="/user-dashboard/account-profile/resolution-centre"
          className={({ isActive }) =>
            isActive
              ? 'font-semibold bg-[#F6F6F6] rounded-[20px] px-6 lg:pr-10 py-2 '
              : 'font-semibold px-6'
          }
        >
          Resolution Centre
        </NavLink>
      </li> */}
    </ul>
  );
};
