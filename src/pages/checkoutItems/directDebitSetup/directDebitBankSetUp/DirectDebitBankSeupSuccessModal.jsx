/* eslint-disable react/prop-types */
import { X } from 'lucide-react';
import React from 'react';

export const DirectDebitBankSeupSuccessModal = ({
  onClose,
  onGotoPurchases,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div className="absolute top-20 md:right-4">
        <div className="bg-[linear-gradient(to_bottom,#f2f2f2,_white)]  md:w-[433px] bg- rounded-2xl max-w-sm py-6 shadow-lg ">
          <div className=" flex justify-between items-center border-b pb-2 px-6">
            <h2 className="text-lg font-bold md:whitespace-nowrap">
              Direct debit setup notification
            </h2>
            <button
              className="text-gray-500 hover:text-black flex items-center gap-1"
              onClick={onClose}
              aria-label="Dismiss"
            >
              <span className="text-xs">Dismiss</span>
              <X fill="#96959F" />
            </button>
          </div>

          <div className="mt-4 px-6">
            <p className="font-semibold text-base mb-2 flex items-center">
              Order Confirmed!{' '}
              <span className="ml-1">
                <img
                  src="/images/check 1.svg"
                  alt="Check Icon"
                  className="w-4 h-4"
                />
              </span>
            </p>
            <p className="text-sm mb-4 leading-5">
              We’re pleased to inform you that your direct debit has been
              successfully approved. Your order has now been placed and is being
              processed. A confirmation email with all the details of your order
              has been sent to your registered email address.
            </p>
            <p className="text-sm leading-5">
              You can also view your confirmed order at any time by visiting the{' '}
              <span className="font-semibold">Purchase Menu</span> on your
              dashboard and check under{' '}
              <span className="font-semibold">Ongoing</span>.
            </p>
          </div>

          <button
            onClick={onGotoPurchases}
            className="bg-[var(--yellow-primary)] hover:bg-[var(--btn-hover-bg-primary)] text-black font-medium py-2 rounded-[20px] w-[90%] flex justify-center mx-auto mt-10 transition-colors"
          >
            Goto purchases
          </button>
        </div>
      </div>
    </div>
  );
};
