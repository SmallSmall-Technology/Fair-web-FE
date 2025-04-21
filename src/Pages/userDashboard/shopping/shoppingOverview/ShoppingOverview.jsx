import { Outlet } from 'react-router-dom';
import ShoppingOverviewSideBar from './ShoppingOverviewSideBar';

const ShoppingOverview = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[18%_80%] mt-8">
        <ShoppingOverviewSideBar />
        <Outlet />
      </section>
    </>
  );
};

export default ShoppingOverview;
