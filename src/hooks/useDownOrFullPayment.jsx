import { useEffect, useState } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { createPaystackOrder } from '../api/orderAPI';
import { useValidateFullOrDownPayment } from './useValidateFullOrDownPayment';
import {
  setDownPaymentSuccess,
  setPaystackOrderReference,
} from '../features/order/fullPaymentSlice';
import { clearCart } from '../features/cart/cartSlice';
// import { clearCart } from '../features/cart/cartSlice';

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

  useEffect(() => {
    const { payment_verified, status } = validationData || {};
    if (payment_verified === true && status === 'success') {
      dispatch(setDownPaymentSuccess(true));
    } else {
      dispatch(setDownPaymentSuccess(false));
    }
  }, [validationData]);

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
          reference: newReference,
          onSuccess: (transaction) => {
            dispatch(setPaystackOrderReference(transaction.reference));

            if (
              transaction.status === 'success' &&
              transaction.message === 'Approved'
            ) {
              dispatch(setPaystackOrderReference(transaction.reference));
              dispatch(clearCart());
            } else {
              dispatch(setPaystackOrderReference(null));
            }

            refetchValidation();
          },
          onError: (error) => {
            dispatch(setPaystackOrderReference(null));
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
