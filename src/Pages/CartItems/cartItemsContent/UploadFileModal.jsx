import Modal from 'react-modal';
import { useState } from 'react';
import { X } from 'lucide-react';
import { YellowButton } from '../../../utils/Button';
import { useNavigate } from 'react-router-dom';

export const UploadFileModal = ({ onUpgrade, closeModal, modalIsOpen }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSend = () => {
    // if (onUpgrade) onUpgrade();
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
        contentLabel="User Reviews Modal"
        overlayClassName="bg-black/50 fixed inset-0 flex justify-center items-center z-50"
        className="relative mt-24 w-[376px] lg:w-[479px] rounded-[7px] bg-[#F2F2F2] border outline-none mx-2 lg:mx-0"
        preventScroll={true}
      >
        <section className="relative">
          <button
            className="absolute top-5 right-2 bg-black text-white rounded-full p-1"
            onClick={closeModal}
          >
            <X size={18} />
          </button>
          <div className="flex flex-col justify-center items-center py-20">
            <p className="font-medium mb-6 text-center">
              Upload a PDF of your income data
            </p>
            <button>
              <label className="bg-[#FFEF8B] rounded-full p-2 cursor-pointer flex items-center justify-center mb-2">
                <img src="/images/upload.svg" alt="Upload" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </button>

            {uploadedFile ? (
              <div className="text-sm text-center space-y-2">
                <p className="font-medium">{uploadedFile.name}</p>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-blue-500 underline text-xs"
                >
                  Change file
                </button>
              </div>
            ) : (
              <p className="text-xs underline pb-1">Click to upload</p>
            )}
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between mx-10 pb-6">
            <button onClick={closeModal} className="underline">
              Cancel
            </button>
            {uploadedFile && (
              <div>
                <YellowButton onClick={handleSend}>Send</YellowButton>
              </div>
            )}
          </div>
        </section>
      </Modal>
    </div>
  );
};
