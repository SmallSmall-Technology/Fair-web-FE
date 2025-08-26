import React from 'react';
import { getPaymentIcon } from '../../../../../utils/PaymentIcons';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { getPaymentDates } from '../../../../../utils/PaymentDates';

export const CartItemDailyPayment = React.memo(({ product }) => {
  const installmentOption =
    product?.paymentOptionsBreakdown?.find(
      (option) => option.type === 'daily'
    ) || null;

  if (!installmentOption) return;

  const numberOfInstallments = installmentOption?.numberOfInstallments || 0;
  const { quantity } = product;

  // Generate payment plan dynamically
  const paymentDaily = [
    {
      amount: installmentOption?.downPayment * quantity,
      label: 'Pay now today',
      icon: '/images/quater-circle.svg',
    },
    ...Array.from({ length: numberOfInstallments }, (_, index) => ({
      amount: installmentOption?.installmentAmount * quantity,
      label:
        index + 1 === numberOfInstallments
          ? 'Final Payment'
          : `${index + 2}nd Payment`,
      date: getPaymentDates(new Date(), numberOfInstallments)[index],
      icon: getPaymentIcon(index, numberOfInstallments),
    })),
  ];

  return (
    <section className="w-full px-2">
      <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">Daily</p>
      <article className="flex w-[95%] mx-auto overflow-x-auto custom-scrollbar-hidden">
        <div className="flex gap-6 ">
          {paymentDaily?.map((payment, index) => (
            <div key={index} className="flex items-center space-x-2 min-w-fit">
              <div className="h- w-7">
                <img
                  src={payment?.icon}
                  alt={`${payment?.label} payment icon`}
                  className="h-full w-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-xs font-medium mt-1">
                  {formatCurrency(payment?.amount)}
                </p>
                <span className="text-[11px] text-center min-w-fit bg-bl">
                  {payment?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
});
