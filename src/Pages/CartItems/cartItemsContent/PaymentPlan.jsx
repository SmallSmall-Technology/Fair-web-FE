export const PaymentPlan = ({ item }) => {
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

  const paymentsInstallment = [
    {
      amount: item.paymentOptions[1].upfrontPayment,
      label: 'Pay now today',
      icon: '/images/quater-circle.svg',
    },
    {
      amount: item.paymentOptions[1].monthlyPayment,
      label: 'Next Payment',
      date: getPaymentDates(new Date(), 3)[0],
      icon: '/images/half-circle.svg',
    },
    {
      amount: item.paymentOptions[1].monthlyPayment,
      label: '3rd Payment',
      date: getPaymentDates(new Date(), 3)[1],
      icon: '/images/one-third-circle.svg',
    },
    {
      amount: item.paymentOptions[1].monthlyPayment,
      label: 'Final Payment',
      date: getPaymentDates(new Date(), 3)[2],
      icon: '/images/full-circle.svg',
    },
  ];

  const paymentsInFull = [
    {
      amount: item.paymentOptions[0].amount,
      label: 'Pay in full today',
      date: new Date(),
      icon: '/images/full-circle.svg',
    },
  ];
  return (
    <section>
      <div
        className={`flex ${!payInFull ? 'justify-center' : 'justify-start px-4'} py-2 border md:border-0 rounded-[10px] 2xl:px-10`}
      >
        {!payInFull ? (
          <>
            <div>
              <div className="flex justify-between items-center lg:hidden px-4">
                <p className="font-medium">Payment plan</p>
                <p className="text-[10px] font-medium">Pay in 4 instalment</p>
              </div>
              <div className="flex justify-between gap-5 lg:space-x-20 xl:space-x-0 overflow-x-auto w-full px-4 ">
                {paymentsInstallment.map((payment, index) => (
                  <div key={index} className="grid">
                    <div className="flex flex-col md:flex-row items-center ">
                      <img
                        src={payment.icon}
                        alt={payment.label}
                        className="mx-auto md:mr-1 max-h-[19px]"
                      />
                      <div className="grid lg:grid xl:flex xl:justify-end">
                        <p className="text-xs mr-1 font-medium">
                          {payment.amount}
                        </p>
                        <span className="text-[11px] text-center">
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
          </>
        ) : (
          <>
            {paymentsInFull.map((payment, index) => (
              <div key={index} className="grid ">
                <p className="font-medium mb-2">Payment plan</p>
                <div className="flex flex-col gap-1 md:flex-row justify-star items-center">
                  <img
                    src={payment.icon}
                    alt={payment.label}
                    className="mx-auto md:mr-1 max-h-[19px]"
                  />
                  <div className="grid lg:grid xl:flex xl:justify-end">
                    <p className="text-xs md:mr-1 font-medium">
                      {payment.amount}
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
