import { Outlet } from 'react-router-dom';
import { TopBar } from './userDashboardContent/TopBar';
import { MarketingAds } from './userDashboardContent/MarketingAds';

const UserDashboard = () => {
  return (
    <main className="mx-6 lg:mx-[60px] mt-4 pt-36 lg:pt-28">
      <MarketingAds />
      <h1 className="hidden lg:block text-3xl font-semibold mb-6">My Fair</h1>
      <p className="lg:hidden font-semibold mb-6 text-[#96959F]">
        My Fair account
      </p>

      <TopBar />
      <Outlet />
    </main>
  );
};

export default UserDashboard;
