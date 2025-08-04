import {
  getCartSummary,
  getTotalCartPrice,
  getTotalCartQuantity,
} from '../../../features/cart/cartSlice';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { IncomeUpgrade } from './IncomeUpgrade';
import { Link } from 'react-router-dom';

export const CartSummary = ({
  onHandleCheckout,
  isUpgraded,
  setIsUpgraded,
}) => {
  const cart = useSelector((state) => state.cart.cart);
  const cartSummary = useSelector(getCartSummary);
  const totalCartQuantity = cartSummary.total_items || 0;
  const totalCartPrice = cartSummary.subtotal || 0;
  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = +1200;
  const subtTotal = totalCartPrice + VAT + shippingFee;
  const cartPaymentPlan = cart.map((item) => item.paymentPlan);
  const isConsolidatedCart = cartPaymentPlan.every((plan) => plan === 'full');

  return (
    <>
      <div className=" rounded-[10px] lg:bg-[#F2F2F2] py-6 lg:px-8 h-fit">
        <hr className="lg:hidden mb-8" />
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="hidden lg:flex font-medium">
              {cart.length > 1 ? 'items' : 'item'} ({totalCartQuantity}) total
            </p>
            <p className="lg:hidden font-medium">Item </p>

            <p className="text-right">{formatCurrency(totalCartPrice)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">VAT</p>
            <p className="text-right">{formatCurrency(VAT)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Shipping</p>
            <p className="text-right">{formatCurrency(shippingFee)}</p>
          </div>
        </div>
        {isConsolidatedCart && (
          <div>
            <hr className="mt-8 mb-2" />
            <div className="flex justify-between items-center">
              <p className="font-semibold">Consolidated cart</p>
              <Link to="" className="text-[11px] underline">
                What is a consolidated cart?
              </Link>
            </div>
            <article className="bg-[#FAFAFA] rounded-[12px] my-4 p-4">
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
              <p>Hello</p>
            </article>
            <hr className="mt-8 mb-2" />
          </div>
        )}
        <div className="flex justify-between mb-8">
          <div className="flex justify-between gap-2 lg:hidden font-medium lg:text-xl w-full">
            <div className="flex gap-1">
              <p>Subtotal</p>
              <span>
                ({totalCartQuantity} {cart.length > 1 ? 'items' : 'item'})
              </span>
            </div>
            <p>{formatCurrency(subtTotal)}</p>
          </div>

          <div className="hidden lg:flex justify-between font-medium text-xl w-full">
            <p>Subtotal</p>
            <p>{formatCurrency(subtTotal)}</p>
          </div>
        </div>
        <div className="hidden lg:block">
          <button
            type="submit"
            onClick={onHandleCheckout}
            className={`group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)]  border-2  w-full mx-auto  md:px-12 py-2 text-lg font-medium  hover:bg-gray-50   ${subtTotal >= 500000 && !isUpgraded ? 'bg-[#E5E5E5] text-[#CDCBCC]' : 'bg-yellow-300 text-black'}`}
          >
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>

            <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
              Go to Checkout
            </span>
          </button>
        </div>
        <div className="lg:hidden">
          <button
            type="submit"
            onClick={onHandleCheckout}
            className={`group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)]  border-2  w-full mx-auto  md:px-12 py-2 text-lg font-medium  hover:bg-gray-50   ${subtTotal >= 500000 && !isUpgraded ? 'bg-[#E5E5E5] text-[#CDCBCC]' : 'bg-yellow-300 text-black'}`}
          >
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>

            <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
              Go to Checkout
            </span>
          </button>
        </div>
      </div>
      <div className="mt-8 hidden lg:block">
        {subtTotal >= 500000 && (
          <IncomeUpgrade onUpgrade={() => setIsUpgraded(true)} />
        )}
      </div>
    </>
  );
};
