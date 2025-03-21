import { Outlet } from "react-router";
import { MarketingAds } from "./userDashboardContent/MarketingAds";
import { TopBar } from "./userDashboardContent/TopBar";

export const UserDashboard = () => {
  return (
    <main className="mx-6 lg:mx-[60px]">
      <MarketingAds />
      <h1 className="text-3xl font-semibold mb-6">My Fair</h1>
      <TopBar />
      <Outlet />
    </main>
  );
};
