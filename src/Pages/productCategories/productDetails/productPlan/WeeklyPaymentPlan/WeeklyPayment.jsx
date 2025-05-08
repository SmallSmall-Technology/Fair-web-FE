import React from 'react';
import { Button } from '../../../../../utils/Button';
import { item_width } from '../../SingleProductDetailsAside';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const WeeklyPayment = ({
  product,
  handleScroll,
  canScrollRight,
  canScrollLeft,
  paymentMethodRef,
}) => {
  function getWeeklyPaymentDates(startDate, numberOfWeeks) {
    return Array.from({ length: numberOfWeeks }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index * 7);
      return date.toISOString().split('T')[0];
    });
  }

  const installmentOption = product.paymentOptions.find(
    (paymentOption) => paymentOption.label === 'Weekly'
  );

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
          label: index === 0 ? 'Pay now today' : `Payment ${paymentNumber}`,
          date: getWeeklyPaymentDates(new Date(), installmentOption.weeks)[
            index
          ],
          icon: icons[index % icons.length],
        };
      })
    : [];

  return (
    <>
      <p className="font-medium mb-3 mt-4 mx-5 lg:mx-0">Weekly plan</p>
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
            {paymentWeekly.map((payment, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-24 lg:min-w-fi"
              >
                <div className="h- w-7">
                  <img
                    src={payment.icon}
                    alt={`${payment.label} payment icon`}
                    className="h-full w-full"
                  />
                </div>
                <p className="text-xs font-medium mt-1">
                  {formatCurrency(payment.amount)}
                </p>
                <span className="text-[11px] text-center">{payment.label}</span>
                {payment.date && (
                  <span className="text-[11px] text-center mt-1">
                    {payment.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};
