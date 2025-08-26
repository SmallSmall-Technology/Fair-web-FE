import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { setMandateData } from '../../../features/mono/mandateSlice';
import { setSelectedDeliveryOption } from '../../../features/order/deliveryAddressSlice';

export const CheckoutDeliveryOptions = () => {
  const standard_delivery_amount = 0;
  const express_delivery_amount = 3000;
  const same_day_delivery_amount = 5000;

  const [deliveryOptions] = useState([
    {
      label: 'STANDARD DELIVERY ( 3-5 DAYS )',
      amount: standard_delivery_amount,
      value: 'standard',
    },
    {
      label: 'EXPRESS DELIVERY',
      amount: express_delivery_amount,
      value: 'express',
    },
    {
      label: 'SAME DAY DELIVERY',
      amount: same_day_delivery_amount,
      value: 'sameDay',
    },
  ]);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { picked: 'standard' },
  });

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = deliveryOptions.find(
      (option) => option.value === selectedValue
    );
    if (selectedOption) {
      dispatch(setSelectedDeliveryOption(selectedOption));
      dispatch(setMandateData({ deliveryOption: selectedOption.value }));
    }
  };

  return (
    <div>
      <form className="px-8 lg:px-0">
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

          {deliveryOptions?.map((deliveryOption, index) => (
            <div key={deliveryOption?.value} className="">
              <label
                htmlFor={deliveryOption?.value}
                className=" px-4 py-2 text-sm flex items-center justify-between w-full cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={deliveryOption?.value}
                    {...register('picked', {
                      required: 'Please select a delivery option',
                    })}
                    value={deliveryOption?.value}
                    className="mr-2"
                    onChange={handleChange}
                  />
                  {deliveryOption?.label}
                </div>
                <p className="font-inter font-semibold text-sm">
                  {deliveryOption?.amount === 0
                    ? 'FREE'
                    : formatCurrency(deliveryOption?.amount)}
                </p>
              </label>
              {index !== deliveryOptions?.length - 1 && <hr />}
            </div>
          ))}
        </div>

        {errors.picked && (
          <div className="text-red-500 text-xs mt-3">
            {errors?.picked?.message}
          </div>
        )}
      </form>
    </div>
  );
};
