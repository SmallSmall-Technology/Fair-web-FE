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

export function useFullPayment(fullPayment) {
  const mandateData = useSelector((state) => state.mandate.data);

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

  // Prepare mandate data for full payment
  const mandateDataForFullPayment = {
    consolidated_total_amount: total,
    products: mandateData?.products,
    paymentMethod: mandateData?.paymentMethod,
    deliveryFullAddress: deliveryAddress,
    deliveryType: userSelectedDeliveryType?.label,
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
    mutationFn: () => createPaystackOrder(mandateDataForFullPayment),
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

  const handlePayFullPayment = () => {
    // if (!downPayment) return;
    payForDownPayment(mandateDataForFullPayment);
  };

  return {
    handlePayFullPayment,
    isValidating,
    validationData,
  };
}
