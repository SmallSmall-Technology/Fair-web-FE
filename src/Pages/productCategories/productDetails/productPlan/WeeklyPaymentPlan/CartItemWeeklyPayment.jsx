import React from 'react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const CartItemWeeklyPayment = React.memo(({ product }) => {
  function getWeeklyPaymentDates(startDate, numberOfWeeks) {
    return Array.from({ length: numberOfWeeks }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index * 7);
      return date.toISOString().split('T')[0];
    });
  }

  const installmentOption =
    product.paymentPlanDetails?.type === 'weekly'
      ? product.paymentPlanDetails
      : null;

  const paymentWeekly = installmentOption
    ? Array.from({ length: installmentOption.weeks }, (_, index) => {
        const icons = [
          '/images/quater-circle.svg',
          '/images/half-circle.svg',
          '/images/one-third-circle.svg',
          '/images/full-circle.svg',
        ];
        const paymentNumber = index + 1;
        return {
          amount: installmentOption.weeklyPayment,
          label: index === 0 ? 'Pay now today' : `Week ${paymentNumber}`,
          date: getWeeklyPaymentDates(new Date(), installmentOption.weeks)[
            index
          ],
          icon: icons[index % icons.length],
        };
      })
    : [];

  return (
    <article className="flex w-[95%] mx-auto overflow-x-auto">
      <div className="flex gap-6 ">
        {paymentWeekly.map((payment, index) => (
          <div key={index} className="flex items-center space-x-2 min-w-fit">
            <div className="h- w-7">
              <img
                src={payment.icon}
                alt={`${payment.label} payment icon`}
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-xs font-medium mt-1">
                {formatCurrency(payment.amount)}
              </p>
              <span className="text-[11px] text-center min-w-fit bg-bl">
                {payment.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
});
