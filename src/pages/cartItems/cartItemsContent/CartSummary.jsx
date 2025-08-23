import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IncomeUpgrade } from './IncomeUpgrade';
import { getPaymentDates } from '../../../utils/PaymentDates';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { getCartSummary } from '../../../features/cart/cartSlice';
import { consolidateCartPayments } from '../../../utils/ConsolidateCartPayment';

/**
 * Dynamic label for each installment
 */
export const getPaymentLabel = (index, length) => {
  if (index === 0) return '2nd Payment';
  if (index === 1) return '3rd Payment';
  if (index === length - 1) return 'Final Payment';
  return `${index + 2}th Payment`;
};

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
  const subtTotal = totalCartPrice + VAT;
  const cartPaymentPlan = cart.map((item) => item.paymentPlan);
  const isConsolidatedCart = cartPaymentPlan.every((plan) => plan === 'full');
  const consolidatedPayments = consolidateCartPayments(cart);

  return (
    <>
      <div className="rounded-[10px] lg:bg-[#F2F2F2] py-6 lg:px-8 h-fit">
        <hr className="lg:hidden mb-8" />

        {/* Cart Summary: Items, VAT, Shipping */}
        <div className="font-inter font-medium space-y-4">
          <div className="flex justify-between">
            <p className="hidden lg:flex font-medium">
              {cart.length > 1 ? 'items' : 'item'} ({totalCartQuantity}) total
            </p>
            <p className="lg:hidden font-medium">Item</p>
            <p className="text-right">{formatCurrency(totalCartPrice)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">VAT</p>
            <p className="text-right">{formatCurrency(VAT)}</p>
          </div>
        </div>

        {/* Consolidated Payments (only if not full payment) */}
        {!isConsolidatedCart && (
          <div>
            <hr className="mt-8 mb-2" />
            <div className="font-inter flex justify-between items-center">
              {cart.length > 1 ? (
                <p className="font-medium">Consolidated cart</p>
              ) : (
                <p className="font-medium">Cart</p>
              )}
              <Link to="" className="text-[11px] underline">
                What is a consolidated cart?
              </Link>
            </div>

            {/* Payment Schedule */}
            <article
              className="bg-[#FAFAFA] rounded-[12px] my-4 p-4 space-y-2 
             h-48 overflow-y-auto scroll-smooth 
             scrollbar-hide"
            >
              {/* First Payment (always today) */}
              <div className="flex justify-between w-full">
                <div className="font-inter">
                  <p>First Payment</p>
                  <p className="text-[#828386]">Today</p>
                </div>
                <p className="font-calsans">
                  {formatCurrency(consolidatedPayments.firstPayment + VAT)}
                </p>
              </div>

              {/* Other Installments with dates */}
              {consolidatedPayments.otherPayments.map((payment, index, arr) => (
                <div key={index} className="flex justify-between w-full">
                  <div className="font-inter">
                    <p>{getPaymentLabel(index, arr.length)}</p>
                    <p className="text-[#828386]">{payment.date}</p>
                  </div>
                  <p className="font-calsans">
                    {formatCurrency(payment.amount)}
                  </p>
                </div>
              ))}
            </article>

            <hr className="mt-8 mb-2" />
          </div>
        )}

        {/* Subtotal Section */}
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

          <div className="font-calsans hidden lg:flex justify-between text-xl w-full">
            <p>Subtotal</p>
            <p>{formatCurrency(subtTotal)}</p>
          </div>
        </div>

        {/* Checkout Buttons */}
        <div className="hidden lg:block">
          <button
            type="submit"
            onClick={onHandleCheckout}
            className={`font-calsans group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)] border-2 w-full mx-auto md:px-12 py-2 text-lg font-medium hover:bg-gray-50 ${
              subtTotal >= 500000 && !isUpgraded
                ? 'bg-[#E5E5E5] text-[#CDCBCC]'
                : 'bg-yellow-300 text-black'
            }`}
          >
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full" />
            <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
              Checkout
            </span>
          </button>
        </div>

        <div className="lg:hidden">
          <button
            type="submit"
            onClick={onHandleCheckout}
            className={`font-calsans group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)] border-2 w-full mx-auto md:px-12 py-2 text-lg font-medium hover:bg-gray-50 ${
              subtTotal >= 500000 && !isUpgraded
                ? 'bg-[#E5E5E5] text-[#CDCBCC]'
                : 'bg-yellow-300 text-black'
            }`}
          >
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full" />
            <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
              Go to Checkout
            </span>
          </button>
        </div>
      </div>

      {/* Income Upgrade prompt */}
      <div className="mt-8 hidden lg:block">
        {subtTotal >= 500000 && (
          <IncomeUpgrade onUpgrade={() => setIsUpgraded(true)} />
        )}
      </div>
    </>
  );
};
