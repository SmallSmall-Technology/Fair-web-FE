import { Dot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { useProceedToMandate } from '../../../hooks/useProceedToMandate.jsx';
import { consolidateCartPayments } from '../../../utils/ConsolidateCartPayment.js';
import { getPaymentLabel } from '../../cartItems/cartItemsContent/CartSummary.jsx';
import { selectVerificationStatus } from '../../../features/user/accountVerificationSlice.js';
import {
  selectCurrentAddress,
  selectedDeliveryType,
} from '../../../features/order/deliveryAddressSlice.js';
import { useCreateMandate } from '../../../hooks/useProceedToPaystackPayment.jsx';
import { useFullPayment } from '../../../hooks/useFullPayment.jsx';
import { useEffect } from 'react';
import { setMandateData } from '../../../features/paystack/mandateSlice.js';
import { useDownPayment } from '../../../hooks/useDownPayment.jsx';

export const CheckoutPaymentSummary = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useDispatch();
  const currentDeliveryAddress = useSelector(selectCurrentAddress);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const VAT = (7.5 / 100) * totalCartPrice;
  const userSelectedDeliveryType = useSelector(selectedDeliveryType);

  const shippingFee = userSelectedDeliveryType?.amount;
  const subtTotal = totalCartPrice + shippingFee + VAT || 0;

  const total = totalCartPrice + shippingFee + VAT;

  const cartPaymentPlan = cart.map(
    (item) => item.paymentPlan || item.selectedPaymentPlan
  );

  const isConsolidatedCart = !cart.every(
    (item) => item.paymentPlan === 'full' && item.selectedPaymentPlan === 'full'
  );

  const consolidatedPayments = consolidateCartPayments(cart);
  const downPayment = consolidatedPayments.firstPayment + VAT + shippingFee;
  const fullPayment = totalCartPrice + VAT + shippingFee;
  const proceedToMandate = useProceedToMandate();

  const mandateData = useSelector((state) => state.mandate.data);

  const { createMandate, isValidating } = useCreateMandate();

  const deliveryAddress = [
    currentDeliveryAddress?.streetAddress || latest_address?.streetAddress,
    currentDeliveryAddress?.state || latest_address?.state,
  ]
    .filter(Boolean)
    .join(', ');

  // console.log(deliveryAddress);

  const {
    handlePayFullPayment,
    isValidating: Processing,
    validationData,
  } = useFullPayment();

  const {
    handlePayDownPayment,
    isValidating: isVerifying,
    validationData: downPaymentValidationData,
  } = useDownPayment();

  // useEffect(() => {
  //   if (!isConsolidatedCart) {
  //     dispatch(
  //       setMandateData({
  //         products: cart,
  //         consolidated_total_amount: fullPayment,
  //         paymentMethod: 'full',
  //         deliveryState: currentDeliveryAddress?.state || latest_address?.state,
  //         deliveryFullAddress:
  //           currentDeliveryAddress?.streetAddress ||
  //           latest_address?.streetAddress,
  //       })
  //     );
  //   }
  // }, [shippingFee]);

  const handleCreatePaystackCustomer = () => {
    if (!mandateData) return;
    createMandate(mandateData);
  };

  const isVerified = useSelector((state) =>
    selectVerificationStatus(state, 'debt')
  );

  const handleProceedToMandate = () => {
    if (!mandateData) return;
    proceedToMandate(mandateData);
  };

  return (
    <>
      <div className="rounded-[10px] lg:bg-[#F2F2F2] lg:py-6 px-8 h-fit">
        <div className="space-y-4">
          <div className="lg:hidden ">
            <CartCoupon />
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-sm">
              VAT{' '}
              {isConsolidatedCart ? (
                <span className="text-[#96959F]">
                  7.5%(added to your first payment)
                </span>
              ) : null}
            </p>
            <p className="text-right">{formatCurrency(VAT)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-sm">Shipping fee</p>
            <p className="text-right">{formatCurrency(shippingFee)}</p>
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
        </div>

        {isConsolidatedCart && (
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
              <div className=" lg:hidden">
                {isConsolidatedCart ? (
                  <button
                    type="button"
                    disabled={!isVerified}
                    onClick={handleProceedToMandate}
                    className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
                      !isVerified
                        ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                        : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
                    }`}
                  >
                    Checkout securely
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!isVerified || Processing}
                    onClick={handlePayFullPayment}
                    className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
                      !isVerified
                        ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                        : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
                    }`}
                  >
                    {Processing ? 'Processing...' : 'Pay now'}
                  </button>
                )}
              </div>

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
