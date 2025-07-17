export const SendMoneyCard = ({
  action,
  bankName,
  accountNumber,
  amount,
  monoAccountNumber,
}) => {
  return (
    <article className="bg-white p-4 px-8 rounded-[10px] w-full lg:min-w-[377px] h-[189px] border flex flex-col items-start justify-center">
      <p className="text-[23px] font-semibold mb-2">{action}:</p>
      <p className="text-sm mb-0 font-medium">{bankName}</p>
      <p className="text-sm font-medium mb-3">{accountNumber}</p>
      <p className="text-[25px] font-semibold mb-2">{amount}</p>
      <p className="text-[25px] font-semibold mb-2">{monoAccountNumber}</p>
    </article>
  );
};
