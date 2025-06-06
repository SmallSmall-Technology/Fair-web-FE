import React, { useEffect, useMemo } from 'react';
import { Button } from '../../../../../utils/Button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { getPaymentDates, item_width } from '../../SingleProductDetailsAside';

const MonthlyPaymentItem = React.memo(({ payment }) => (
  <div className="flex flex-col items-center min-w-24 lg:min-w-fit">
    <div className="w-7 h-7">
      <img
        loading="lazy"
        src={payment.icon}
        alt={`${payment.label} payment icon`}
        className="h-full w-full"
      />
    </div>
    <p className="text-xs font-medium mt-1">{formatCurrency(payment.amount)}</p>
    <span className="text-[11px] text-center">{payment.label}</span>
    {payment.date && (
      <span className="text-[11px] text-center mt-1">{payment.date}</span>
    )}
  </div>
));

const MonthlyPayment = React.memo(
  ({
    product,
    handleScroll,
    canScrollRight,
    canScrollLeft,
    paymentMethodRef,
  }) => {
    const installmentOption = product?.paymentOptions?.find(
      (opt) => opt.label === 'Monthly'
    );

    const paymentDates = useMemo(() => getPaymentDates(new Date(), 3), []);

    const paymentMonthly = useMemo(
      () => [
        {
          amount: installmentOption?.monthlyPayment,
          label: 'Pay now today',
          icon: '/images/quater-circle.svg',
        },
        {
          amount: installmentOption?.monthlyPayment,
          label: '2nd Payment',
          date: paymentDates[0],
          icon: '/images/half-circle.svg',
        },
        {
          amount: installmentOption?.monthlyPayment,
          label: '3rd Payment',
          date: paymentDates[1],
          icon: '/images/one-third-circle.svg',
        },
        {
          amount: installmentOption?.monthlyPayment,
          label: 'Final Payment',
          date: paymentDates[2],
          icon: '/images/full-circle.svg',
        },
      ],
      [installmentOption, paymentDates]
    );

    return (
      <>
        <p className="font-medium mb-3 mt-4 mx-5 lg:mx-0">Monthly plan</p>
        <article className="bg-[#F2F2F2] rounded-[10px] py-5 flex flex-col justify-center lg:justify-start mx-5 lg:mx-0 relative lg:w-[80%]">
          {canScrollRight && (
            <Button
              onClick={() => handleScroll(item_width)}
              className="absolute right-2 top-5 -translate-y-1/2 z-10 lg:hidden"
            >
              <ChevronsRight />
            </Button>
          )}
          {canScrollLeft && (
            <Button
              onClick={() => handleScroll(-item_width)}
              className="absolute left-2 top-5 -translate-y-1/2 z-10 lg:hidden"
            >
              <ChevronsLeft />
            </Button>
          )}

          <div className="grid gap-4 lg:justify-between items-start px-5 w-full mt-4">
            <div
              ref={paymentMethodRef}
              className="flex space-x-9 lg:space-x-3 w-full overflow-x-auto scrollbar-hide"
            >
              {paymentMonthly.map((payment, index) => (
                <MonthlyPaymentItem key={index} payment={payment} />
              ))}
            </div>
          </div>
        </article>
      </>
    );
  }
);

export default MonthlyPayment;
