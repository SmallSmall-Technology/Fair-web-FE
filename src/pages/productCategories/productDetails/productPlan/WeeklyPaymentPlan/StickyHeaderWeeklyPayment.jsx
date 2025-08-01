import { usePaymentOptions } from '../../../../../hooks/usePaymentOptions';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const StickyHeaderWeeklyPayment = ({ product }) => {
  function getWeeklyPaymentDates(startDate, numberOfWeeks) {
    return Array.from({ length: numberOfWeeks }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(date.getDate() + index * 7);
      return date.toISOString().split('T')[0];
    });
  }
  const paymentOptions = usePaymentOptions(product);

  const installmentOption = paymentOptions.find(
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
          amount: installmentOption.installmentAmount,
          downpayment: installmentOption.downPayment,
          label: index === 0 ? 'Pay now today' : `Payment ${paymentNumber}`,
          date: getWeeklyPaymentDates(new Date(), installmentOption.weeks)[
            index
          ],
          icon: icons[index % icons.length],
        };
      })
    : [];
  return (
    <article className="flex">
      <div className="flex space-x-5 w-full">
        {paymentWeekly.map((payment, index) => (
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
                <p className="text-xs font-medium mt-1">
                  {index === 0
                    ? formatCurrency(payment.downpayment)
                    : formatCurrency(payment.amount)}
                </p>
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
};
