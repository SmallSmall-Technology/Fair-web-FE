import { use, useEffect, useState } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../../../../../../utils/Button';
import { createPaystackOrder } from '../../../../../../api/orderAPI';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import { useDownOrFullPayment } from '../../../../../../hooks/useDownOrFullPayment';
import { Link } from 'react-router-dom';
import { selectCurrentAddress } from '../../../../../../features/order/deliveryAddressSlice';
import { setMandateData } from '../../../../../../features/paystack/mandateSlice';
// import { useValidateFullOrDownPayment } from '../../../../../hooks/useValidateFullOrDownPayment';

export const MakeDownPayment = ({ downPayment }) => {
  const mandateData = useSelector((state) => state.mandate.data);
  console.log('mandateData in MakeDownPayment:', mandateData);
  const currentDeliveryAddress = useSelector(selectCurrentAddress);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const deliveryAddress = [
    currentDeliveryAddress?.streetAddress || latest_address?.streetAddress,
    currentDeliveryAddress?.state || latest_address?.state,
  ]
    .filter(Boolean)
    .join(', ');

  // console.log('deliveryAddress:', deliveryAddress);

  // useEffect(() => {
  //   if (!mandateData) return;
  //   {
  //     dispatch(
  //       setMandateData({
  //         deliveryState: currentDeliveryAddress?.state || latest_address?.state,
  //         deliveryFullAddress:
  //           currentDeliveryAddress?.streetAddress ||
  //           latest_address?.streetAddress,
  //       })
  //     );
  //   }
  // }, [mandateData]);

  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );

  const dispatch = useDispatch();

  const { handlePayDownPayment, isValidating } =
    useDownOrFullPayment(downPayment);

  return (
    <section className="w-full">
      <p
        className={`${downPaymentSuccess ? 'text-[#3DB54A]' : ''} text-sm font-outfit mb-4 font-semibold flex items-center gap-2`}
      >
        <span className="mr-1 font-normal">Step 1.</span>
        {downPaymentSuccess ? 'Complete' : 'Make your down payment'}
        {downPaymentSuccess && (
          <img src="/images/check 1.svg" alt="Check icon" />
        )}
      </p>

      {downPaymentSuccess ? (
        <div className="bg-white rounded-xl border border-[#DEDEDE] p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-start items-start">
          <p className="text-sm font-semibold font-outfit mb-4">DOWN PAYMENT</p>

          <p className="font-outfit font-semibold text-3xl mb-4">
            {formatCurrency(downPayment)}
          </p>
          <div className="w-full md:w-2/3 flex items-center gap-2">
            <p className="font-outfit font-medium">Payment Successful </p>
            <img src="/images/check 1.svg" alt="Check icon" />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#DEDEDE] p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-center items-center">
          <p className="text-lg font-semibold font-outfit">DOWN PAYMENT</p>

          {/* Replace with <hr /> for consistency */}
          <hr className="w-full my-3 border-t border-gray-300" />

          <p className="font-inter text-sm font-normal mb-3">Amount to pay</p>
          <p className="font-outfit font-semibold text-3xl mb-4">
            {formatCurrency(downPayment)}
          </p>
          <div className="w-full md:w-2/3">
            <CustomButton
              text={isValidating ? 'Processing...' : 'Pay now'}
              role="button"
              disabled={isValidating}
              onClick={handlePayInFull}
              className="md:w-2/3"
            />
          </div>
        </div>
      )}
    </section>
  );
};
