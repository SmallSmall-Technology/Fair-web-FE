import { X } from 'lucide-react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import {
  verifyAccountByID,
  verifyAccountByAddress,
  verifyDebtProfile,
} from '../../../../../api/user-api';
import { toast } from 'react-toastify';
import {
  setId,
  setAddress,
  setDebt,
  setError,
  selectVerificationStatus,
  selectVerificationData,
  selectLoading,
  selectError,
} from '../../../../../features/user/accountVerificationSlice';
import React from 'react';

export const AccountVerificationModal = ({
  icon,
  type,
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
    selectVerificationStatus(state, type)
  );
  const data = useSelector((state) => selectVerificationData(state, type));
  // console.log(data);
  // console.log(data?.credit_data?.eligibility_validation?.overall_status);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // Map modal type to API function and Redux action
  const mutationFnMap = {
    id: verifyAccountByID,
    address: verifyAccountByAddress,
    debt: verifyDebtProfile,
  };

  const reduxDispatchMap = {
    id: {
      action: setId,
      getPayload: (data) => data?.idDetails || data,
    },
    address: {
      action: setAddress,
      getPayload: (data) => data?.data,
    },
    debt: {
      action: setDebt,
      getPayload: (data) => data?.data,
    },
  };

  // Pre-fill form fields with Redux data
  React.useEffect(() => {
    if (type === 'id' && data) {
      setValue('idType', data.idType || '');
      setValue('idNumber', data.idNumber || '');
    } else if (type === 'address' && data) {
      if (typeof data === 'string') {
        const [street, city, state] = data.split(', ');
        setValue('residentialAddress', street || '');
        setValue('residentialCity', city || '');
        setValue('residentialState', state || '');
      } else {
        setValue('residentialAddress', data.street || '');
        setValue('residentialCity', data.city || '');
        setValue('residentialState', data.state || '');
      }
    } else if (type === 'debt' && data) {
      setValue('bvn', data.bvn || '');
    }
  }, [type, data, setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => mutationFnMap[type](formData),
    onSuccess: (data) => {
      // console.log(data);
      // console.log(data?.credit_data?.validation?.overall_status);
      const { action, getPayload } = reduxDispatchMap[type];
      dispatch(action(getPayload(data)));

      // Determine verification status
      const isApproved =
        (type === 'debt' &&
          data?.data?.credit_data?.eligibility_validation?.overall_status ===
            'APPROVED') ||
        (type === 'address' && data?.success) ||
        (type === 'id' && data?.success);

      setVerified(isApproved);
      setFailed(!isApproved);
      closeModal();

      if (!isApproved) {
        toast.error('Verification failed');
      } else {
        toast.success(`${title} verified successfully`);
      }
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
    const payloadMap = {
      id: {
        idType: formData.idType,
        idNumber: formData.idNumber,
      },
      address: {
        residentialAddress: formData.residentialAddress,
        residentialCity: formData.residentialCity,
        residentialState: formData.residentialState,
      },
      debt: {
        bvn: formData.bvn,
      },
    };

    const payload = payloadMap[type];
    mutate(payload);
  };

  // Don't render modal if already verified
  if (isVerified) {
    return null;
  }

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
            {type === 'id' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 font-inter">
                    ID Type
                  </label>
                  <select
                    {...register('idType', {
                      required: 'Please select ID type',
                    })}
                    className="border w-full p-2 rounded-md"
                    disabled={isPending || loading}
                  >
                    <option value="">Select ID Type</option>
                    <option value="bvn">BVN</option>
                    <option value="nin">NIN</option>
                    <option value="drivers_license">Driver’s License</option>
                    <option value="passport">International Passport</option>
                  </select>
                  {errors.idType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.idType.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 font-inter">
                    ID Number
                  </label>
                  <input
                    type="text"
                    {...register('idNumber', {
                      required: 'ID number is required',
                      validate: (value, formValues) => {
                        const idType = formValues.idType;
                        if (!idType) return 'Please select an ID type first';
                        if (idType === 'bvn' && !/^\d{11}$/.test(value))
                          return 'BVN must be exactly 11 digits';
                        if (idType === 'nin' && !/^\d{11}$/.test(value))
                          return 'NIN must be exactly 11 digits';
                        if (
                          idType === 'drivers_license' &&
                          !/^[A-Z0-9]{8,15}$/i.test(value)
                        )
                          return 'Driver’s License must be 8–15 alphanumeric characters';
                        if (
                          idType === 'passport' &&
                          !/^[A-Z0-9]{6,9}$/i.test(value)
                        )
                          return 'Passport must be 6–9 alphanumeric characters';
                        return true;
                      },
                    })}
                    className="border w-full p-2 rounded-md"
                    disabled={isPending || loading}
                  />
                  {errors.idNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.idNumber.message}
                    </p>
                  )}
                </div>
              </>
            )}
            {type === 'address' && (
              <>
                <div className="mb-3 font-inter">
                  <label className="block text-sm font-medium mb-1">
                    Street Name
                  </label>
                  <input
                    type="text"
                    {...register('residentialAddress', {
                      required: 'Street name is required',
                    })}
                    className="border w-full p-2 rounded-md"
                    disabled={isPending || loading}
                  />
                  {errors.residentialAddress && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.residentialAddress.message}
                    </p>
                  )}
                </div>
                <div className="mb-3 font-inter">
                  <label className="block text-sm font-medium mb-1">
                    Local Government
                  </label>
                  <input
                    type="text"
                    {...register('residentialCity', {
                      required: 'Local Government is required',
                    })}
                    className="border w-full p-2 rounded-md"
                    disabled={isPending || loading}
                  />
                  {errors.residentialCity && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.residentialCity.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 font-inter">
                    State
                  </label>
                  <input
                    type="text"
                    {...register('residentialState', {
                      required: 'State is required',
                    })}
                    className="border w-full p-2 rounded-md"
                    disabled={isPending || loading}
                  />
                  {errors.residentialState && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.residentialState.message}
                    </p>
                  )}
                </div>
              </>
            )}
            {type === 'debt' && (
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
            )}
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
