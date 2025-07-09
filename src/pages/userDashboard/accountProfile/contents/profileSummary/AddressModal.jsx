import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../../../../api/userAPI';
import {
  updateLatestDeliveryAddress,
  setUser,
} from '../../../../../features/user/userSlice';

export const states = [
  'Lagos state',
  'Abuja state',
  'Oyo state',
  'Kaduna state',
  'Rivers state',
];

export const AddressModal = ({ currentAddress = {}, onClose, refetch }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.user);
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      streetAddress: currentAddress?.streetAddress || '',
      state: currentAddress?.state || '',
    },
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      refetch();
      const updatedAddress =
        response.data?.user?.latest_address || response.data?.latest_address;
      if (updatedAddress) {
        dispatch(updateLatestDeliveryAddress(updatedAddress));
      }
      if (response.data?.user) {
        dispatch(setUser(response.data.user));
      }
      toast.success('Address updated successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
      onClose();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update address',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    },
  });

  useEffect(() => {
    const currentValues = {
      streetAddress: currentAddress?.streetAddress || '',
      state: currentAddress?.state || '',
    };
    reset(currentValues, {
      keepDirty: false,
      keepTouched: false,
    });
  }, [currentAddress?.streetAddress, currentAddress?.state, reset]);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const payload = {
        latest_address: {
          streetAddress: data.streetAddress.trim(),
          state: data.state,
        },
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };

      if (currentAddress?.id) {
        payload.latest_address.id = currentAddress.id;
      }

      await mutation.mutateAsync(payload);
      dispatch(updateLatestDeliveryAddress(payload.latest_address));
      toast.success('Address updated successfully', {
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update address',
        {
          autoClose: 3000,
        }
      );
    }
  };

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
          <p className="text-sm">
            {user?.latest_address?.streetAddress || 'No deliver address'}
            {user?.latest_address?.state && `, ${user?.latest_address?.state}`}
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
                  className="w-full bg-[#FFDE11] text-sm font-medium py-2 px-6 rounded-[5px] hover:bg-[#ffdf11e3] transition disabled:opacity-50"
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
