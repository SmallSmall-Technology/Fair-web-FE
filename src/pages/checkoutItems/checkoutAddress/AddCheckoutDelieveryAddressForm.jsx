import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { states } from '../../userDashboard/accountProfile/contents/profileSummary/AddressModal';
import { uploadUserDeliveryAddress } from '../../../api/user-api';
import { CustomButton } from '../../../utils/Button';

const AddCheckoutDelieveryAddressForm = ({ onClose }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm({ mode: 'onChange' });

  const { mutation, isPending } = useMutation({
    mutationFn: (data) => uploadUserDeliveryAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['useraddresses']);
      toast.success('Address added successfully', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
      });
      reset();
      onClose(false);
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Failed to add address',
        { autoClose: 3000 }
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      streetAddress: data?.streetAddress.trim(),
      state: data?.state,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <select
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
        <textarea
          placeholder="Street address"
          className={`border rounded-[5px] w-full p-2 text-sm ${
            errors.streetAddress ? 'border-red-500' : ''
          }`}
          rows={3}
          {...register('streetAddress', {
            required: 'Street address is required',
          })}
          disabled={isPending}
        />
        {errors.streetAddress && (
          <p className="text-xs text-red-500 mt-1">
            {errors.streetAddress.message}
          </p>
        )}
      </div>

      <div className="flex justify-between gap-4 mt-4">
        <div>
          <CustomButton
            text={isPending ? 'Saving...' : 'Save delivery address'}
            type="submit"
            disabled={isPending || !isValid}
            className="w-full bg-[var(--yellow-primary)] text-sm font-medium py-2 px-6 rounded-[5px] hover:bg-[#ffdf11e3] transition disabled:opacity-50"
          ></CustomButton>
        </div>
      </div>
    </form>
  );
};

export default AddCheckoutDelieveryAddressForm;
