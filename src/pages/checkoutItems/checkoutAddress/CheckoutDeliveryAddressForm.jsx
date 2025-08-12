import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { updateUserDeliveryAddress } from '../../../api/user-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { states } from '../../userDashboard/accountProfile/contents/profileSummary/AddressModal';
import { useEffect } from 'react';

const CheckoutDeliveryAddressForm = ({ currentDeliveryAddress, onClose }) => {
  const deliveryAddress = currentDeliveryAddress;
  const queryClient = useQueryClient();
  console.log(deliveryAddress);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      streetAddress: currentDeliveryAddress?.streetAddress || '',
      state: currentDeliveryAddress?.state || '',
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateUserDeliveryAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useraddresses'] });
      toast.success('Address updated successfully', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update address',
        {
          autoClose: 3000,
        }
      );
    },
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    event.stopPropagation();
    const payload = {
      streetAddress: data.streetAddress.trim(),
      state: data.state,
    };

    if (deliveryAddress?.id) {
      await mutation.mutateAsync({
        id: deliveryAddress.id,
        data: payload,
      });
    }
    onClose(false);
  };

  useEffect(() => {
    const currentValues = {
      streetAddress: deliveryAddress?.streetAddress || '',
      state: deliveryAddress?.state || '',
    };
    reset(currentValues, {
      keepDirty: false,
      keepTouched: false,
    });
  }, [deliveryAddress?.streetAddress, deliveryAddress?.state, reset]);

  return (
    <form action="submit" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="state"></label>
        <select
          id="state"
          {...register('state', { required: 'State is required' })}
          className={`border rounded-[5px] w-full p-2 text-sm ${
            errors.state ? 'border-red-500' : ''
          }`}
          disabled={isSubmitting}
        >
          <option value="">Choose state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && (
          <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="streetAddress"></label>
        <textarea
          id="streetAddress"
          placeholder="Street address"
          className={`border rounded-[5px] w-full p-2 text-sm ${
            errors.streetAddress ? 'border-red-500' : ''
          }`}
          rows={3}
          {...register('streetAddress', {
            required: 'Street address is required',
          })}
          disabled={isSubmitting}
        />
        {errors.streetAddress && (
          <p className="text-xs text-red-500 mt-1">
            {errors.streetAddress.message}
          </p>
        )}
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <div className="w-[187px]">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-[var(--yellow-primary)] text-sm font-medium py-2 px-6 rounded-[5px] hover:bg-[#ffdf11e3] transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
              'Save delivery address'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutDeliveryAddressForm;
