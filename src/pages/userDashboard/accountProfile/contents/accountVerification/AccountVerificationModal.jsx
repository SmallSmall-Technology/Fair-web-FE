import Modal from 'react-modal';
import { X } from 'lucide-react';

export const AccountVerificationModal = ({
  children,
  closeModal,
  modalIsOpen,
}) => (
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
    {children}
  </Modal>
);
