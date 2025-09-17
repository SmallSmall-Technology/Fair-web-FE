import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const IdVerificationModal = ({
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full px-6 md:px-8"
      >
        {/* ID Type Dropdown */}
        <div className="mb-3 font-inter">
          <label className="block text-sm font-medium mb-1">ID Type</label>
          <select
            {...register('idType', {
              required: 'Please select an ID type',
            })}
            className="border w-full p-2 rounded-md bg-white"
            disabled={isPending}
          >
            <option value="">Select ID Type</option>
            <option value="nin">National Identity Number (NIN)</option>
            <option value="drivers_license">Driver’s License</option>
            <option value="international_passport">
              International Passport
            </option>
            <option value="voter_card">Voter’s Card</option>
          </select>
          {errors.idType && (
            <p className="text-red-500 text-sm mt-1">{errors.idType.message}</p>
          )}
        </div>

        {/* ID Number Input */}
        <div className="mb-3 font-inter">
          <label className="block text-sm font-medium mb-1">ID Number</label>
          <input
            type="text"
            {...register('idNumber', {
              required: 'ID number is required',
              minLength: { value: 5, message: 'ID number is too short' },
            })}
            className="border w-full p-2 rounded-md"
            disabled={isPending}
          />
          {errors.idNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.idNumber.message}
            </p>
          )}
        </div>

        <hr className="my-6 border-[#EBEAF2]" />

        {/* Actions */}
        <div className="flex justify-between items-center w-full">
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
