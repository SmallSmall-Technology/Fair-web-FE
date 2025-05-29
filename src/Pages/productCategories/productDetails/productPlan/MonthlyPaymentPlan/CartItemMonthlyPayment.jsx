import React from 'react';
import { getPaymentDates } from '../../SingleProductDetailsAside';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const CartItemMonthlyPayment = React.memo(({ product }) => {
  const installmentOption =
    product.paymentPlanDetails?.type === 'monthly'
      ? product.paymentPlanDetails
      : null;
  const paymentMonthly = [
    {
      amount: installmentOption.monthlyPayment,
      label: 'Pay now today',
      icon: '/images/quater-circle.svg',
    },
    {
      amount: installmentOption.monthlyPayment,
      label: '2nd Payment',
      date: getPaymentDates(new Date(), 3)[0],
      icon: '/images/half-circle.svg',
    },
    {
      amount: installmentOption.monthlyPayment,
      label: '3rd Payment',
      date: getPaymentDates(new Date(), 3)[1],
      icon: '/images/one-third-circle.svg',
    },
    {
      amount: installmentOption.monthlyPayment,
      label: 'Final Payment',
      date: getPaymentDates(new Date(), 3)[2],
      icon: '/images/full-circle.svg',
    },
  ];

  return (
    <section className="w-full px-2">
      <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">
        Monthly
      </p>
      <article className="flex w-[95%] mx-auto overflow-x-auto">
        <div className="flex gap-6 ">
          {paymentMonthly.map((payment, index) => (
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
    </section>
  );
});
