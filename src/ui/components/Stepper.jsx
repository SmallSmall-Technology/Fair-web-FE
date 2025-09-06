import React from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

const steps = [
  { id: 1, label: 'Checkout' },
  { id: 2, label: 'Down payment' },
  { id: 3, label: 'Direct debit setup' },
  { id: 4 },
];

export default function Stepper({ currentStep }) {
  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );

  return (
    <div className="w-full md:max-w-3xl mx-auto bg-white rounded-xl shadow p-6 pb-12 my-4">
      <h2 className="font-semibold text-lg mb-2">Order Placing</h2>

      <div className="flex items-center justify-between relative pb-">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive =
            step.id === currentStep || (step.id === 2 && downPaymentSuccess);
          const isNextAfterCompleted =
            step.id === currentStep + (downPaymentSuccess ? 2 : 1);

          return (
            <div key={step.id} className="flex items-center w-full relative">
              {/* Step Circle */}
              <div
                className={`w-2 h-2 flex items-center justify-center rounded-full z-10
                  ${isActive ? 'bg-[#3DB54A] text-white w-2 h-2' : ''}
                  ${isNextAfterCompleted ? 'bg-[#FFDE11] w-4 h-4' : ''}
                  ${!isCompleted && !isActive && !isNextAfterCompleted ? 'bg-gray-200 ' : ''}
                `}
              >
                {isCompleted ? (
                  <Check size={14} />
                ) : step.id === steps.length ? (
                  <ShoppingCart size={15} className="text-gray-400 " />
                ) : null}
              </div>

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
              <div className="absolute top-4 left-1/3 -translate-x-1/2 w-max">
                <p className="text-[9px] font-inter">{step.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
