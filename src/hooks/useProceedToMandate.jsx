import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { consolidateCartPayments } from '../utils/ConsolidateCartPayment';
import { setMandateData } from '../features/mono/mandateSlice';
import { selectCurrentDeliveryAddress } from '../features/user/userSlice';

export const useProceedToMandate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alreadyNavigatedRef = useRef(false);
  const selectedDeliveryAddress = useSelector(selectCurrentDeliveryAddress);

  const cart = useSelector((state) => state.cart.cart);

  const totalCartPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = 1200;
  const total = totalCartPrice + VAT + shippingFee;

  const cartPaymentPlan = cart.map(
    (item) => item.paymentPlan || item.selectedPaymentPlan
  );
  const consolidatedPayments = consolidateCartPayments(cart);

  const proceed = () => {
    if (alreadyNavigatedRef.current) return;
    alreadyNavigatedRef.current = true;

    const payload = {
      first_installment_payment:
        consolidatedPayments.firstPayment + VAT + shippingFee,
      first_debit_date: new Date().toISOString().split('T')[0],
      last_installment_payment:
        consolidatedPayments.otherPayments.at(-1)?.amount,
      last_installment_date: new Date(
        consolidatedPayments.otherPayments.at(-1)?.date
      )
        .toISOString()
        .split('T')[0],
      consolidated_total_amount: total,
      frequency: cartPaymentPlan[0],
      paymentPlan: cartPaymentPlan[0],
      description: '',
      deliveryFullAddress:
        selectedDeliveryAddress?.streetAddress +
        ', ' +
        selectedDeliveryAddress?.state,
      deliveryState: selectedDeliveryAddress?.state,
      bankCode: '',
      accountNumber: '',
      products: cart.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
      })),
    };
    dispatch(setMandateData(payload));
    navigate('/cart-items/checkout/mandate/create', {
      state: payload,
    });
  };

  return proceed;
};
