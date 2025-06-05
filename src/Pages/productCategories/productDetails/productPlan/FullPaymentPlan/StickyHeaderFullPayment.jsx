import React from 'react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const StickyHeaderFullPayment = React.memo(({ product }) => {
  const paymentsInFull = [
    {
      amount: product.amount,
      label: 'Pay in full now today',
      date: new Date(),
      icon: '/images/full-circle.svg',
    },
  ];

  return (
    <article className="flex">
      <div className="flex space-x-5 w-full">
        {paymentsInFull.map((payment, index) => (
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
                {formatCurrency(product.price)}
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
