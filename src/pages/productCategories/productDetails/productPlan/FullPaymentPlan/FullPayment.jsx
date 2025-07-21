 ';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const FullPayment = ({ product }) => {
  const paymentsInFull = [
    {
      amount: product.amount,
      label: 'Pay in full today',
      date: new Date(),
      icon: '/images/full-circle.svg',
    },
  ];
  return (
    <>
      <p className="font-medium mb-3 mt-4 mx-5 lg:mx-0">Pay in full</p>

      {paymentsInFull.map((payment, index) => (
        <article
          className="bg-[#F2F2F2] rounded-[10px] py-5 flex flex-col justify-center lg:justify-start mx-5 lg:mx-0 relative lg:w-[80%]"
          key={index}
        >
          <div className="flex flex-col lg:flex-row gap-2 justify-between items-center px-10 w-full">
            <div className="flex gap-2 items-start mr-auto">
              <div className="h-7 w-7">
                <img
                  src={payment.icon}
                  alt="Full payment icon"
                  className="h-full w-full"
                />
              </div>
              <div className="grid">
                <p className="font-medium">{formatCurrency(product.price)}</p>
                <span className="text-[11px]">{payment.label}</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};
