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

export function useFullPayment(fullPayment) {
  const mandateData = useSelector((state) => state.mandate.data);
  const { refetchOrders } = useOrders();
  const [localReference, setLocalReference] = useState(null);

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
          onSuccess: async (transaction) => {
            if (
              transaction.status === 'success' &&
              transaction.message === 'Approved'
            ) {
              // ✅ Save reference to local state immediately
              setLocalReference(transaction.reference);

              // optional: still update Redux if needed
              // dispatch(setPaystackOrderReference(transaction.reference));
              dispatch(clearCart());
              refetchOrders();

              // ✅ Trigger validation AFTER local state is set
              const validationResponse = await refetchValidation();
              if (validationResponse?.data?.payment_verified === true) {
                navigate(
                  `/cart-items/checkout/payment-success/${transaction.reference}`,
                  {
                    state: { amount: validationResponse?.data?.amount },
                    replace: true,
                  }
                );
              } else {
                console.error('Validation failed:', validationResponse?.error);
              }
            } else {
              setLocalReference(null);
              dispatch(setPaystackOrderReference(null));
            }
          },
          onError: () => {
            setLocalReference(null);
            dispatch(setPaystackOrderReference(null));
          },
        });
      }
    },
  });

  const { data: validationData, refetch: refetchValidation } =
    useValidateFullOrDownPayment(localReference);

  const handlePayFullPayment = () => {
    payForDownPayment(mandateDataForFullPayment);
  };

  return {
    handlePayFullPayment,
    isValidating,
    validationData,
  };
}
