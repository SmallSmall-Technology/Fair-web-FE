import { X } from 'lucide-react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQuery } from '@tanstack/react-query';
import {
  verifyAccountByAddress,
  verifyAccountByID,
  verifyDebtProfile,
} from '../../../../../api/user-api';

export const AccountVerificationModal = ({
  icon,
  type,
  description,
  closeModal,
  modalIsOpen,
  setFailed,
  setVerified,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutationFnMap = {
    id: verifyAccountByID,
    address: verifyAccountByAddress,
    debt: verifyDebtProfile,
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (formData) => {
      return mutationFnMap[type](formData);
    },
  });

  const onSubmit = (data) => {
    let payload = data;

    if (type === 'id') {
      payload = {
        idType: data.idType,
        idNumber: data.idNumber,
      };
    }

    if (type === 'address') {
      payload = {
        streetAddress: data.streetAddress,
        // lga: data.lga,
        state: data.state,
      };
    }

    if (type === 'debt') {
      payload = { bvn: data.bvn };
    }

    mutate(payload, {
      onSuccess: () => {
        setVerified(true);
        setFailed(false);
        closeModal();
      },
      onError: () => {
        setFailed(true);
        setVerified(false);
      },
    });
  };

  return (
    <div className="flex justify-center w-full font-inter">
      <Modal
        appElement={document.getElementById('app')}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        overlayClassName="bg-black/50 fixed inset-0 flex justify-center items-center z-50"
        className="relative w-[376px] lg:w-[479px] rounded-[10px] bg-white outline-none border mx-2 lg:mx-0  py-8"
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
            {type === 'debt' && (
              <h2 className="text-lg font-semibold mr-2">Debt Profile</h2>
            )}
            {type === 'id' && (
              <h2 className="text-lg font-semibold mr-2">ID Verification</h2>
            )}
            {type === 'address' && (
              <h2 className="text-lg font-semibold mr-2">
                Address Verification
              </h2>
            )}
            <img src={icon} alt="" className="w-4 h-4" />
          </div>
          <div className="h-[6px] bg-[#F6F6F6]"></div>
          <p className="text-sm text-gray-600 mb-6 px-6 md:px-8">
            {description}
          </p>
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
                        const type = formValues.idType;

                        if (!type) return 'Please select an ID type first';

                        if (type === 'bvn') {
                          return (
                            /^\d{11}$/.test(value) ||
                            'BVN must be exactly 11 digits'
                          );
                        }

                        if (type === 'nin') {
                          return (
                            /^\d{11}$/.test(value) ||
                            'NIN must be exactly 11 digits'
                          );
                        }

                        if (type === 'drivers_license') {
                          return (
                            /^[A-Z0-9]{8,15}$/i.test(value) ||
                            'Driver’s License must be 8–15 alphanumeric characters'
                          );
                        }

                        if (type === 'passport') {
                          return (
                            /^[A-Z0-9]{6,9}$/i.test(value) ||
                            'Passport must be 6–9 alphanumeric characters'
                          );
                        }

                        return true;
                      },
                    })}
                    className="border w-full p-2 rounded-md"
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
                    {...register('streetAddress', {
                      required: 'Street name is required',
                    })}
                    className="border w-full p-2 rounded-md"
                  />
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1 font-inter">
                      {isError.street}
                    </p>
                  )}
                </div>
                <div className="mb-3 font-inter">
                  <label className="block text-sm font-medium mb-1 font-inter">
                    Local Government
                  </label>
                  <input
                    type="text"
                    {...register('lga', {
                      required: 'Local Government is required',
                    })}
                    className="border w-full p-2 rounded-md"
                  />
                  {isError.lga && (
                    <p className="text-red-500 text-sm mt-1">
                      {isError.lga.message}
                    </p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1 font-inter">
                    State
                  </label>
                  <input
                    type="text"
                    {...register('state', { required: 'State is required' })}
                    className="border w-full p-2 rounded-md"
                  />
                  {isError.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {isError.state.message}
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
                />
                {isError.bvn && (
                  <p className="text-red-500 text-sm mt-1">
                    {isError.bvn.message}
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
            >
              Cancel
            </button>
            <button
              className="bg-[var(--yellow-primary)] rounded-[5px] px-4 py-2 font-inter font-medium"
              type="submit"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
                  Loading...
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
