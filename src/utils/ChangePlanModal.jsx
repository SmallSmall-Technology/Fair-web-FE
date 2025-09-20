import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ChangePlanModal({
  isOpen,
  onClose,
  onSave,
  currentPlan = 'full',
  loading,
  plans = [
    { type: 'full', label: 'Pay in full', price: '₦245,000 One time' },
    { type: 'weekly', label: 'Weekly', price: '₦10,000 per week' },
    {
      type: 'monthly',
      label: 'Monthly',
      price: '₦100,000 per month',
      tag: 'Popular',
    },
    { type: 'daily', label: 'Daily', price: '₦2,000 per day' },
  ],
}) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);

  // Identify current and other plans dynamically
  const current = plans.find((p) => p.type === currentPlan);
  const otherPlans = plans.filter((p) => p.type !== currentPlan);

  if (!isOpen) return null;
  const cart = useSelector((state) => state.cart.cart);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] md:w-[376px] rounded-lg shadow-lg py-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* Header */}
        <div className="px-6">
          <h2 className="font-outfit text-lg font-semibold mb-2">
            Change plan
          </h2>
          <p className="text-sm mb-4">
            Change to any plan that suits your budget.
          </p>
        </div>

        <div className="bg-[#F6F6F6] h-[6px] w-full my-4"></div>
        {/* Current Plan */}
        {/* <p className="font-medium text-gray-700 mb-2">Current plan</p>
        <div className="border border-yellow-400 bg-yellow-50 rounded-md p-3 mb-5 flex justify-between items-center">
          <div>
            <p className="font-medium">{current?.label}</p>
            <p className="text-sm text-gray-600">{current?.price || ''}</p>
          </div>
          <input type="radio" checked readOnly className="accent-yellow-400" />
        </div> */}

        {/* Change To */}
        <p className="font-inter font-bold text-gray-700 mb-2 px-6">
          Change to
        </p>
        <div className="space-y-3 mb-5 px-6">
          {otherPlans.map((plan) => (
            <label
              key={plan.type}
              className={`flex justify-between items-center border border-[#737376] rounded-md p-3 cursor-pointer transition 
              ${selectedPlan === plan.type ? 'border-[#FFDE11] bg-[#FFF8CF]' : 'hover:border-gray-300'}`}
            >
              <div>
                <p className="font-inter font-medium">{plan?.label}</p>
                <p className="font-inter text-sm text-gray-500">
                  {/* {plan?.price} */}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {plan?.tag && (
                  <span className="text-xs bg-[#FFDE11] px-2 py-0.5 rounded">
                    {plan?.tag}
                  </span>
                )}
                <input
                  type="radio"
                  name="plan"
                  checked={selectedPlan === plan?.type}
                  onChange={() => setSelectedPlan(plan?.type)}
                  className="accent-[#FFDE11]"
                />
              </div>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 font-inter font-medium flex justify-between items-center">
          <button onClick={onClose} className="underline">
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedPlan)}
            className="bg-[#FFDE11] text-black font-medium px-6 py-2 rounded hover:bg-yellow-300"
          >
            {loading ? 'Saving...' : 'Save '}
          </button>
        </div>
      </div>
    </div>
  );
}
