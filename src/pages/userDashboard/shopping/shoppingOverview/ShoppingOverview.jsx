import { Outlet } from 'react-router-dom';
import ShoppingOverviewSideBar from './ShoppingOverviewSideBar';
import { UserDashboardSideBar } from '../../accountProfile/UserDashboardSideBar';
import { CreditScoreCard } from './CreditScoreCard';

const ShoppingOverviewData = [
  {
    title: 'Summary',
    link: '/user-dashboard/shopping-overview/summary',
  },
  {
    title: 'Purchases',
    link: '/user-dashboard/shopping-overview/purchases',
  },
  {
    title: 'Direct Debit',
    link: '/user-dashboard/shopping-overview/direct-debit',
  },
  {
    title: 'Credit',
    link: '/user-dashboard/shopping-overview/credit-wallet',
  },
  {
    title: 'Favorites',
    link: '/user-dashboard/shopping-overview/favorites',
  },
  {
    title: 'Recently viewed',
    link: '/user-dashboard/shopping-overview/recently-viewed',
  },
];

const ShoppingOverview = () => {
  return (
    <>
      <section className="grid grid-cols-1 xl:grid-cols-[18%_80%] mt-8">
        <UserDashboardSideBar sideBarData={ShoppingOverviewData}>
          <li className="pt-4 hidden lg:block px-1">
            <CreditScoreCard />
          </li>
        </UserDashboardSideBar>
        <Outlet />
      </section>
    </>
  );
};

export default ShoppingOverview;
