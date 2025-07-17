import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { getSelectedPaymentPlan } from '../../../features/cart/cartSlice';
import { StickyHeaderFullPayment } from '../../../pages/productCategories/productDetails/productPlan/FullPaymentPlan/StickyHeaderFullPayment';
import { StickyHeaderDailyPayment } from '../../../pages/productCategories/productDetails/productPlan/DailyPaymentPlan/StickyHeaderDailyPayment';
import { StickyHeaderWeeklyPayment } from '../../../pages/productCategories/productDetails/productPlan/WeeklyPaymentPlan/StickyHeaderWeeklyPayment';
import { StickyHeaderMonthlyPayment } from '../../../pages/productCategories/productDetails/productPlan/MonthlyPaymentPlan/StickyHeaderMonthlyPayment';

export const SingleProductStickyHeader = React.memo(
  ({ product, selectedPaymentPlan }) => {
    const [show, setShow] = useState(false);
    const setSelectedPaymentPlan = useSelector(getSelectedPaymentPlan);

    useEffect(() => {
      setShow(false);
      const timeout = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timeout);
    }, [setSelectedPaymentPlan]);

    const paymentMethodsAvailable = [
      {
        amount: product.paymentOptions[0]?.dailyPayment,
        label: 'Daily',
        icon: '/images/quater-circle.svg',
      },
      {
        amount: product.paymentOptions[1]?.weeklyPayment,
        label: 'Weekly',
        icon: '/images/half-circle.svg',
      },
      {
        amount: product.paymentOptions[2]?.monthlyPayment,
        label: 'Monthly',
        icon: '/images/one-third-circle.svg',
      },
      {
        amount: product?.price,
        label: 'Pay in full',
        icon: '/images/full-circle.svg',
      },
    ];
    return (
      <>
        <div
          className="lg:pl-40 mx-auto w-full fixed top-0 left-0 right-0 bg-white z-30 py-5 flex justify-between items-center border-b-[3px] border-bg-[var(--yellow-primary)]  pb-2 transition-all motion-safe:duration-200 lg:px-20 px-5"
          role="banner"
          aria-label="Main site navigation"
        >
          <div className="flex items-center space-x-3">
            <div className="w-[55px] h-[55px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="font-semibold">{product.name}</p>
          </div>

          <div className="hidden md:flex items-center max-w-[40%] overflow-x-scroll relative transition-all duration-500">
            <div
              className={`w-full transform transition-transform duration-500 ease-out ${show ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            >
              {selectedPaymentPlan === '' && (
                <article className="flex">
                  <div className="flex space-x-5 w-full">
                    {paymentMethodsAvailable.map((payment, index) => (
                      <div key={index} className="flex items-center space-x-2">
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
                          <span className="text-[11px] text-center">
                            {payment.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {selectedPaymentPlan === 'daily' && (
                <StickyHeaderDailyPayment product={product} />
              )}
              {selectedPaymentPlan === 'weekly' && (
                <StickyHeaderWeeklyPayment product={product} />
              )}
              {selectedPaymentPlan === 'monthly' && (
                <StickyHeaderMonthlyPayment product={product} />
              )}
              {selectedPaymentPlan === 'upfront' && (
                <StickyHeaderFullPayment product={product} />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);
