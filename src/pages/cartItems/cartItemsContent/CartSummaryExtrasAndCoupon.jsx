// import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartCoupon } from '../../../features/cart/CartCoupon';
import { getUserIsAuthenticated } from '../../../features/auth/authSlice';

// Modal.setAppElement('#app');

export const CartSummaryExtrasAndCoupon = () => {
  const couponIsActive = true;
  const isAuthenticated = useSelector(getUserIsAuthenticated);
  return (
    <article className="pl-8 mt-4 hidden md:block">
      {!isAuthenticated && (
        <Link to="/login" className="underline">
          Login or Join
        </Link>
      )}
      {couponIsActive && <CartCoupon />}
    </article>
  );
};
