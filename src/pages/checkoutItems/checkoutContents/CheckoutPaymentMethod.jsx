import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentOptionSchema } from '../../../utils/Validation.js';
import { formatCurrency } from '../../../utils/FormatCurrency.jsx';
import { useProceedToMandate } from '../../../hooks/useProceedToMandate.jsx';
import { selectVerificationStatus } from '../../../features/user/accountVerificationSlice.js';
import { Globe } from 'lucide-react';
import {
  selectedDeliveryType,
  setSelectedDeliveryType,
} from '../../../features/order/deliveryAddressSlice.js';
import { setMandateData } from '../../../features/paystack/mandateSlice.js';
import { useEffect } from 'react';
import { createPaystackMandate } from '../../../api/orderAPI.js';
import { useCreateMandate } from '../../../hooks/useProceedToPaystackPayment.jsx';

export const CheckoutPaymentMethod = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const isVerified = useSelector((state) =>
    selectVerificationStatus(state, 'debt')
  );
  const deliveryType = useSelector(selectedDeliveryType);
  const dispatch = useDispatch();
  const proceedToMandate = useProceedToMandate();

  useEffect(() => {
    if (!deliveryType) return;
    dispatch(setMandateData({ deliveryType: deliveryType.value }));
  }, [deliveryType]);

  const mandateData = useSelector((state) => state.mandate.data);

  const { createMandate, isValidating } = useCreateMandate();

  const handleCreatePaystackCustomer = () => {
    if (!mandateData) return;
    createMandate(mandateData);
  };

  const handleProceedToMandate = () => {
    if (!mandateData) return;
    proceedToMandate(mandateData);
  };

  const handlePayOnline = () => {
    // Implement the payment logic here
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { picked: '' },
    resolver: zodResolver(paymentOptionSchema),
  });

  const InstallmentPayment = cartItems.some((item) => {
    return ['monthly', 'weekly', 'daily'].includes(
      item.paymentPlan || item.selectedPaymentPlan
    );
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

          {!InstallmentPayment ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
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
          {InstallmentPayment ? (
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
              onClick={handlePayOnline}
              className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
                !isVerified
                  ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                  : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
              }`}
            >
              Pay now
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
