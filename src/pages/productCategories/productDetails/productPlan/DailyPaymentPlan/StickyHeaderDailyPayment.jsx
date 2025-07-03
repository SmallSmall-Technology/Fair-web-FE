import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { ChevronRight } from 'lucide-react';

export const StickyHeaderDailyPayment = ({ product }) => {
  const [showAll, setShowAll] = useState(false);

  const installmentOption = product.paymentOptions?.find(
    (option) => option.label === 'Daily'
  );

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

  function getDailyPaymentDates(startDate, numberOfDays) {
    return Array.from({ length: numberOfDays }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index * 30);
      return date.toISOString().split('T')[0];
    });
  }

  const paymentDaily = useMemo(() => {
    if (!installmentOption) return [];

    const dates = getDailyPaymentDates(new Date(), installmentOption.days);

    return Array.from({ length: installmentOption.days }, (_, index) => ({
      amount: installmentOption.dailyPayment,
      label: index === 0 ? 'Pay now today' : `Payment ${index + 1}`,
      date: dates[index],
      icon: icons[index % icons.length],
    }));
  }, [installmentOption]);

  const visiblePayments = showAll ? paymentDaily : paymentDaily.slice(0, 5);

  // if (!product?.paymentOptions) {
  //   return <SkeletonDailyPayment />;
  // }

  return (
    <article className="flex sticky-header">
      <div className="flex space-x-5 w-full overflow-x-auto">
        {visiblePayments.map((payment, index) => (
          <div key={index} className="flex items-center space-x-2 min-w-fit">
            <div className="w-7">
              <img
                src={payment.icon}
                alt={`${payment.label} payment icon`}
                className="h-full w-full"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-xs font-medium mt-1">
                {formatCurrency(payment.amount)}
              </p>
              <span className="text-[11px] text-center">{payment.label}</span>
            </div>
          </div>
        ))}
      </div>
      {!showAll && paymentDaily.length > 5 && (
        <button
          onClick={() => setShowAll(true)}
          className="ml-4 text-sm hover:underline"
        >
          <ChevronRight />
        </button>
      )}
    </article>
  );
};

// export const SkeletonDailyPayment = ({ count = 5 }) => {
//   return (
//     <article className="flex sticky-header">
//       <div className="flex space-x-5 w-full overflow-x-auto">
//         {Array.from({ length: count }).map((_, index) => (
//           <div
//             key={index}
//             className="flex items-center space-x-2 min-w-fit animate-pulse"
//           >
//             <div className="w-7 h-7 bg-gray-300 rounded-full" />
//             <div className="flex flex-col space-y-1">
//               <div className="w-16 h-3 bg-gray-300 rounded" />
//               <div className="w-20 h-2 bg-gray-200 rounded" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </article>
//   );
// };
