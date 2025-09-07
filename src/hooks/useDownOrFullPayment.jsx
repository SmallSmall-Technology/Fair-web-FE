import { useState } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { createPaystackOrder } from '../api/orderAPI';
import { useValidateFullOrDownPayment } from './useValidateFullOrDownPayment';
import {
  setDownPaymentSuccess,
  setPaystackOrderReference,
} from '../features/order/fullPaymentSlice';

export function useDownOrFullPayment(downPayment) {
  const mandateData = useSelector((state) => state.mandate.data);
  const dispatch = useDispatch();

  const paystackOrderReference = useSelector(
    (state) => state.fullPayment.paystackOrderReference
  );

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
    useValidateFullOrDownPayment(paystackOrderReference);

  const { mutate: payForDownPayment, isPending: isValidating } = useMutation({
    mutationFn: () => createPaystackOrder(mandateDataForDownPayment),
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
            setPaystackOrderReference(newReference);

            if (
              transaction.status === 'success' &&
              transaction.message === 'Approved'
            ) {
              dispatch(setDownPaymentSuccess(true));
              dispatch(setPaystackOrderReference(newReference));
            } else {
              dispatch(setDownPaymentSuccess(false));
              dispatch(setPaystackOrderReference(null));
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
