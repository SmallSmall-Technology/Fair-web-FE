import React from 'react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

const CartItemFulllPayment = React.memo(({ product }) => {
  const { quantity } = product;
  const paymentsInFull = [
    {
      amount: product.price * quantity,
      label: 'Pay in full now today',
      date: new Date(),
      icon: '/images/full-circle.svg',
    },
  ];

  return (
    <section className="w-full px-2">
      <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">
        Pay in full
      </p>
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
                  {formatCurrency(payment?.amount)}
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

export default CartItemFulllPayment;
