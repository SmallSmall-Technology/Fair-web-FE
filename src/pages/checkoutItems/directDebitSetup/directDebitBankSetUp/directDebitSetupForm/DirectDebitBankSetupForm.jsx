import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createPaystackOrder } from '../../../../../api/orderAPI';
import {
  setAuthorized,
  setBankDetails,
  setMandateData,
} from '../../../../../features/paystack/mandateSlice';
import { useForm } from 'react-hook-form';
import { Search, Minus } from 'lucide-react';
import { selectMandateData } from '../../../../../features/paystack/mandateSlice';
import { MakeDownPayment } from './makeDownPayment/MakeDownPayment';
import { MakeDirectDebit } from './makeDirectDebit/MakeDirectDebit';

export const DirectDebitBankSetupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mandateData = useSelector(selectMandateData);
  const location = useLocation();
  const downPayment = location.state?.downPayment;

  return (
    <section className="md:flex md:max-w-6xl mx-auto md:space-x-14 space-y-8 md:space-y-0 justify-between">
      <MakeDownPayment downPayment={downPayment} />
      <MakeDirectDebit />
    </section>
  );
};
