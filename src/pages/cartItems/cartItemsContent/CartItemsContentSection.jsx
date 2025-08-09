import { CartItem } from './CartItem';
import React, { useEffect, useState } from 'react';
import { CartSummary } from './CartSummary';
import { IncomeUpgrade } from './IncomeUpgrade';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../../utils/FormatCurrency';
import {
  getTotalCartQuantity,
  getTotalCartPrice,
  setItemPaymentPlan,
  fetchCart,
  updateCartItemPaymentPlan,
} from '../../../features/cart/cartSlice';
import { CartSummaryExtrasAndCoupon } from './CartSummaryExtrasAndCoupon';
import ChangePlanModal from '../../../utils/ChangePlanModal';

const CartItemsContentSection = React.memo(() => {
  const shippingFee = +1200;
  const navigate = useNavigate();
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false); // 🔹 Modal open for all items
  const [paymentOptions, setPaymentOptions] = useState([]);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const VAT = (7.5 / 100) * totalCartPrice;
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const subtTotal = totalCartPrice + VAT + shippingFee;
  const dispatch = useDispatch();

  // Sync Redux store
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const cartSessionID =
    useSelector((state) => state.cart.sessionID) ||
    localStorage.getItem('cartSessionID');

  const { cart: cartItems, loading } = useSelector((state) => state.cart);

  // 🔹 Change plan for ALL items in the cart
  const handlePlanChange = (newPlan) => {
    cartItems.forEach((item) => {
      dispatch(
        updateCartItemPaymentPlan({
          productID: item.productID,
          selectedPaymentPlan: newPlan,
          cartSessionID,
        })
      );
    });
    setPlanModalOpen(false); // close modal after changing
  };
  const handleCheckout = () => {
    if (subtTotal > 500000 && !isUpgraded) {
      return;
    }

    navigate('checkout');
  };

  return (
    <main className="my-5 pt-36 lg:pt-28">
      <div className="mx-6 lg:mx-[60px] 2xl:mx-[150px] flex space-x-[510px] items-center justify-between lg:justify-start mb-6">
        <h1 className="hidden lg:flex font-semibold text-3xl">Your Cart</h1>
        <h1 className="flex lg:hidden font-semibold text-3xl">Shopping Cart</h1>
        {cartItems.length > 0 && (
          <button
            type="submit"
            onClick={() => setPlanModalOpen(true)} // 🔹 Open modal for all cart items
            className="group relative inline-flex items-center overflow-hidden h-[22px] px-5 bg-[var(--yellow-primary)] text-xs rounded-2xl text-black hover:bg-gray-50 hover:text-black hover:underline"
          >
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>
            <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-xs">
              Change Plan
            </span>
          </button>
        )}
      </div>
      {cartItems.length > 0 && (
        <>
          <div className="lg:hidden mx-4">
            {subtTotal > 500000 && (
              <IncomeUpgrade onUpgrade={() => setIsUpgraded(true)} />
            )}
          </div>
          <hr className="lg:hidden mt-8 mb-6" />
          <div className="lg:hidden mx-6 lg:mx-[60px] 2xl:mx-[150px]">
            <button
              type="submit"
              onClick={handleCheckout}
              className={`group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)] border-2 w-full mx-auto md:px-12 py-2 text-lg font-medium hover:bg-gray-50 ${
                subtTotal >= 500000 && !isUpgraded
                  ? 'bg-[#E5E5E5] text-[#CDCBCC]'
                  : 'bg-yellow-300 text-black'
              }`}
            >
              <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>
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
        {cartItems.length < 1 ? (
          <>
            <p className="mt-4 text-gray-500">Your cart is empty.</p>
            <Link to="/">Go back home to add products to cart</Link>
          </>
        ) : (
          <div className="grid grid-cols-1 w-full lg:grid-cols-[60%_36%] gap-6 justify-between mt-6">
            <div className="flex flex-col gap-6 lg:h-screen lg:overflow-y-auto lg:scroll-smooth custom-scrollbar-hidden">
              {cartItems?.map((item, index) => (
                <CartItem item={item} key={index} isLoading={loading} />
              ))}
            </div>

            <aside>
              <CartSummary
                onHandleCheckout={handleCheckout}
                isUpgraded={isUpgraded}
                setIsUpgraded={setIsUpgraded}
              />
              <CartSummaryExtrasAndCoupon />
            </aside>
          </div>
        )}
      </section>

      {/* 🔹 Modal for selecting plan for ALL items */}
      {planModalOpen && (
        <ChangePlanModal
          isOpen={planModalOpen}
          onClose={() => setPlanModalOpen(false)}
          onSave={handlePlanChange}
          currentPlan={paymentOptions}
        />
      )}
    </main>
  );
});

export default CartItemsContentSection;
