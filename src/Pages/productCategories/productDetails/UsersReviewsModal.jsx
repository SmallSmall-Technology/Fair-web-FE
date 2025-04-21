import { useState } from 'react';
import Modal from 'react-modal';
import { UserReview } from './UsersReviews';
import { SidebarClose } from 'lucide-react';
import { YellowButton } from '../../../utils/Button';

Modal.setAppElement('#app');

export const UsersReviewsModal = ({ reviews }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div>
        {' '}
        <YellowButton onClick={openModal}>See more</YellowButton>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Reviews Modal"
        >
          <section className=" flex flex-col justify-between items-center h-[40rem]">
            <div className="w-full">
              {reviews.map((review, index) => {
                return <UserReview key={index} review={review} />;
              })}
            </div>
            <button className="fixed top-14 right-20" onClick={closeModal}>
              <SidebarClose />
            </button>
            <div className=" w-[80%] md:w-1/2 ">
              <YellowButton onClick={closeModal}>Close reviews</YellowButton>
            </div>
          </section>
        </Modal>
      </div>
    </>
  );
};
