import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CustomButton } from '../../../../../utils/Button';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const MakeDownPayment = () => {
  const mandateData = useSelector((state) => state.mandate.data);

  const handlePayDownPayment = () => {
    // Implement the payment logic here
  };

  return (
    <section>
      <p className="text-sm font-outfit mb-4 font-semibold">
        <span className="mr-1 font-normal">Step 1.</span>Make your down payment
      </p>
      <div className="bg-white rounded-xl border border-[#DEDEDE] p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-center items-center">
        <p className="text-lg font-semibold font-outfit">DOWN PAYMENT</p>
        {/* <hr className="border-[#DEDEDE]" /> */}
        <div className="border border-[#DEDEDE] w-full mx-10 mt-3 mb-4"></div>
        <p className="font-inter text-sm font-normal mb-3">Amount to pay</p>
        <p className="font-outfit font-semibold text-3xl mb-4">
          {formatCurrency(mandateData?.first_installment_payment)}
        </p>
        {/* Bank list */}
        <CustomButton
          text="Pay now"
          role="button"
          onClick={handlePayDownPayment}
          width="331px"
        />
      </div>
    </section>
  );
};
