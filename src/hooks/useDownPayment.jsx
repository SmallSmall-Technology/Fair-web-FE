import { use, useEffect, useState } from 'react';
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
import { setMandateData } from '../features/paystack/mandateSlice';
import { useNavigate } from 'react-router-dom';
import {
  selectCurrentAddress,
  selectedDeliveryType,
} from '../features/order/deliveryAddressSlice';
import { useOrders } from '../pages/userDashboard/shopping/shoppingOverviewContents/purchase/useOrders';

export function useDownPayment() {
  const mandateData = useSelector((state) => state.mandate.data);
  const { refetchOrders } = useOrders();

  const currentDeliveryAddress = useSelector(selectCurrentAddress);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paystackOrderReference = useSelector(
    (state) => state.fullPayment.paystackOrderReference
  );

  const userSelectedDeliveryType = useSelector(selectedDeliveryType);
  const cart = useSelector((state) => state.cart.cart);

  // Calculate total cart price
  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryAddress = [
    currentDeliveryAddress?.streetAddress || latest_address?.streetAddress,
    currentDeliveryAddress?.state || latest_address?.state,
  ]
    .filter(Boolean)
    .join(', ');

  // Calculate VAT and shipping fee
  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = userSelectedDeliveryType?.amount || 0;
  const total = totalCartPrice + VAT + shippingFee;

  const { data: validationData, refetch: refetchValidation } =
    useValidateFullOrDownPayment(paystackOrderReference);

  useEffect(() => {
    if (!validationData) {
      dispatch(setDownPaymentSuccess(false));
      return;
    }

    const { payment_verified, status } = validationData;

    if (payment_verified && status === 'success') {
      dispatch(setDownPaymentSuccess(true));
    } else {
      dispatch(setDownPaymentSuccess(false));
    }
  }, [validationData, dispatch]);

  const { mutate: payForDownPayment, isPending: isValidating } = useMutation({
    mutationFn: () => createPaystackOrder(mandateData),
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
              fullPayment &&
              transaction.status === 'success' &&
              transaction.message === 'Approved'
            ) {
              dispatch(setMandateData(null));
              dispatch(setPaystackOrderReference(null));
              refetchOrders();

              navigate(
                `/cart-items/checkout/payment-success/${transaction.reference}`,
                {
                  state: {
                    masterOrderID: res?.data?.masterOrderID,
                    totalAmount: transaction?.amount,
                  },
                }
              );
            }
            if (
              transaction.status === 'success' &&
              transaction.message === 'Approved'
            ) {
              dispatch(setPaystackOrderReference(transaction.reference));
              dispatch(clearCart());
              // dispatch(setMandateData(null));
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

  const handlePayDownPayment = (downPayment) => {
    if (!downPayment) return;
    payForDownPayment(mandateData);
    dispatch(setMandateData(null));
    dispatch(clearCart());
  };

  return {
    handlePayDownPayment,
    isValidating,
    validationData,
  };
}
