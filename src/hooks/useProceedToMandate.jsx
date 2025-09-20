import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMandateData } from '../features/paystack/mandateSlice';
import { consolidateCartPayments } from '../utils/ConsolidateCartPayment';
import {
  selectCurrentAddress,
  selectedDeliveryType,
} from '../features/order/deliveryAddressSlice';

export const useProceedToMandate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alreadyNavigatedRef = useRef(false);

  const userSelectedDeliveryType = useSelector(selectedDeliveryType);
  const cart = useSelector((state) => state.cart.cart);

  const currentDeliveryAddress = useSelector(selectCurrentAddress);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const deliveryAddress = [
    currentDeliveryAddress?.streetAddress || latest_address?.streetAddress,
    currentDeliveryAddress?.state || latest_address?.state,
  ]
    .filter(Boolean)
    .join(', ');

  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = userSelectedDeliveryType?.amount || 0;
  const total = totalCartPrice + VAT + shippingFee;

  const cartPaymentPlan = cart.map(
    (item) => item.paymentPlan || item.selectedPaymentPlan
  );
  const consolidatedPayments = consolidateCartPayments(cart);

  const firstInstallmentPayment =
    consolidatedPayments?.firstPayment + VAT + shippingFee;

  const proceed = () => {
    if (alreadyNavigatedRef.current) return;
    alreadyNavigatedRef.current = true;

    const payload = {
      first_installment_payment: firstInstallmentPayment,

      last_installment_payment:
        consolidatedPayments?.otherPayments.at(-1)?.amount,

      consolidated_total_amount: total,
      frequency: cartPaymentPlan[0],
      paymentMethod: cartPaymentPlan[0],
      description: 'Getting product',
      deliveryFullAddress: deliveryAddress,
      products: cart.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
      })),
    };

    dispatch(setMandateData(payload));
    navigate('/cart-items/checkout/mandate/create', {
      state: {
        ...payload,
        downPayment: consolidatedPayments.firstPayment + VAT + shippingFee,
      },
    });
  };

  return proceed;
};
