import { useState } from 'react';
import { YellowButton } from '../../../utils/Button';
import { UploadFileModal } from './UploadFileModal';

export const IncomeUpgrade = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleUpgrade = () => {
    onUpgrade();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  // const afterOpenModal = () => {};
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <article className="rounded-[10px] bg-[#F2F2F2] py-6 px-4 lg:px-8 h-fit flex flex-col items-center justify-center mt-14">
        <div className="flex items-start mb-6 space-x-1">
          <span className="w-5 h-5">
            <img
              src="/images/alert.svg"
              alt="alert icon"
              className="w-full h-full"
            />
          </span>
          <p>
            The item(s) in your cart is valued at <strong>N1 million </strong>
            and above you are required to upgrade to tier 2.
          </p>
        </div>
        <p className="font-medium mb-3">Verify your income to upgrade</p>
        <div className="pb-6 w-full pt-2">
          <YellowButton onClick={openModal}>Upgrade now</YellowButton>

          <div className="w-52">
            <UploadFileModal
              onUpgrade={handleUpgrade}
              closeModal={closeModal}
              modalIsOpen={modalIsOpen}
            />
          </div>
        </div>
      </article>
    </>
  );
};
