import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  createPaystackMandate,
  //   getBanksList,
  //   validateAccountNumber,
} from '../../../../../api/orderAPI';
import {
  setAuthorized,
  setBankDetails,
  setMandateData,
} from '../../../../../features/paystack/mandateSlice';
import { useForm } from 'react-hook-form';
import { Search, Minus } from 'lucide-react';
import { selectMandateData } from '../../../../../features/paystack/mandateSlice';
import { MakeDownPayment } from './MakeDownPayment';
import { MakeDirectDebit } from './MakeDirectDebit';

export const DirectDebitBankSetupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mandateData = useSelector(selectMandateData);

  console.log(mandateData);

  return (
    <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 pt-10 px-4 lg:px-6">
      <MakeDownPayment />

      <aside>
        <MakeDirectDebit />
      </aside>
    </section>
  );
};
