import { useState } from 'react';
import { Pagination } from '../../../../productCategories/Pagination';
// import { linkedAccounts } from '../DirectDebit/data';
// import { LinkedAccount } from '../DirectDebit/LinkedAccount';

export const CreditWallet = () => {
  const [activeTab, setActiveTab] = useState('credit_unlocked');

  const tabs = [
    { key: 'credit_unlocked', label: 'Credit unlocked' },
    { key: 'in_store_spending', label: 'In-store spending' },
  ];
  return (
    <div className="mb-6 lg:mb-0 font-inter ">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4 font-outfit">
          {' '}
          Credit wallet
        </h1>
      </div>

      <section className="grid grid-cols-1 gap-4  w-full rounded-[6px]">
        <>
          <div className="mt-4">
            <button className="cursor-pointer w-fit font-outfit border border-[#222224] bg-[#F7F7F7] rounded-[30px] p-2 px-4">
              SmallsmallCredit
            </button>
            <hr className="mt-6 mb-4" />

            <p className="text-[#737376] text-sm mb-0">Available balance</p>
            <p className="font-semibold text-[25px]">#954</p>
          </div>
          <hr className="mt-6 mb-4" />
          <p className="font-medium text-lg">Spend tracker</p>
          <p className="text-[#737376]">Total credit unlocked</p>
          <p className="font-semibold text-xl">40,000.00</p>

          <p className="font-medium">Transactions</p>
          {tabs.map((tab) => (
            <div className="flex space-x-1">
              <button
                key={tab.key}
                className={`text-sm font-medium ${
                  activeTab === tab.key
                    ? 'border-b-4 border-black'
                    : 'border-b-4 border-none text-[#737376]'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </div>
          ))}
        </>
      </section>
      <div className="mt-10 flex justify-end">
        <Pagination />
      </div>
    </div>
  );
};
