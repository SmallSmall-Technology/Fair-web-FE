import { getPaymentDates } from '../../SingleProductDetailsAside';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const StickyHeaderMonthlyPayment = ({ product }) => {
  const installmentOption = product.paymentOptions.find(
    (product) => product.label === 'Monthly'
  );

  const paymentMonthly = [
    {
      amount: installmentOption.monthlyPayment,
      label: 'Pay now today',
      icon: '/images/quater-circle.svg',
    },
    {
      amount: installmentOption.monthlyPayment,
      label: '2nd Payment',
      date: getPaymentDates(new Date(), 3)[0],
      icon: '/images/half-circle.svg',
    },
    {
      amount: installmentOption.monthlyPayment,
      label: '3rd Payment',
      date: getPaymentDates(new Date(), 3)[1],
      icon: '/images/one-third-circle.svg',
    },
    {
      amount: installmentOption.monthlyPayment,
      label: 'Final Payment',
      date: getPaymentDates(new Date(), 3)[2],
      icon: '/images/full-circle.svg',
    },
  ];
  return (
    <article className="flex">
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
  );
};
