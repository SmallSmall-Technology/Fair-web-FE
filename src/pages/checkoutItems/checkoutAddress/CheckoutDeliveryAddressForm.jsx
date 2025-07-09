import React from 'react';
import { useForm } from 'react-hook-form';
import { states } from '../../userDashboard/accountProfile/contents/profileSummary/AddressModal';
import {
  setUser,
  updateLatestDeliveryAddress,
} from '../../../features/user/userSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../api/userAPI';

const CheckoutDeliveryAddressForm = ({
  // eslint-disable-next-line react/prop-types
  handleOpenCheckoutDeliveryAddressForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: { state: '', streetAddress: '' },
  });
  const { user } = useSelector((state) => state.user);
  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // refetch();
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
      // onClose();
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
      await mutation.mutateAsync(payload);
      dispatch(updateLatestDeliveryAddress(payload.latest_address));
      toast.success('Address updated successfully', {
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
      });
      handleOpenCheckoutDeliveryAddressForm();
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
            className="w-full bg-[#FFDE11] text-sm font-medium py-2 px-6 rounded-[5px] hover:bg-[#ffdf11e3] transition disabled:opacity-50"
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
