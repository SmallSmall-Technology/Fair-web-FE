import { X } from 'lucide-react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../../../../utils/Button';
import { useState } from 'react';

export const AccountVerificationModal = ({
  icon,
  type,
  title,
  description,
  closeModal,
  modalIsOpen,
  isLoading,
  setFailed,
  setVerified,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setVerified(true);
    setFailed(false);
    closeModal();
    // navigate('/verification-document-sent');
  };

  return (
    <div className="flex justify-center w-full font-inter">
      <Modal
        appElement={document.getElementById('app')}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        overlayClassName="bg-black/50 fixed inset-0 flex justify-center items-center z-50"
        className="relative w-[376px] lg:w-[479px] rounded-[10px] bg-white outline-none border mx-2 lg:mx-0 px-6 md:px-8 py-8"
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
          <div className="flex items-center justify-start mb-4">
            <h2 className="text-lg font-semibold mr-2">{title}</h2>
            <img src={icon} alt="" className="w-4 h-4" />
          </div>

          <p className="text-sm text-gray-600 mb-6">{description}</p>

          {type === 'id' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 font-inter">
                Upload Government-issued ID
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                {...register('idFile', {
                  required: 'Please upload your ID card',
                })}
                className="border w-full p-2 rounded-md"
              />
              {errors.idFile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.idFile.message}
                </p>
              )}
            </div>
          )}

          {type === 'address' && (
            <>
              <div className="mb-3 font-inter">
                <label className="block text-sm font-medium mb-1">
                  Street Name
                </label>
                <input
                  type="text"
                  {...register('street', {
                    required: 'Street name is required',
                  })}
                  className="border w-full p-2 rounded-md"
                />
                {errors.street && (
                  <p className="text-red-500 text-sm mt-1 font-inter">
                    {errors.street.message}
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
                {errors.lga && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lga.message}
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
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
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
              {errors.bvn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bvn.message}
                </p>
              )}
            </div>
          )}

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between items-center w-full">
            <button
              type="button"
              onClick={closeModal}
              className="text-sm underline text-gray-700 font-inter"
            >
              Cancel
            </button>
            <button
              className="bg-[var(--yellow-primary)] rounded-[5px] px-4 py-2"
              type="submit"
            >
              {isLoading ? (
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
