import { Outlet } from 'react-router-dom';
import ShoppingOverviewSideBar from './ShoppingOverviewSideBar';
import React from 'react';

const ShoppingOverview = () => {
  return (
    <>
      <section className="grid grid-cols-1 xl:grid-cols-[18%_80%] mt-8">
        <ShoppingOverviewSideBar />
        <Outlet />
      </section>
    </>
  );
};

export default ShoppingOverview;
