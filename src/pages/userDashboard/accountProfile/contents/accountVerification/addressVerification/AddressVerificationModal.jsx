import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { lagosLGAsAndLCDAs } from './data';

export const AddressVerificationModal = ({
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
    watch,
    formState: { errors },
  } = useForm();

  const selectedState = watch('residentialState');

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
        {/* Street Name */}
        <div className="mb-3 font-inter">
          <label className="block text-sm font-medium mb-1">Street Name</label>
          <input
            type="text"
            {...register('residentialAddress', {
              required: 'Street name is required',
            })}
            className="border w-full p-2 rounded-md"
            disabled={isPending}
          />
          {errors.residentialAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.residentialAddress.message}
            </p>
          )}
        </div>

        {/* State Dropdown */}
        <div className="mb-3 font-inter">
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            {...register('residentialState', {
              required: 'State is required',
            })}
            className="border w-full p-2 rounded-md bg-white"
            disabled={isPending}
          >
            <option value="">Select State</option>
            <option value="Lagos">Lagos</option>
            {/* Add other states later */}
          </select>
          {errors.residentialState && (
            <p className="text-red-500 text-sm mt-1">
              {errors.residentialState.message}
            </p>
          )}
        </div>

        {/* Local Government / LCDA Dropdown */}
        {selectedState === 'Lagos' && (
          <div className="mb-3 font-inter">
            <label className="block text-sm font-medium mb-1">
              Local Government / LCDA
            </label>
            <select
              {...register('residentialCity', {
                required: 'Local Government / LCDA is required',
              })}
              className="border w-full p-2 rounded-md bg-white"
              disabled={isPending}
            >
              <option value="">Select Local Government / LCDA</option>
              {lagosLGAsAndLCDAs.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            {errors.residentialCity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.residentialCity.message}
              </p>
            )}
          </div>
        )}

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
