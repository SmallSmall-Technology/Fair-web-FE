import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import React from 'react';

export const DebtVerificationModal = ({
  icon,
  title,
  description,
  closeModal,
  onSubmit,
  isPending,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex flex-col w-full font-inter">
      {/* Header */}
      <div className="flex items-center justify-start mb-4 px-6 md:px-8">
        <h2 className="text-lg font-semibold mr-2">{title}</h2>
        {icon && <img src={icon} alt="" className="w-4 h-4" />}
      </div>

      <div className="h-[6px] bg-[#F6F6F6]" />

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-600 mb-6 px-6 md:px-8">{description}</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mb-4 px-6 md:px-8">Error: {error}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        {/* BVN Input */}
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
              disabled={isPending}
            />
            {errors.bvn && (
              <p className="text-red-500 text-sm mt-1">{errors.bvn.message}</p>
            )}
          </div>
        </div>

        <hr className="my-6 border-[#EBEAF2]" />

        {/* Actions */}
        <div className="flex justify-between items-center w-full px-6 md:px-8">
          <button
            type="button"
            onClick={closeModal}
            className="text-sm underline text-gray-700 font-inter"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            className="bg-[var(--yellow-primary)] rounded-[5px] px-4 py-2 font-inter font-medium"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
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
    </div>
  );
};
