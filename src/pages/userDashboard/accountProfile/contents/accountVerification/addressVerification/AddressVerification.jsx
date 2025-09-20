import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CustomButton } from '../../../../../../utils/Button';

import {
  verifyAccountByAddress,
  verifyDebtProfile,
} from '../../../../../../api/user-api';
import { AccountVerificationModal } from '../AccountVerificationModal';
import { addressVerificationData } from './data';
import { AddressVerificationModal } from './AddressVerificationModal';
import { AddressVerificationSuccessCard } from './AccountVerificationSuccessCard';
import {
  selectAddressError,
  setAddress,
  setAddressError,
} from '../../../../../../features/user/verificationSlices/addressVerifcationSlice';

export const AddressVerification = ({
  type,
  icon,
  title,
  value,
  description,
}) => {
  const dispatch = useDispatch();

  // Redux state
  const error = useSelector(selectAddressError);

  const addressDataFromSlice = useSelector(
    (state) => state.addressVerification.data
  );

  // Local state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [localVerified, setLocalVerified] = useState(false);
  const [addressData, setAddressData] = useState(null);

  // Mutation for manual verification
  const { mutate, isPending } = useMutation({
    mutationFn: verifyAccountByAddress,
    onSuccess: (response) => {
      const userResidentialAddress = response?.data;

      if (userResidentialAddress) {
        setLocalVerified(true);
        setAddressData(userResidentialAddress);
        dispatch(setAddress(userResidentialAddress));
        dispatch(setAddressError(null));
        toast.success(`${title} successful`);
        setModalIsOpen(false);
      } else {
        dispatch(setAddressError('Verification failed, please try again.'));
        toast.error('Verification failed');
        dispatch(setAddress(null));
      }
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || 'Verification failed';
      dispatch(setAddressError(errorMessage));
      toast.error(errorMessage);
    },
  });

  const handleVerifySubmit = (formData) => {
    mutate({
      residentialAddress: formData.residentialAddress,
      residentialCity: formData.residentialCity,
      residentialState: formData.residentialState,
    });
  };

  return (
    <>
      {localVerified || addressDataFromSlice?.success === true ? (
        <AddressVerificationSuccessCard
          title={title}
          icon={icon}
          type={type}
          data={addressData}
          addressData={addressDataFromSlice}
        />
      ) : (
        <li className="grid md:flex items-center justify-between space-x-4 w-full border border-[#E5E5E5] rounded-[6px] p-2">
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

              {/* Mobile button */}
              <div className="md:hidden mt-4 mb-2 flex justify-between w-full items-center">
                <CustomButton
                  padding="py-1 px-4 rounded"
                  text={isPending ? 'Verifying...' : 'Verify now'}
                  width="121px"
                  onClick={() => setModalIsOpen(true)}
                  disabled={isPending}
                />
                <p className="text-[#96959F] text-xs font-inter">
                  Not verified
                </p>
              </div>
            </div>
          </div>

          {/* Desktop button */}
          <div className="hidden md:flex md:items-end">
            <div className="flex justify-between w-full items-center flex-row-reverse md:grid">
              <div className="flex items-baseline justify-between mb-1">
                <p className="text-[#96959F] text-xs font-inter">
                  Not verified
                </p>
                {error && (
                  <img
                    src="/images/failed-icon.svg"
                    alt="Error"
                    className="w-6 h-6"
                  />
                )}
              </div>

              {error ? (
                <CustomButton
                  padding="py-1 px-4 rounded"
                  text={'Try again'}
                  width="121px"
                  onClick={() => setModalIsOpen(true)}
                  disabled={isPending}
                />
              ) : (
                <CustomButton
                  padding="py-1 px-4 rounded"
                  text={isPending ? 'Verifying...' : 'Verify now'}
                  width="121px"
                  onClick={() => setModalIsOpen(true)}
                  disabled={isPending}
                />
              )}
            </div>
          </div>
        </li>
      )}

      {/* Show error message if verification failed */}
      {error && (
        <article className="border border-[#BE0F02] p-2 bg-[#FEF0F0] rounded-[6px] mt-2">
          <p className="text-[#BE0F02] font-inter text-sm">
            <strong>Verification Failed:</strong>{' '}
            {addressVerificationData?.data?.errorMessage}
          </p>
        </article>
      )}

      {/* Address Verification Modal */}
      <AccountVerificationModal
        closeModal={() => setModalIsOpen(false)}
        modalIsOpen={modalIsOpen}
      >
        <AddressVerificationModal
          icon={icon}
          title={title}
          description={description}
          closeModal={() => setModalIsOpen(false)}
          setFailed={() => setModalIsOpen(false)}
          setVerified={() => setModalIsOpen(false)}
          onSubmit={handleVerifySubmit}
          isPending={isPending}
        />
      </AccountVerificationModal>
    </>
  );
};
