import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomButton } from '../../../../../utils/Button';
import { VerificationSuccessCard } from './VerificationSuccessCard';
import { AccountVerificationModal } from './AccountVerificationModal';
import {
  selectError,
  selectVerificationStatus,
} from '../../../../../features/user/accountVerificationSlice';

export const VerificationCard = ({
  type,
  icon,
  title,
  value,
  description,
  errorMessage,
}) => {
  const isVerified = useSelector((state) =>
    selectVerificationStatus(state, type)
  );

  const error = useSelector(selectError);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleVerificationSuccess = (isApproved) => {
    if (isApproved) {
      setModalIsOpen(false);
    }
  };

  const handleVerificationFailure = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {isVerified ? (
        <VerificationSuccessCard title={title} icon={icon} type={type} />
      ) : (
        <li className="gri md:flex items-center justify-between space-x-4 w-full border border-[#E5E5E5] rounded-[6px] p-2">
          <div className="flex space-x-2 md:items-center w-full">
            <div className="bg-[#F5F5F7] md:p-4 p-3 rounded-[6px] w-[49.99px] md:w-[93px] h-fit flex items-center justify-center">
              <img
                src={icon}
                alt={title}
                className="w-[30px] h-[30px] md:w-10 md:h-10"
              />
            </div>
            <div className="w-full">
              <p className="font-semibold font-inter">{title}</p>
              <p className="text-sm font-inter font-normal">{value}</p>

              <div className="md:hidden mt-4 mb-2 flex justify-between w-full items-center">
                <CustomButton
                  padding="py-1 px-4 rounded"
                  text="Verify now"
                  width="121px"
                  onClick={() => setModalIsOpen(true)}
                />
                <p className="text-[#96959F] text-xs font-inter">
                  Not verified{' '}
                  <span>
                    {isVerified && (
                      <img src="/public/images/failed-icon.svg" alt="Failed" />
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:items-end">
            <div className="flex justify-between w-full items-center flex-row-reverse md:grid">
              <p className="text-[#96959F] text-xs font-inter flex items-baseline">
                Not verified{' '}
                <span className="ml-3">
                  {isVerified && (
                    <img
                      src="/public/images/failed-icon.svg"
                      alt="Failed"
                      width="24px"
                      height="24px"
                    />
                  )}
                </span>
              </p>
              <CustomButton
                padding="py-1 px-4 rounded"
                text={isVerified ? 'Try again' : 'Verify now'}
                width="121px"
                onClick={() => setModalIsOpen(true)}
                className="mt-"
              />
            </div>
          </div>
        </li>
      )}
      {isVerified === 'true' && (
        <article className="border border-[#BE0F02] p-2 bg-[#FEF0F0] rounded-[6px]">
          <p className="text-[#BE0F02] font-inter text-sm mt-1">
            <strong>Verification Failed:</strong> {errorMessage}
          </p>
        </article>
      )}

      <AccountVerificationModal
        icon={icon}
        type={type}
        title={title}
        description={description}
        closeModal={() => setModalIsOpen(false)}
        modalIsOpen={modalIsOpen}
        setFailed={handleVerificationFailure}
        setVerified={handleVerificationSuccess}
      />
    </>
  );
};
