import { Dot } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { YellowButton } from '../../../utils/Button.jsx';
import { CartCoupon } from '../../../features/cart/CartCoupon.jsx';
import { formatCurrency } from '../../../utils/FormatCurrency.jsx';
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from '../../../features/cart/cartSlice.js';
import { CartFooter } from '../../cartItems/CartFooter.jsx';
import { CancelPurchase } from '../../cartItems/CartHeader.jsx';
import { consolidateCartPayments } from '../../../utils/ConsolidateCartPayment.js';
import { getPaymentLabel } from '../../cartItems/cartItemsContent/CartSummary.jsx';
import { useNavigate } from 'react-router-dom';
import { setMandateData } from '../../../features/mono/mandateSlice.js';
import { useProceedToMandate } from '../../../hooks/useProceedToMandate.jsx';

export const CheckoutPaymentSummary = ({ onSubmitPaymentMethod }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = +1200;
  const subtTotal = totalCartPrice;
  const total = totalCartPrice + VAT + shippingFee;

  const cartPaymentPlan = cart.map(
    (item) => item.paymentPlan || item.selectedPaymentPlan
  );
  const isConsolidatedCart = cartPaymentPlan.every((plan) => plan === 'full');

  const consolidatedPayments = consolidateCartPayments(cart);

  // Function to handle proceeding to mandate creation
  const handleProceedToMandate = useProceedToMandate();

  const debtProfileVerified = false;

  return (
    <>
      <div className="rounded-[10px] lg:bg-[#F2F2F2] lg:py-6 px-8 h-fit">
        <div className="space-y-4">
          <div className="lg:hidden ">
            <CartCoupon />
          </div>
          <div className="flex justify-between gap-2 font-medium text-xl w-full">
            <div className="flex items-center">
              <p className="text-sm font-medium">Subtotal</p>
              <span className="flex text-sm font-medium">
                <Dot />
                {totalCartQuantity} {cart.length > 1 ? 'items' : 'item'}
              </span>
            </div>
            <p className="font-normal text-base">{formatCurrency(subtTotal)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-sm">
              VAT <span className="text-[#96959F]">7.5%</span>
            </p>
            <p className="text-right">{formatCurrency(VAT)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-sm">Shipping</p>
            <p className="text-right">{formatCurrency(shippingFee)}</p>
          </div>
        </div>

        {!isConsolidatedCart && (
          <div className="px- lg:hidden">
            <hr className="mt-8 mb-2" />
            <div className="font-inter flex justify-between items-center">
              {cart.length > 1 ? (
                <p className="font-medium">Consolidated cart</p>
              ) : (
                <p className="font-medium">Cart</p>
              )}
            </div>

            {/* Payment Schedule */}
            <article
              className="bg-[#FAFAFA] rounded-[12px] my-4 p-4 space-y-2 
                             h-48 overflow-y-auto scroll-smooth 
                             scrollbar-hide"
            >
              {/* First Payment */}
              <div className="flex justify-between w-full">
                <div className="font-inter">
                  <p>First Payment</p>
                  <p className="text-[#828386]">Today</p>
                </div>
                <p className="font-calsans">
                  {formatCurrency(consolidatedPayments.firstPayment)}
                </p>
              </div>

              {/* Other Installments */}
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

        <div className="flex justify-between my-8">
          <div className="grid-cols-1 w-full">
            <div className="flex justify-between font-medium text-xl w-full mb-8 lg:mb-0 font-calsans">
              <p className="text-xl">Total</p>
              <p className="text-lg">{formatCurrency(total)}</p>
            </div>

            <div className="lg:hidden flex flex-col justify-center gap-5 font-inter">
              {!consolidateCartPayments ? (
                <YellowButton onClick={onSubmitPaymentMethod}>
                  Pay now
                </YellowButton>
              ) : (
                <YellowButton
                  onClick={handleProceedToMandate}
                  disabled={!debtProfileVerified}
                >
                  Set up direct debit
                </YellowButton>
              )}

              <div className="mx-auto">
                <CancelPurchase />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="lg:hidden">
        <CartFooter />
      </section>
    </>
  );
};
