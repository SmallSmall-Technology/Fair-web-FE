export const LinkedAccount = ({ account }) => {
  return (
    <>
      <div className="mt- font-inter">
        <p className="font-semibold text-xl">{account.name}</p>
        <p className="font-semibold">{account.accountNumber}</p>
        <p className="text-xs text-[#737376]">{account.bank}</p>
        {/* <p>{account.type}</p> */}
        <p className="font-inter text-lg font-medium mt-6 mb-4">Transactions</p>
        <p className="font-inter  border-b w-full mb-3">Debit history</p>
        <div className="overflow-x-auto">
          <table className="w-full border-none">
            <thead>
              <tr className="text-[11px] font-medium text-[#737376]">
                <th className=" pt-2  text-left">Amount</th>
                <th className=" pt-2  text-left">Remark</th>
                <th className=" pt-2  text-left">Status</th>
                <th className=" pt-2  text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {account.transactionHistory.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50 ">
                  <td className=" py-3 border-b font-medium text-sm">
                    {transaction.amount}
                  </td>
                  <td className=" py-3 border-b font-medium text-sm">
                    {transaction.remark}
                  </td>
                  <td className=" py-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${transaction.status === 'Successful' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className=" py-3 border-b text-sm font-normal">
                    {transaction.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
