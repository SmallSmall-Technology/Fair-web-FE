import { getPaymentDates } from './PaymentDates';

export function consolidateCartPayments(cart) {
  const consolidatedPayments = {
    firstPayment: 0,
    otherPayments: [],
  };

  console.log(cart);

  cart.forEach((item) => {
    const cartPaymentPlan = item?.paymentPlan || item?.selectedPaymentPlan;
    const option = item?.paymentOptionsBreakdown?.find(
      (opt) => opt?.type === cartPaymentPlan
    );
    if (!option) return;

    // Add first payment
    consolidatedPayments.firstPayment +=
      (option?.downPayment || 0) * (item?.quantity || 1);

    // Determine number of installments
    const installmentsCount =
      option.numberOfInstallments ||
      option.months ||
      option.weeks ||
      option.days ||
      0;

    // Generate payment dates
    const paymentDates = getPaymentDates(
      option.type,
      new Date(),
      installmentsCount
    );

    // Add installments
    for (let i = 0; i < installmentsCount; i++) {
      const existing = consolidatedPayments.otherPayments[i] || {
        amount: 0,
        date: paymentDates[i],
      };

      consolidatedPayments.otherPayments[i] = {
        amount:
          existing.amount +
          (option.installmentAmount || 0) * (item.quantity || 1),
        date: existing.date,
      };
    }
  });

  return consolidatedPayments;
}
