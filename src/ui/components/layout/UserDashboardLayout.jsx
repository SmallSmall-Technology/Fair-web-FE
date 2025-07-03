import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
import { CartFooter } from '../../../pages/cartItems/CartFooter';

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
