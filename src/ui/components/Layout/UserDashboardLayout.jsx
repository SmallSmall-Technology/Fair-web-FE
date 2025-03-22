import { Outlet } from "react-router";
import Header from "../header/Header";
import { CartFooter } from "../../../pages/cartItems/CartFooter";
import { UserDashboard } from "../../../pages/userDashboard/UserDashboard";

const UserDashboardLayout = () => {
  return (
    <div className="flex flex-col justify-between">
      <Header />
      <Outlet />
      <CartFooter />
    </div>
  );
};

export default UserDashboardLayout;
