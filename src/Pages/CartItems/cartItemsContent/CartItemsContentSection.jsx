import { CartItem } from './CartItem';
import React, { useState } from 'react';
import { CartSummary } from './CartSummary';
import { IncomeUpgrade } from './IncomeUpgrade';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../../utils/FormatCurrency';
import {
  getTotalCartQuantity,
  getCart,
  getTotalCartPrice,
  setItemPaymentPlan,
} from '../../../features/cart/cartSlice';
import { CartSummaryExtrasAndCoupon } from './CartSummaryExtrasAndCoupon';
import axios from 'axios';

const CartItemsContentSection = React.memo(() => {
  const shippingFee = +1200;
  const cart = useSelector(getCart);
  const navigate = useNavigate();
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [planModalItemId, setPlanModalItemId] = useState(null);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const VAT = (7.5 / 100) * totalCartPrice;
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const subtTotal = totalCartPrice + VAT + shippingFee;
  const dispatch = useDispatch();

  const fetchPaymentOptions = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/${productId}`
      );
      return response.data.paymentOptions || [];
    } catch (error) {
      console.error('Failed to fetch payment options:', error);
      return [];
    }
  };

  const togglePlan = async (id) => {
    const item = cart.find((item) => item.id === id);
    if (!item) return;

    const options = await fetchPaymentOptions(item.productId);
    setPaymentOptions(options);
    setPlanModalItemId(id);
  };

  const handlePlanChange = (id, newPlan) => {
    dispatch(setItemPaymentPlan({ id, plan: newPlan, paymentOptions }));
    setPlanModalItemId(null);
  };

  const handleCheckout = () => {
    if (subtTotal > 1000000 && !isUpgraded) {
      return;
    }
    navigate('checkout');
  };

  return (
    <main className="my-5 pt-36 lg:pt-28">
      <div className="mx-6 lg:mx-[60px] 2xl:mx-[150px]">
        <h1 className="hidden lg:flex font-semibold text-3xl">Your Cart</h1>
        <h1 className="flex lg:hidden font-semibold text-3xl">Shopping Cart</h1>
      </div>
      {cart.length > 0 && (
        <>
          <hr className="lg:hidden my-6" />
          <div className="lg:hidden mx-4">
            <IncomeUpgrade onUpgrade={() => setIsUpgraded(true)} />
          </div>
          <hr className="lg:hidden mt-8 mb-6" />
          <div className="lg:hidden mx-6 lg:mx-[60px] 2xl:mx-[150px]">
            <button
              type="submit"
              onClick={handleCheckout}
              className={`group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[#FFDE11] border-2 w-full mx-auto md:px-12 py-2 text-lg font-medium hover:bg-gray-50 ${subtTotal >= 1000000 && !isUpgraded ? 'bg-[#E5E5E5] text-[#CDCBCC]' : 'bg-yellow-300 text-black'}`}
            >
              <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-[#FFDE11]"></span>
              <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
                Go to Checkout
              </span>
            </button>
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
            <div className="grid grid-cols-1 w-full lg:grid-cols-[60%_36%] gap-6 justify-between mt-6">
              <div className="grid grid-cols-1 gap-6 lg:h-screen lg:overflow-y-auto">
                {cart.map((item, index) => (
                  <CartItem item={item} key={index} onTogglePlan={togglePlan} />
                ))}
              </div>
              <aside>
                <CartSummary
                  onHandleCheckout={handleCheckout}
                  onTogglePlan={togglePlan}
                  isUpgraded={isUpgraded}
                  setIsUpgraded={setIsUpgraded}
                />
                <CartSummaryExtrasAndCoupon />
              </aside>
            </div>
          </>
        )}
      </section>
      {planModalItemId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Select Payment Plan</h2>
            <select
              defaultValue={
                cart.find((item) => item.id === planModalItemId).paymentPlan
              }
              onChange={(e) =>
                handlePlanChange(planModalItemId, e.target.value)
              }
              className="w-full p-2 border rounded mb-4"
            >
              <option value="upfront">Full Payment</option>
              <option value="monthly">Monthly Installments</option>
              <option value="weekly">Weekly Installments</option>
              <option value="daily">Daily Installments</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPlanModalItemId(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
});
export default CartItemsContentSection;
