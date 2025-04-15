export const PaymentPlan = () => {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const todaysDate = new Date().toLocaleDateString('en-GB', options);

  const payments = [
    {
      amount: 'N200.000',
      label: 'Pay now today',
      date: todaysDate,
      icon: '/images/half-circle.svg',
    },
    {
      amount: 'N200.000',
      label: 'Next payment',
      date: '24 Jun, 2024',
      icon: '/images/full-circle.svg',
    },
    {
      amount: 'N200.000',
      label: 'Next payment',
      date: '24 Jun, 2024',
      icon: '/images/full-circle.svg',
    },
    {
      amount: 'N200.000',
      label: 'Final payment',
      date: '24 Jun, 2024',
      icon: '/images/full-circle.svg',
    },
  ];

  return (
    <section>
      <div className="flex justify-center py-2 border md:border-0 rounded-[10px] 2xl:px-10">
        <div className="flex justify-between gap-5 lg:space-x-20 xl:space-x-0 overflow-x-auto w-full px-4 ">
          {payments.map((payment, index) => (
            <div key={index} className="grid">
              <div className="flex flex-col md:flex-row md:flex items-center">
                <img
                  src={payment.icon}
                  alt={payment.label}
                  className="mx-auto md:mr-1"
                />
                <div className="grid lg:grid xl:flex xl:justify-end">
                  <p className="text-xs mr-1 font-medium">{payment.amount}</p>
                  <span className="text-[11px] text-center ">
                    {payment.label}
                  </span>
                </div>
              </div>
              <div className="flex text-center md:flex-col md:items-end lg:hidden xl:flex ml-auto">
                {payment.date && (
                  <span className="text-[11px]">{payment.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
