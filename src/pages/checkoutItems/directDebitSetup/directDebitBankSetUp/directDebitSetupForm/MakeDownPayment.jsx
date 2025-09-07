import { useState } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../../../../../utils/Button';
import { createPaystackOrder } from '../../../../../api/orderAPI';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { useDownOrFullPayment } from '../../../../../hooks/useDownOrFullPayment';
import { useValidateFullOrDownPayment } from '../../../../../hooks/useValidateFullOrDownpayment';

export const MakeDownPayment = ({ downPayment }) => {
  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );

  console.log('downPaymentSuccess', downPaymentSuccess);

  const dispatch = useDispatch();

  const { handlePayDownPayment, isValidating } =
    useDownOrFullPayment(downPayment);

  return (
    <section className="w-full">
      <p
        className={`${downPaymentSuccess ? 'text-[#3DB54A]' : ''} text-sm font-outfit mb-4 font-semibold flex items-center gap-2 `}
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
          <div className="border border-[#DEDEDE] w-full mx-10 mt-3 mb-4"></div>
          <p className="font-inter text-sm font-normal mb-3">Amount to pay</p>
          <p className="font-outfit font-semibold text-3xl mb-4">
            {formatCurrency(downPayment)}
          </p>
          <div className="w-full md:w-2/3">
            <CustomButton
              text={isValidating ? 'Processing...' : 'Pay now'}
              role="button"
              disabled={isValidating}
              onClick={handlePayDownPayment}
              className="md:w-2/3"
            />
          </div>
        </div>
      )}
    </section>
  );
};
