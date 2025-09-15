import { X } from 'lucide-react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { verifyDebtProfile } from '../../../../../api/user-api';
import { toast } from 'react-toastify';
import {
  setDebt,
  setError,
  selectVerificationStatus,
  selectVerificationData,
  selectLoading,
  selectError,
} from '../../../../../features/user/accountVerificationSlice';
import React from 'react';

export const DebtVerificationModal = ({
  icon,
  title,
  description,
  closeModal,
  modalIsOpen,
  setFailed,
  setVerified,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const isVerified = useSelector((state) =>
    selectVerificationStatus(state, 'debt')
  );
  const data = useSelector((state) => selectVerificationData(state, 'debt'));
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Pre-fill BVN if available
  React.useEffect(() => {
    if (data) {
      setValue('bvn', data.bvn || '');
    }
  }, [data, setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: verifyDebtProfile,
    onSuccess: (response) => {
      dispatch(setDebt(response?.data));

      const isApproved = response?.data?.length > 0; // adjust based on your API response shape
      setVerified(isApproved);
      setFailed(!isApproved);
      closeModal();

      toast[isApproved ? 'success' : 'error'](
        isApproved ? `${title} verified successfully` : 'Verification failed'
      );
    },
    onError: (err) => {
      setFailed(true);
      setVerified(false);
      const errorMessage = err?.message || 'Verification failed';
      dispatch(setError(errorMessage));
      toast.error(errorMessage);
    },
  });

  const onSubmit = (formData) => {
    mutate({ bvn: formData.bvn });
  };

  if (isVerified) return null;

  return (
    <div className="flex justify-center w-full font-inter">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        overlayClassName="bg-black/50 fixed inset-0 flex justify-center items-center z-50"
        className="relative w-[376px] lg:w-[479px] rounded-[10px] bg-white outline-none border mx-2 lg:mx-0 py-8"
      >
        <button
          className="absolute top-4 right-4 bg-black text-white rounded-full p-1"
          onClick={closeModal}
        >
          <X size={18} />
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <div className="flex items-center justify-start mb-4 px-6 md:px-8">
            <h2 className="text-lg font-semibold mr-2">{title}</h2>
            <img src={icon} alt="" className="w-4 h-4" />
          </div>

          <div className="h-[6px] bg-[#F6F6F6]"></div>

          <p className="text-sm text-gray-600 mb-6 px-6 md:px-8">
            {description}
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4 px-6 md:px-8">
              Error: {error}
            </p>
          )}

          <div className="px-6 md:px-8">
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1 font-inter">
                BVN
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={11}
                {...register('bvn', {
                  required: 'BVN is required',
                  pattern: {
                    value: /^\d{11}$/,
                    message: 'BVN must be exactly 11 digits',
                  },
                })}
                className="border w-full p-2 rounded-md"
                disabled={isPending || loading}
              />
              {errors.bvn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bvn.message}
                </p>
              )}
            </div>
          </div>

          <hr className="my-6 border-[#EBEAF2]" />

          <div className="flex justify-between items-center w-full px-6 md:px-8">
            <button
              type="button"
              onClick={closeModal}
              className="text-sm underline text-gray-700 font-inter"
              disabled={isPending || loading}
            >
              Cancel
            </button>
            <button
              className="bg-[var(--yellow-primary)] rounded-[5px] px-4 py-2 font-inter font-medium"
              type="submit"
              disabled={isPending || loading}
            >
              {isPending || loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
                  Verifying...
                </span>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
