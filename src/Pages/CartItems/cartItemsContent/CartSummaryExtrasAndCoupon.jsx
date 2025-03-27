import { Link } from "react-router-dom";
import { CartCoupon } from "../../../features/cart/CartCoupon";

export const CartSummaryExtrasAndCoupon = () => {
  const coupon = true;
  return (
    <article className="pl-8 mt-4 hidden md:block">
      <Link to="/login" className="underline">
        Login or Join
      </Link>
      {coupon && <CartCoupon />}
    </article>
  );
};
