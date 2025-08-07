import React, { useEffect, useMemo } from 'react';
import { Button } from '../../../../../utils/Button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { item_width } from '../../SingleProductDetailsAside';
import { usePaymentOptions } from '../../../../../hooks/usePaymentOptions';

export const MonthlyPayment = React.memo(
  ({
    product,
    handleScroll,
    canScrollRight,
    canScrollLeft,
    paymentMethodRef,
  }) => {
    const paymentOptions = usePaymentOptions(product);

    function getMonthlyPaymentDates(startDate, numberOfMonths) {
      return Array.from({ length: numberOfMonths }, (_, index) => {
        const date = new Date(startDate);
        date.setMonth(date.getMonth() + index);
        return date.toISOString().split('T')[0];
      });
    }

    const installmentOption = paymentOptions.find(
      (product) => product.label === 'Monthly'
    );

    const paymentMonthly = installmentOption
      ? Array.from({ length: installmentOption.months }, (_, index) => {
          const icons = [
            '/images/quater-circle.svg',
            '/images/half-circle.svg',
            '/images/one-third-circle.svg',
            '/images/full-circle.svg',
          ];
          const paymentNumber = index + 1;
          return {
            amount: installmentOption.installmentAmount,
            downpayment: installmentOption.downPayment,
            label: index === 0 ? 'Pay now today' : `Payment ${paymentNumber}`,
            date: getMonthlyPaymentDates(new Date(), installmentOption.months)[
              index
            ],
            icon: icons[index % icons.length],
          };
        })
      : [];
    return (
      <>
        <p className="font-inter font-medium mb-3 mt-4 mx-5 lg:mx-0">
          Monthly plan
        </p>
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
                    {index === 0
                      ? formatCurrency(payment.amount)
                      : formatCurrency(payment.amount)}
                  </p>

                  <span className="text-[11px] text-center">
                    {payment.label}
                  </span>
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
  }
);

// export default MonthlyPayment;
