 ';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const CartItemDailyPayment = React.memo(({ product }) => {
  function getDailyPaymentDates(startDate, numberOfDays) {
    return Array.from({ length: numberOfDays }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index * 30);
      return date.toISOString().split('T')[0];
    });
  }
  const installmentOption =
    product.paymentPlanDetails?.type === 'daily'
      ? product.paymentPlanDetails
      : null;

  const paymentDaily = installmentOption
    ? Array.from({ length: installmentOption.days }, (_, index) => {
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
        const paymentNumber = index + 1;
        return {
          amount: installmentOption.dailyPayment,
          label: index === 0 ? 'Pay now today' : `Payment ${paymentNumber}`,
          date: getDailyPaymentDates(new Date(), installmentOption.days)[index],
          icon: icons[index % icons.length],
        };
      })
    : [];

  return (
    <section className="w-full px-2">
      <p className="lg:ml-5 text-xs font-semibold mb-2 lg:mt-[-10px]">Daily</p>
      <article className="flex w-[95%] mx-auto overflow-x-auto">
        <div className="flex gap-6 ">
          {paymentDaily.map((payment, index) => (
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
