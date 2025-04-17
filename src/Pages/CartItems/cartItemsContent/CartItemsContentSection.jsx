import { CartItem } from './CartItem';
import { useSelector } from 'react-redux';
import { CartSummary } from './CartSummary';
import { Link, useNavigate } from 'react-router-dom';
import { YellowButton } from '../../../utils/Button';
import { CartSummaryExtrasAndCoupon } from './CartSummaryExtrasAndCoupon';
import {
  getTotalCartQuantity,
  getCart,
  getTotalCartPrice,
} from '../../../features/cart/cartSlice';
import React from 'react';
import { formatCurrency } from '../../../utils/FormatCurrency';

const CartItemsContentSection = React.memo(() => {
  const cart = useSelector(getCart);
  const navigate = useNavigate();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = +1200;
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const subtTotal = totalCartPrice + VAT + shippingFee;

  const handleCheckout = () => {
    navigate('checkout');
  };

  return (
    <main className="my-5 pt-36 lg:pt-28">
      <div className="mx-6 lg:mx-[60px] 2xl:mx-[150px]">
        <h1 className="hidden lg:flex font-semibold text-3xl">Your Cart</h1>
        <h1 className="flex lg:hidden font-semibold text-3xl">Shopping Cart</h1>
      </div>
      {cart.length < 1 ? (
        ''
      ) : (
        <>
          <hr className="lg:hidden my-6" />
          <div className="lg:hidden mx-6 lg:mx-[60px] 2xl:mx-[150px]">
            <YellowButton onClick={handleCheckout}>Go to Checkout</YellowButton>
            <div className="flex justify-between items-baseline">
              <div className="flex gap-2 mt-6 font-medium text-xl">
                <p>Subtotal</p>({totalCartQuantity}{' '}
                {totalCartQuantity === 1 ? 'items' : 'item'})
              </div>
              <p className="font-medium mb-0">{formatCurrency(subtTotal)}</p>
            </div>
          </div>
        </>
      )}
      <hr className="lg:hidden mt-6 mb-4" />
      <section className="mx-6 lg:mx-[60px] 2xl:mx-[150px]">
        {cart.length < 1 ? (
          <>
            <p className="mt-4 text-gray-500">Your cart is empty.</p>
            <Link to="/">Go back home to add products to cart</Link>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 w-full lg:grid-cols-[60%_36%] gap-6 justify-between mt-6 ">
              <div className="grid grid-cols-1 gap-10 lg:h-screen lg:overflow-y-auto">
                {cart.map((item, index) => (
                  <CartItem item={item} key={index} />
                ))}
              </div>
              <aside>
                <CartSummary onHandleCheckout={handleCheckout} />
                <CartSummaryExtrasAndCoupon />
              </aside>
            </div>
          </>
        )}
      </section>
    </main>
  );
});
export default CartItemsContentSection;
