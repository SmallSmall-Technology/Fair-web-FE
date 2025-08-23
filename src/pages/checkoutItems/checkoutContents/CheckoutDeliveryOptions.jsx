import { useForm } from 'react-hook-form';
import { formatCurrency } from '../../../utils/FormatCurrency';

export const CheckoutDeliveryOptions = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { picked: '' },
  });

  const standard_delivery_amount = 'FREE';
  const express_delivery_amount = 3000;
  const same_day_delivery_amount = 5000;
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
                STANDARD DELIVERY ( 3-5 DAYS )
              </div>
              <p className="font-inter font-semibold text-sm">
                {standard_delivery_amount}
              </p>
            </label>
          </div>
          <hr className="hidden lg:block" />

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
                EXPRESS DELIVERY
              </div>
              <p className="font-inter font-semibold text-sm">
                {formatCurrency(express_delivery_amount)}
              </p>
            </label>
          </div>
          <hr className="hidden lg:block" />
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
                SAME DAY DELIVERY
              </div>
              <p className="font-inter font-semibold text-sm">
                {formatCurrency(same_day_delivery_amount)}
              </p>
            </label>
          </div>
        </div>

        {errors.picked && (
          <div className="text-red-500 text-xs mt-3">
            {errors.picked.message}
          </div>
        )}
      </form>
    </div>
  );
};
