import { useSelector } from 'react-redux';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { getCurrentQuantityById } from '../../../features/cart/cartSlice';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../utils/Button';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export const PaymentPlan = ({ item }) => {
  const paymentMethodRef = useRef(null);
  const currentPlan = item.paymentPlan;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const currentQuantity = useSelector(getCurrentQuantityById(item.productId));

  const updateScrollButtons = () => {
    const el = paymentMethodRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const handleScroll = (scrollAmount) => {
    const el = paymentMethodRef.current;
    if (!el) return;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = paymentMethodRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const getPaymentDates = (startDate, months) => {
    const dates = [];
    const currentDate = new Date(startDate);
    for (let i = 1; i <= months; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 30 * i);
      dates.push(
        nextDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      );
    }
    return dates;
  };

  const installmentPlan = item.paymentOptions.find(
    (option) => option.type === 'installments'
  );

  const paymentsInstallment = [
    {
      amount: installmentPlan.upfrontPayment * currentQuantity,
      label: 'Pay now today',
      icon: '/images/quater-circle.svg',
    },
    {
      amount: installmentPlan.monthlyPayment * currentQuantity,
      label: 'Next Payment',
      date: getPaymentDates(new Date(), 3)[0],
      icon: '/images/half-circle.svg',
    },
    {
      amount: installmentPlan.monthlyPayment * currentQuantity,
      label: '3rd Payment',
      date: getPaymentDates(new Date(), 3)[1],
      icon: '/images/one-third-circle.svg',
    },
    {
      amount: installmentPlan.monthlyPayment * currentQuantity,
      label: 'Final Payment',
      date: getPaymentDates(new Date(), 3)[2],
      icon: '/images/full-circle.svg',
    },
  ];

  const paymentsInFull = [
    {
      amount: item.paymentOptions[0].amount * currentQuantity,
      label: 'Pay in full today',
      date: new Date(),
      icon: '/images/full-circle.svg',
    },
  ];
  return (
    <section>
      <div
        className={`flex ${currentPlan !== 'upfront' ? 'justify-center' : 'justify-start px-4'} py-2 border md:border-0 rounded-[10px] 2xl:px-10`}
      >
        {currentPlan !== 'upfront' ? (
          <>
            <div>
              <div className="flex justify-between items-center lg:hidden px-4">
                <p className="font-medium">Payment plan</p>
                <p className="text-[10px] font-medium">Pay in 4 instalment</p>
              </div>

              <article className="flex justify-start relative w-full">
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

                <div className="grid lg:flex gap-4 lg:justify-between items-start w-full">
                  <div
                    ref={paymentMethodRef}
                    className="flex space-x-4 lg:space-x-3 w-full overflow-x-auto scrollbar-hide "
                  >
                    {paymentsInstallment.map((payment, index) => (
                      <div key={index} className="flex flex-col ">
                        <div className="flex flex-col gap-1 lg:gap-0 lg:space-x-1 md:flex-row items-center min-w-28 lg:min-w-fit">
                          <img
                            src={payment.icon}
                            alt={payment.label}
                            className="mx-auto  max-h-[19px]"
                          />
                          <div className="grid lg:grid xl:flex lg:space-x-1">
                            <p className="text-xs font-medium">
                              {formatCurrency(payment.amount)}
                            </p>
                            <span className="text-[11px] text-center">
                              {payment.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex text-center md:flex-col  lg:hidden xl:flex justify-center lg:justify-end lg:ml-auto">
                          {payment.date && (
                            <span className="text-[11px]">{payment.date}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </>
        ) : (
          <>
            {paymentsInFull.map((payment, index) => (
              <div key={index} className="grid">
                {/* <p className="font-medium mb-2">Payment plan</p> */}
                <div className="flex flex-col gap-1 md:flex-row justify-star items-center lg:pb-4 lg:pl-6">
                  <img
                    src={payment.icon}
                    alt={payment.label}
                    className="mx-auto md:mr-1 max-h-[19px]"
                  />
                  <div className="grid lg:grid xl:flex xl:justify-end">
                    <p className="text-xs md:mr-1 font-medium">
                      {formatCurrency(payment.amount)}
                    </p>
                    <span className="text-[11px] text-center">
                      {payment.label}
                    </span>
                  </div>
                </div>
                {/* <div className="flex text-center md:flex-col md:items-end lg:hidden xl:flex">
                  {payment.date && (
                    <span className="text-[11px]">{payment.date}</span>
                  )}
                </div> */}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};
