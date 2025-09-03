import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CustomButton } from '../../../../../utils/Button';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { createPaystackMandate } from '../../../../../api/orderAPI';

export const MakeDirectDebit = () => {
  const mandateData = useSelector((state) => state.mandate.data);

  // Create Paystack mandate
  const { mutate: createMandate, isPending: isValidating } = useMutation({
    mutationFn: () => createPaystackMandate(mandateData),
    onSuccess: (res) => {
      const redirectUrl = res.data?.redirect_url;
      if (redirectUrl) {
        window.open(redirectUrl, '_blank');
      }
    },
  });

  const handleCreateMandate = () => {
    if (!selectedBank || !accountNumber) return;
    createMandate();
  };

  return (
    <section>
      <p className="text-sm font-outfit mb-4 font-semibold">
        <span className="mr-1 font-normal">Step 1.</span>Make your down payment
      </p>
      <div className="bg-white rounded-xl border border-[#DEDEDE] p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-center items-center">
        <p className="text-lg font-semibold font-outfit">DIRECT DEBIT</p>
        <div className="border border-[#DEDEDE] w-full mx-10 mt-3 mb-4"></div>
        <p className="font-inter text-sm font-normal mb-3">
          Total Installment Amount
        </p>
        <p className="font-outfit font-semibold text-3xl mb-4">
          {formatCurrency(mandateData?.first_installment_payment)}
        </p>
        <p className="font-inter text-sm font-normal mb-3">
          Number of Installment
        </p>
        <p className="font-outfit font-semibold text-3xl mb-4">3</p>

        <button
          onClick={handleCreateMandate}
          disabled={isValidating}
          className="w-full py-2 rounded-[5px] text-black font-medium mt-4 bg-[var(--yellow-primary)] hover:bg-yellow-500"
        >
          {isValidating ? 'Setting up...' : 'Set up Direct Debit'}
        </button>

        <p className="font-light text-[11px] text-center mt-6 mb-2 mx-8 w-[317px] text-balance">
          By clicking Setup direct debit, you agree to our <br />
          <span className="font-bold underline">
            Direct debit terms of use, Global standing mandate terms of use{' '}
          </span>{' '}
          and{' '}
          <span className="font-bold underline">
            Paystack’s end-user policy
          </span>
        </p>
        <p className="underline font-inter text-xs font-normal">
          What is direct debit?
        </p>
      </div>
    </section>
  );
};
