export const SendMoneyCard = ({
  action,
  bankName,
  accountNumber,
  amount,
  monoAccountNumber,
}) => {
  return (
    <article className="bg-white p-4 px-8 rounded-[10px] w-full lg:min-w-[377px] h-[189px] border flex flex-col items-start justify-center">
      <p className="font-outfit text-[23px] font-semibold mb-2">{action}:</p>
      <p className="font-inter text-sm mb-0 font-medium">{bankName}</p>
      <p className="font-inter text-[13px] font-semibold mb-3">
        {accountNumber}
      </p>
      <p className="font-outfit text-[25px] font-semibold mb-2">{amount}</p>
      <p className="font-outfit text-[25px] font-semibold mb-2">
        {monoAccountNumber}
      </p>
    </article>
  );
};
