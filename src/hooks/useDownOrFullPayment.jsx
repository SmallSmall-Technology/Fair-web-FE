import { useState } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { createPaystackMandate } from '../api/orderAPI';
import { useValidateFullOrDownPayment } from './useValidateFullOrDownPayment';
import { setDownPaymentSuccess } from '../features/order/fullPaymentSlice';

export function useDownOrFullPayment(downPayment) {
  const [reference, setReference] = useState(null);
  const mandateData = useSelector((state) => state.mandate.data);
  const dispatch = useDispatch();

  const {
    products,
    consolidated_total_amount,
    paymentMethod,
    deliveryState,
    deliveryFullAddress,
    deliveryType,
  } = mandateData;

  const mandateDataForDownPayment = {
    products,
    consolidated_total_amount: downPayment,
    paymentMethod: 'full',
    deliveryState,
    deliveryFullAddress,
    deliveryType,
  };

  const { data: validationData, refetch: refetchValidation } =
    useValidateFullOrDownPayment(reference);

  const { mutate: payForDownPayment, isPending: isValidating } = useMutation({
    mutationFn: () => createPaystackMandate(mandateDataForDownPayment),
    onSuccess: (res) => {
      const {
        reference: newReference,
        email,
        key: paystack_key,
        amount,
      } = res.data?.paystack_config || {};

      if (newReference) {
        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: paystack_key,
          email,
          amount: amount * 100,
          currency: 'NGN',
          onSuccess: (transaction) => {
            setReference(newReference);

            if (
              transaction.status === 'success' &&
              transaction.message === 'Approved'
            ) {
              dispatch(setDownPaymentSuccess(true));
            } else {
              dispatch(setDownPaymentSuccess(false));
            }

            refetchValidation();
          },
          onError: (error) => {
            console.error('Payment failed:', error);
            dispatch(setDownPaymentSuccess(false));
          },
        });
      }
    },
  });

  const handlePayDownPayment = () => {
    if (!downPayment) return;
    payForDownPayment(mandateDataForDownPayment);
  };

  return {
    handlePayDownPayment,
    isValidating,
    validationData,
  };
}
