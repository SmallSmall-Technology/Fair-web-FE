import { Outlet } from 'react-router-dom';
import { AccountProfileSideBar } from './AccountProfileSideBar';
import { UserDashboardSideBar } from './UserDashboardSideBar';

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

const UserAccountProfile = () => {
  return (
    <>
      <section className="grid grid-cols-1 xl:grid-cols-[18%_80%] mt-8">
        <UserDashboardSideBar sideBarData={accountProfileData} />
        <Outlet />
      </section>
    </>
  );
};

export default UserAccountProfile;
