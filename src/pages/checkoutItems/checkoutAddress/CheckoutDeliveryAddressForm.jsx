import { memo, useRef } from 'react';
import { states } from '../../../utils/data';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '../../../utils/Validation';
import { CheckoutDeliveryAddressButton } from '../../../utils/Button';

const CheckoutDeliveryAddressForm = ({
  deliveryAddress,
  handleEditedDeliveryAddress,
  handleSubmitDeliveryAddress,
  isSubmitted,
}) => {
  const inputRef = useRef(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { state: '', address: '' },
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = (values, e) => {
    const action = {
      resetForm: () => e.target.reset(),
    };
    if (deliveryAddress.length > 0) {
      handleEditedDeliveryAddress(values, action);
    } else {
      handleSubmitDeliveryAddress(values, action);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <h1 className="font-medium text-[21px] mb-3 hidden lg:block">
        Delivery Form
      </h1>
      <h1 className="font-medium text-[21px] mb-3 lg:hidden">Shipping Form</h1>

      <div>
        <label htmlFor="state" className="sr-only">
          Select state
        </label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              id="state"
              ref={(e) => {
                inputRef.current = e;
                field.ref(e);
              }}
              className="border border-[#DEDEDE] rounded-[5px] px-3 py-2 font-medium w-full"
            >
              <option value="" disabled>
                {window.innerWidth >= 1024 ? 'State' : 'Choose State'}
              </option>
              {states.map((state, index) => (
                <option value={state.name} key={index}>
                  {state.name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.state && (
          <div className="text-red-600 mb-2 text-xs">
            {errors.state.message}
          </div>
        )}
      </div>

      <div className="my-4">
        <label htmlFor="address" className="sr-only">
          Enter address
        </label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              id="address"
              placeholder={
                window.innerWidth >= 1024
                  ? 'Street address'
                  : 'Enter delivery address'
              }
              className="border border-[#DEDEDE] rounded-[5px] px-3 py-2 font-medium w-full"
            />
          )}
        />
        {errors.address && (
          <div className="text-red-600 mb-2 text-xs">
            {errors.address.message}
          </div>
        )}
      </div>

      <CheckoutDeliveryAddressButton
        type="submit"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg w-[30%]"
      >
        {isSubmitted ? 'Edit delivery address' : 'Save delivery address'}
      </CheckoutDeliveryAddressButton>
    </form>
  );
};

export default memo(CheckoutDeliveryAddressForm);
