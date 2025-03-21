import { Outlet } from "react-router";
import { ShoppingOverviewSideBar } from "./ShoppingOverviewSideBar";

export const ShoppingOverview = () => {
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-[18%_80%] mt-8">
        <ShoppingOverviewSideBar />
        <Outlet />
      </section>
    </>
  );
};
