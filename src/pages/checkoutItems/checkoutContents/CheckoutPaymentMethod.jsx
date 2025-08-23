import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMonoCustomer } from '../../../api/orderAPI.js';
import { paymentOptionSchema } from '../../../utils/Validation.js';
import { formatCurrency } from '../../../utils/FormatCurrency.jsx';
import { useProceedToMandate } from '../../../hooks/useProceedToMandate.jsx';
import { selectVerificationStatus } from '../../../features/user/accountVerificationSlice.js';

export const CheckoutPaymentMethod = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const isVerified = useSelector((state) =>
    selectVerificationStatus(state, 'debt')
  );

  const proceedToMandate = useProceedToMandate();

  const { mutate: createMonoUser, isPending } = useMutation({
    mutationFn: createMonoCustomer,
    onSuccess: () => {
      toast.success('Mono customer created successfully');
      proceedToMandate();
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Error creating Mono customer'
      );
    },
  });

  const handleCreateMonoCustomer = () => {
    createMonoUser();
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

  const InstallmentPayment = cartItems.find((item) =>
    ['monthly', 'weekly', 'daily', 'full'].includes(item.paymentPlan)
  );

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
                <label htmlFor="debit-card" className="text-sm">
                  <input
                    type="radio"
                    id="debit-card"
                    {...register('picked')}
                    value="debit card"
                    className="px-4 py-10 mr-2"
                  />
                  Debit card
                </label>
              </div>
              <hr className="hidden lg:block" />
              <div className="lg:px-4 py-1 lg:py-2">
                <label htmlFor="interest-free-credit" className="text-sm">
                  <input
                    type="radio"
                    id="interest-free-credit"
                    {...register('picked')}
                    value="interest-free-credit"
                    className="px-4 py-10 mr-2"
                  />
                  Smallsmall Interest Free Credit{' '}
                  <span className="text-[#96959F] text-xs">
                    (Balance: {formatCurrency(0)})
                  </span>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="lg:px-4 py-1 lg:py-2">
                <label
                  htmlFor="direct-debit"
                  className="text-sm flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="direct-debit"
                      {...register('picked')}
                      value="direct debit"
                      className="px-4 py-10 mr-2"
                      defaultChecked
                    />
                    Direct debit
                    <span className="text-xs rounded-[2px] bg-[var(--yellow-primary)] py-1 px-2">
                      Recommended
                    </span>
                  </div>
                  <img src="/images/MonoLogo.svg" alt="Mono Logo" />
                </label>
              </div>
              <hr />
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
                    {/* <span className="text-xs rounded-[2px] bg-[var(--yellow-primary)] py-1 px-2">
                      Recommended
                    </span> */}
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

        <div className="hidden lg:block ">
          <button
            type="button"
            disabled={!isVerified || isSubmitting || isPending}
            onClick={handleCreateMonoCustomer}
            className={`w-full py-2 rounded-[5px] text-black font-medium mt-4 ${
              !isVerified
                ? 'bg-[#DEDEDE] cursor-not-allowed text-white'
                : 'bg-[var(--yellow-primary)] hover:bg-yellow-500'
            }`}
          >
            {isPending ? 'Setting up...' : 'Set up direct debit'}
          </button>
        </div>
      </section>
    </div>
  );
};
