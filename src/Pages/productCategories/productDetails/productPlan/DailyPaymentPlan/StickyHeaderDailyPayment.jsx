import React from 'react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const StickyHeaderDailyPayment = ({ product }) => {
  function getDailyPaymentDates(startDate, numberOfDays) {
    return Array.from({ length: numberOfDays }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index * 1);
      return date.toISOString().split('T')[0];
    });
  }

  const installmentOption = product.paymentOptions.find(
    (paymentOption) => paymentOption.label === 'Daily'
  );
  const paymentDaily = installmentOption
    ? Array.from({ length: installmentOption.dailyPayment }, (_, index) => {
        const icons = [
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/quater-circle.svg',
          '/images/half-circle.svg',
          '/images/one-third-circle.svg',
          '/images/one-third-circle.svg',
          '/images/one-third-circle.svg',
          '/images/full-circle.svg',
        ];
        const paymentNumber = index + 1;
        return {
          amount: installmentOption.dailyPayment,
          label: index === 0 ? 'Pay now today' : `Payment ${paymentNumber}`,
          date: getDailyPaymentDates(
            new Date(),
            installmentOption.dailyPayment
          )[index],
          icon: icons[index % icons.length],
        };
      })
    : [];
  return (
    <article className="flex">
      <div className="flex space-x-5 w-full">
        {paymentDaily.map((payment, index) => (
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
};
