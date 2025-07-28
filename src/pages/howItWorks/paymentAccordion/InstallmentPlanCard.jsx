import { useState } from 'react';

export default function InstallmentPlanCard() {
  const [activeTab, setActiveTab] = useState('3');

  const plans = {
    3: {
      heading: '3 monthly payments of',
      amount: '₦57,000',
      schedule: [
        { label: 'Pay today', amount: '₦70,340' },
        { label: '4 weeks', amount: '₦57,000' },
        { label: '8 weeks', amount: '₦57,000' },
      ],
    },
    4: {
      heading: '4 monthly payments of',
      amount: '₦43,000',
      schedule: [
        { label: 'Pay today', amount: '₦60,000' },
        { label: '4 weeks', amount: '₦43,000' },
        { label: '8 weeks', amount: '₦43,000' },
        { label: '12 weeks', amount: '₦43,000' },
      ],
    },
  };

  const currentPlan = plans[activeTab];

  return (
    <div className=" absolute bottom-2 right-10   bg-black text-white p-6 rounded-xl max-w-[342px] min-h-[312px]">
      {/* Tabs */}
      <div className="flex border-b  border-white/50 mb-4 text-sm">
        <button
          onClick={() => setActiveTab('3')}
          className={`mr-4 pb-2 ${
            activeTab === '3'
              ? 'text-yellow-400 border-b-2 border-yellow-400'
              : 'text-white/70'
          }`}
        >
          Pay in 3 instalment
        </button>
        <button
          onClick={() => setActiveTab('4')}
          className={`pb-2 ${
            activeTab === '4'
              ? 'text-yellow-400 border-b-2 border-yellow-400'
              : 'text-white/70'
          }`}
        >
          Pay in 4 instalment
        </button>
      </div>

      {/* Payment Info */}
      <div className="text-yellow-400">
        <p className="text-yellow-400 text-base mb-1">{currentPlan.heading}</p>
        <p className="text-xl font-bold mb-4">{currentPlan.amount}</p>

        {/* Schedule */}
        <div className="flex gap-6 flex-wrap">
          {currentPlan.schedule.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 mx-auto rounded-full border-4 border-yellow-400 relative">
                <div className="absolute inset-0 m-auto w-3/5 h-3/5 rounded-full bg-black"></div>
              </div>
              <p className="text-yellow-400 text-sm mt-2">{item.amount}</p>
              <p className="text-xs mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
