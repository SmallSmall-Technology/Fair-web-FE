import Modal from 'react-modal';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const BVNUpload = ({ onUpgrade, closeModal, modalIsOpen }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    closeModal();
    navigate('/verification-document-sent');
  };

  return (
    <div className="flex justify-center w-full">
      <Modal
        appElement={document.getElementById('app')}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        contentLabel="Tier Two Verification Modal"
        overlayClassName="bg-black/50 fixed inset-0 flex justify-center items-center z-50"
        className="relative w-[376px] lg:w-[479px] rounded-[10px] bg-white outline-none border mx-2 lg:mx-0 px-6 md:px-8 py-8"
        preventScroll={true}
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
            <h2 className="text-lg font-semibold mr-2">
              Tier two verification
            </h2>
            <img src="/images/tier-verify.svg" alt="" className="w-4 h-4" />
          </div>

          <p className="text-sm text-gray-600 mb-1">
            Please enter your BVN to verify your income to tier two.
          </p>
          <a href="#" className="text-sm underline mb-6">
            What is Tier two?
          </a>

          <div className="mb-2 w-full">
            <label
              htmlFor="bvn"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              BVN
            </label>

            <input
              id="bvn"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter BVN"
              maxLength={11}
              {...register('bvn', {
                required: 'BVN is required',
                pattern: {
                  value: /^\d{11}$/,
                  message: 'BVN must be exactly 11 digits',
                },
              })}
              className={`border w-full p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                errors.bvn ? 'border-red-500' : 'border-gray-300'
              }`}
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== 'Backspace' &&
                  e.key !== 'Delete' &&
                  e.key !== 'ArrowLeft' &&
                  e.key !== 'ArrowRight' &&
                  e.key !== 'Tab'
                ) {
                  e.preventDefault();
                }
              }}
            />

            {errors.bvn && (
              <p className="text-red-500 text-sm mt-1">{errors.bvn.message}</p>
            )}
          </div>

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between items-center w-full">
            <button
              type="button"
              onClick={closeModal}
              className="text-sm underline text-gray-700"
            >
              Cancel
            </button>

            <div>
              <button
                className="bg-[#FFDE11] rounded-[5px] px-4 py-2"
                type="submit"
              >
                Verify
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
