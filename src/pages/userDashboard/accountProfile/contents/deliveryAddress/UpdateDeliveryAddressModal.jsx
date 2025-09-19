import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserDeliveryAddress } from '../../../../../api/user-api';
import {
  selectCurrentAddress,
  setSelectedDeliveryAddress,
} from '../../../../../features/order/deliveryAddressSlice';
import { useDispatch, useSelector } from 'react-redux';

export const states = ['Lagos state'];

export const UpdateDeliveryAddressModal = ({
  address,
  onClose,
  setNewDeliveryAddress,
  deliveryAddress,
  addresses,
}) => {
  const queryClient = useQueryClient();
  const currentAddressObject = useSelector(selectCurrentAddress);
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

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateUserDeliveryAddress(id, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['useraddresses'] });
      toast.success(
        <span className="font-semibold text-base font-outfit">
          Delivery address updated successfully
        </span>,
        // setNewDeliveryAddress(
        //   res?.data?.addressData?.streetAddress +
        //     ', ' +
        //     res?.data?.addressData?.state
        // ),
        dispatch(setSelectedDeliveryAddress(res?.data)),
        { icon: false, className: 'toast-yellow', autoClose: 2000 }
      );
      onClose();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to update address',
        { icon: false, className: 'toast-yellow', autoClose: 2000 }
      );
    },
  });

  const currentAddress =
    currentAddressObject?.streetAddress + ', ' + currentAddressObject?.state;

  const onSubmit = async (data) => {
    const payload = {
      streetAddress: data.streetAddress.trim(),
      state: data.state,
    };

    if (address?.id || currentAddressObject?.id || currentAddressObject?.Id) {
      await mutation.mutateAsync({
        id: address.id || currentAddressObject?.id || currentAddressObject?.Id,
        data: payload,
      });
    }
  };

  useEffect(() => {
    reset(
      {
        streetAddress:
          currentAddressObject?.addressData?.streetAddress ||
          address?.streetAddress ||
          addresses[0]?.streetAddress ||
          '',
        state:
          currentAddressObject?.addressData?.state ||
          address?.state ||
          addresses[0]?.state ||
          '',
      },
      { keepDirty: false, keepTouched: false }
    );
  }, [currentAddressObject, reset]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-[366px] py-6 rounded-md shadow relative">
        {/* Modal Content */}
        <div className="px-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>

          <h2 id="address-modal-title" className="font-medium text-sm mb-2">
            Current delivery address
          </h2>
          <p className="text-sm flex">
            {deliveryAddress ||
              address?.streetAddress + ', ' + address?.state ||
              addresses[0]?.streetAddress + ', ' + addresses[0]?.state ||
              latest_address?.streetAddress + ', ' + latest_address?.state}
          </p>
        </div>

        <div className="bg-[#F6F6F6] w-full h-[6px] my-4" />

        <div className="px-6">
          <h2 className="font-medium text-sm mb-2">Edit delivery address</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
            noValidate
            method="POST"
          >
            {/* State Selector */}
            <div>
              <label htmlFor="state" className="text-sm font-normal mb-1 block">
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="state"
                {...register('state', { required: 'State is required' })}
                className={`border rounded-[5px] w-full p-2 text-sm ${errors.state ? 'border-red-500' : ''}`}
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

            {/* Street Address */}
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
                className={`border rounded-[5px] w-full p-2 text-sm ${errors.streetAddress ? 'border-red-500' : ''}`}
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

            {/* Actions */}
            <div className="flex justify-between gap-4 mt-4">
              <button
                type="button"
                onClick={onClose}
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
