import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { usePaymentOptions } from '../../../../../hooks/usePaymentOptions';

export const StickyHeaderMonthlyPayment = ({ product }) => {
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
    <article className="flex font-inter">
      <div className="flex space-x-5 w-full">
        {paymentMonthly.map((payment, index) => (
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
                {index === 0
                  ? formatCurrency(payment.downpayment)
                  : formatCurrency(payment.amount)}
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
