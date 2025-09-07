import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CustomButton } from '../../../../../utils/Button';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import {
  createPaystackMandate,
  createPaystackOrder,
} from '../../../../../api/orderAPI';
import { consolidateCartPayments } from '../../../../../utils/ConsolidateCartPayment';

export const MakeDirectDebit = () => {
  const mandateData = useSelector((state) => state.mandate.data);
  const cart = useSelector((state) => state.cart.cart);
  const consolidatedPayments = consolidateCartPayments(cart);
  const directDebitPaymentFrequency =
    consolidatedPayments?.otherPayments.length;

  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );
  const paystackOrderReference = useSelector(
    (state) => state.fullPayment.paystackOrderReference
  );

  console.log(paystackOrderReference);

  const { mutate: createMandate, isPending: isValidating } = useMutation({
    mutationFn: () =>
      createPaystackMandate({ reference: paystackOrderReference }),
    onSuccess: (res) => {
      // const redirectUrl = res.data?.redirect_url;
      // if (redirectUrl) {
      //   window.open(redirectUrl, '_blank');
      // }
      console.log(res);
    },
  });

  const handleCreateMandate = () => {
    if (!downPaymentSuccess) return;
    createMandate();
  };

  return (
    <section className="w-full">
      <p className="text-sm font-outfit mb-4 font-semibold">
        <span className="mr-1 font-normal">Step 2.</span>Make your direct debit
      </p>

      <div
        className={`rounded-xl border p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-center items-center
        ${downPaymentSuccess ? 'bg-white border-[#DEDEDE]' : 'bg-[#FFFFFF]  text-[#D9D9D9] cursor-not-allowed'}
      `}
      >
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
        <p className="font-outfit font-semibold text-3xl mb-4">
          {directDebitPaymentFrequency}
        </p>

        <div className="w-full md:w-2/3">
          <CustomButton
            text={isValidating ? 'Setting up...' : 'Set up Direct Debit'}
            onClick={handleCreateMandate}
            disabled={isValidating || !downPaymentSuccess}
            bgColor={downPaymentSuccess ? 'var(--yellow-primary)' : '#F6F6F6'}
            className={!downPaymentSuccess && 'text-[#E8EBEA] '}
          />
        </div>

        <p className="font-light text-[11px] text-center mt-6 mb-2 mx-8 w-[317px] text-balance">
          By clicking Setup direct debit, you agree to our{' '}
          <br className="hidden mb:block" />
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
