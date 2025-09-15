import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

const steps = [
  { id: 1, label: 'Checkout' },
  { id: 2, label: 'Down payment' },
  { id: 3, label: 'Direct debit setup' },
  { id: 4, label: '' },
];

export default function Stepper({ currentStep }) {
  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );

  return (
    <div className="w-full md:max-w-3xl mx-auto bg-white rounded-xl border shadow p-6 pb-12 my-4">
      <h2 className="font-semibold text-lg mb-2">Order Placing</h2>

      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isNextAfterCompleted =
            step.id === currentStep + (downPaymentSuccess ? 2 : 1);

          return (
            <div key={step.id} className="flex items-center w-full relative">
              {/* Step Circle OR Cart Icon */}
              {step.id === steps.length ? (
                <ShoppingCart size={20} className="text-gray-400" />
              ) : (
                <div
                  className={`flex items-center justify-center rounded-full z-10 transition-all duration-200
        ${isActive ? 'bg-[#3DB54A] w-2 h-2' : 'w-3 h-3'}
        ${isNextAfterCompleted ? 'bg-[#FFDE11]' : ''}
        ${isCompleted ? 'bg-[#3DB54A]' : ''}
        ${!isCompleted && !isActive && !isNextAfterCompleted ? 'bg-gray-200' : ''}
      `}
                ></div>
              )}

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-1 rounded
        ${isCompleted ? 'bg-[#3DB54A]' : ''}
        ${isActive ? 'bg-[#3DB54A]' : ''}
        ${!isCompleted && !isActive ? 'bg-gray-200' : ''}
      `}
                />
              )}

              {/* Label under circle */}
              {step.label && (
                <div className="absolute top-4  -translate-x-1/2 left-12 w-max">
                  <p className="text-[9px] font-inter">{step.label}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
