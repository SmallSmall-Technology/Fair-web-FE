import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserDeliveryAddress } from '../../../../../api/user-api';
import { selectCurrentAddress } from '../../../../../features/order/deliveryAddressSlice';
import { useSelector } from 'react-redux';

export const states = ['Lagos state', 'Abuja state'];

export const UpdateDeliveryAddressModal = ({ address, onClose }) => {
  const queryClient = useQueryClient();
  const currentDeliveryAddress = useSelector(selectCurrentAddress);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      streetAddress: address?.streetAddress || '',
      state: address?.state || '',
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateUserDeliveryAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useraddresses'] });
      toast.success(
        <span className="font-semibold text-base font-outfit">
          Delivery address updated successfully
        </span>,
        {
          icon: false,
          type: 'success',
          className: 'toast-yellow',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
          autoClose: 2000,
        }
      );
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update address',
        {
          icon: false,
          type: 'error',
          className: 'toast-yellow',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
          autoClose: 2000,
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

    if (address?.id) {
      await mutation.mutateAsync({
        id: address.id,
        data: payload,
      });
    }
    onClose();
  };

  useEffect(() => {
    const currentValues = {
      streetAddress: address?.streetAddress || '',
      state: address?.state || '',
    };
    reset(currentValues, {
      keepDirty: false,
      keepTouched: false,
    });
  }, [address?.streetAddress, address?.state, reset]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-[366px] py-6 rounded-md shadow relative">
        <div className="px-6">
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
            className="absolute right-4 top-4 text-xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>

          <h2 id="address-modal-title" className="font-medium text-sm mb-2">
            Current delivery address
          </h2>
          <p className="text-sm flex">
            <span>
              {currentDeliveryAddress?.streetAddress ||
                latest_address?.streetAddress}
            </span>
            ,
            <span>
              {currentDeliveryAddress?.state || latest_address?.state}
            </span>
          </p>
        </div>

        <div className="bg-[#F6F6F6] w-full h-[6px] my-4" />

        <div className="px-6">
          <h2 className="font-medium text-sm mb-2">Add new delivery address</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSubmit(onSubmit)(e);
            }}
            onClick={(e) => e.stopPropagation()}
            className="space-y-3"
            noValidate
            method="POST"
          >
            <div>
              <label htmlFor="state" className="text-sm font-normal mb-1 block">
                State <span className="text-red-500">*</span>
              </label>
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
                <p className="text-xs text-red-500 mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="streetAddress"
                className="text-sm font-normal mb-1 block"
              >
                Street Address <span className="text-red-500">*</span>
              </label>
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
              <button
                type="button"
                onClick={() => {
                  onClose();
                }}
                className="text-sm underline"
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <div className="w-[110px]">
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="w-full bg-[var(--yellow-primary)] text-sm font-medium py-2 px-6 rounded-[5px] hover:bg-[#ffdf11e3] transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
