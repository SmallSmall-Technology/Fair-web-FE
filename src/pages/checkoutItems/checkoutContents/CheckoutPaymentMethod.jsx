import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentOptionSchema } from '../../../utils/Validation.js';
import { formatCurrency } from '../../../utils/FormatCurrency.jsx';
import { useProceedToMandate } from '../../../hooks/useProceedToMandate.jsx';
import { Globe } from 'lucide-react';
import {
  selectCurrentAddress,
  selectedDeliveryType,
  setSelectedDeliveryType,
} from '../../../features/order/deliveryAddressSlice.js';
import { setMandateData } from '../../../features/paystack/mandateSlice.js';
import { use, useEffect, useState } from 'react';
import { createPaystackOrder } from '../../../api/orderAPI.js';
import { useCreateMandate } from '../../../hooks/useProceedToPaystackPayment.jsx';
import { useFullPayment } from '../../../hooks/useFullPayment.jsx';
import { clearCart } from '../../../features/cart/cartSlice.js';
import { useDownPayment } from '../../../hooks/useDownPayment.jsx';
import { selectDebtVerificationStatus } from '../../../features/user/verificationSlices/debtVerificationSlice.js';
import { setDownPaymentSuccess } from '../../../features/order/fullPaymentSlice.js';

export const CheckoutPaymentMethod = () => {
  const [fullPayment, setFullPayment] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const isVerified = useSelector(selectDebtVerificationStatus);

  const deliveryType = useSelector(selectedDeliveryType);
  const dispatch = useDispatch();
  const proceedToMandate = useProceedToMandate();
  const navigate = useNavigate();
  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );
  const currentDeliveryAddress = useSelector(selectCurrentAddress);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const deliveryAddress = [
    currentDeliveryAddress?.streetAddress || latest_address?.streetAddress,
    currentDeliveryAddress?.state || latest_address?.state,
  ]
    .filter(Boolean)
    .join(', ');

  const isConsolidatedCart = cart.some((item) => item.paymentPlan !== 'full');

  useEffect(() => {
    if (!deliveryType) return;

    setFullPayment(!isConsolidatedCart);

    dispatch(
      setMandateData({
        deliveryState: currentDeliveryAddress?.state || latest_address?.state,
        deliveryFullAddress:
          currentDeliveryAddress?.streetAddress ||
          latest_address?.streetAddress,
        deliveryType: deliveryType.value,
      })
    );
  }, [
    deliveryType,
    currentDeliveryAddress,
    latest_address,
    isConsolidatedCart,
    dispatch,
  ]);

  const mandateData = useSelector((state) => state.mandate.data);
  const downPayment = mandateData?.consolidated_total_amount;

  const { createMandate, isValidating } = useCreateMandate();

  const handleCreatePaystackCustomer = () => {
    if (!mandateData) return;
    createMandate(mandateData);
  };

  const handleProceedToMandate = () => {
    if (!mandateData) return;
    proceedToMandate(mandateData);
    dispatch(setDownPaymentSuccess(false));
  };

  const {
    handlePayFullPayment,
    isValidating: Processing,
    validationData,
  } = useFullPayment();

  //  const {
  //   handlePayDownPayment,
  //   isValidating: downPaymentIsProcessing,
  //   validationData: downPaymentValidationData,
  // } = useDownPayment();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { picked: '' },
    resolver: zodResolver(paymentOptionSchema),
  });

  return (
    <div>
      <form onSubmit={handleSubmit()} className="px-8 lg:px-0 ">
        <h1 className="lg:hidden text-lg font-bold mt-6 mb-3">
          Payment method
        </h1>

        <div
          role="group"
          aria-labelledby="payment-options-label"
          className="rounded-md lg:border lg:border-[#E5E5E5] mb-10"
        >
          <span id="payment-options-label" className="sr-only">
            Payment Options
          </span>

          {!isConsolidatedCart && (
            <div className="lg:px-4 py-1 lg:py-2">
              <label
                htmlFor="pay-online"
                className="text-sm flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Globe />
                  <input
                    type="button"
                    id="pay-online"
                    {...register('picked')}
                    value="Pay online"
                    className="px-4"
                    defaultChecked
                  />
                </div>
              </label>
            </div>
          )}

          {isConsolidatedCart && (
            <div className="lg:px-4 py-1 lg:py-2">
              <label
                htmlFor="paystack-direct-debit"
                className="text-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="paystack-direct-debit"
                    {...register('picked')}
                    value="paystack-direct-debit"
                    className="px-4 py-10 mr-2"
                    defaultChecked
                  />
                  Direct debit
                </div>
                <img src="/images/PaystackLogo.svg" alt="Paystack Logo" />
              </label>
            </div>
          )}
        </div>

        {errors.picked && (
          <div className="text-red-500 text-xs mt-3">
            {errors.picked.message}
          </div>
        )}
      </form>
      <section className=" grid gap-14 px-8">
        {!isVerified && (
          <>
            <Link to="" className=" font-normal text-sm underline">
              What is direct debit?
            </Link>

            <div className="flex flex-col justify-center items-center space-y-3">
              <p className="font-inter text-xs">
                Please note as a new user you will be verified before buying an
                item
              </p>
              <Link
                to="/user-dashboard/account-profile/account-verification"
                className="font-inter w-fit text-xs rounded-[2px] bg-[var(--yellow-primary)] py-3 px-6"
              >
                Verify now
              </Link>
            </div>
          </>
        )}

        <div className="hidden lg:block">
          {/* {isConsolidatedCart ? ( */}
          {isConsolidatedCart && (
            <button
              type="button"
              disabled={!isVerified || !deliveryAddress || Processing}
              onClick={handleProceedToMandate}
              className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
                !isVerified || !deliveryAddress
                  ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                  : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
              }`}
            >
              Checkout securely
            </button>
          )}

          {!isConsolidatedCart && (
            <button
              type="button"
              disabled={!isVerified || Processing || !deliveryAddress}
              onClick={handlePayFullPayment}
              className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
                !isVerified || !deliveryAddress
                  ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                  : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
              }`}
            >
              {Processing ? 'Processing...' : 'Pay now'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
