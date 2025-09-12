import { useState } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { CustomButton } from '../../../../../../utils/Button';
import { createPaystackOrder } from '../../../../../../api/orderAPI';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import { useDownOrFullPayment } from '../../../../../../hooks/useDownOrFullPayment';
import { Link } from 'react-router-dom';
// import { useValidateFullOrDownPayment } from '../../../../../hooks/useValidateFullOrDownPayment';

export const MakeDownPayment = ({ downPayment }) => {
  const mandateData = useSelector((state) => state.mandate.data);
  const items = {
    OrderID: mandateData?.master_order_id || null,
    products: [
      {
        name: 'Hisense Smart TV 55 inches',
        description: 'A 55-inch 4K UHD Smart TV with HDR and voice control',
      },
      {
        name: 'LG Refrigerator 300L',
        description:
          'Energy-efficient double-door refrigerator with smart inverter',
      },
      {
        name: 'Sony Home Theater System',
        description:
          '5.1 channel surround sound system with Bluetooth connectivity',
      },
    ],
    deliveryType: {
      type: 'STANDARD',
      price: '₦3,500',
    },
  };
  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );

  const directDebitInitiation = useSelector(
    (state) => state.fullPayment.directDebitInitiation
  );

  const dispatch = useDispatch();

  const { handlePayDownPayment, isValidating } =
    useDownOrFullPayment(downPayment);

  return (
    <section className="w-full">
      {directDebitInitiation ? (
        <section className="border rounded-md px-3 lg:px-7 pt-5  text-[#96959F] bg-white">
          <div className="pt-3">
            <img
              src="/images/check 1.svg"
              alt="Company Logo"
              className="mb-2"
            />
            <h1 className="font-bold text-[23px] text-black">
              Order Placed Successfully!
            </h1>
            <p className="py-2">Thank you for your order.</p>
            <p>
              Your down payment has been received for your order, and the direct
              debit mandate has been successfully set up which authorizes us to
              debit your monthly installments.
            </p>
          </div>

          {/* Styled horizontal line */}
          <hr className="my-4 border-t border-gray-300" />

          <div>
            <p className="text-sm font-normal mb-2">Whats next?</p>
            <ul className="text-sm flex flex-col leading-7 list-disc mx-5 md:min-w-[413px]">
              <li>
                You'll receive a confirmation email shortly with your order
                details, including the direct debit mandate details.
              </li>
              <li>
                Your order will be prepared and delivered based on the delivery
                option you selected. We’ll keep you updated on the progress of
                your order.
              </li>
            </ul>
          </div>

          <hr className="mb-4 mt-6 border-t border-gray-300" />

          <p className="leading-7 text-sm font-medium mb-3 hidden md:block">
            If you have any questions or need assistance, feel free to reach out
            to our customer support team at{' '}
            <span className="underline">
              <Link to="/">help@fairapp.ng</Link>
            </span>
          </p>
          {/* <hr className="mb-4 mt-6 border-t border-gray-300" /> */}
          <div className="md:hidden  mt-6 pb-4">
            <p className="text-black text-sm font-semibold font-outfit text-start px-2 pb-4 lg:px-6">
              SUMMARY OF YOUR PLACED ORDER!
            </p>
            <div className="rounded-xl border py-8 shadow-sm flex flex-col justify-start items-start bg-white border-[#DEDEDE] text-black">
              <div className="flex justify-between items-start px-4 lg:px-6">
                <div>
                  <p className="text-[13px] font-medium font-inter">ITEMS</p>
                  {items?.products?.map((product, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-[15px]">{product?.name}</p>
                      <p className="text-xs font-inter text-gray-600">
                        {product?.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  {items?.OrderID ? (
                    <span className="text-xs font-inter underline">
                      Order id - {items?.OrderID}
                    </span>
                  ) : (
                    <span className="text-sm font-inter">
                      Order id - 11XHDY8 N/A
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
                <p>DELIVERY ({items?.deliveryType.type})</p>
                <p>{items?.deliveryType.price}</p>
              </div>

              <div className=" text-[11px] flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
                <p>DOWNPAYMENT</p>
                <p className="font-semibold font-outfit">
                  {formatCurrency(mandateData?.first_installment_payment)}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium mb-3">
                If you have any questions or need assistance, feel free to reach
                out to our customer support team at{' '}
                <span className="underline">
                  <Link to="/">support@smallsmall.com</Link>
                </span>
              </p>
              <div className="flex  md:hidden items-center space-x-2 mt-6">
                <Link
                  to="/user-dashboard/shopping-overview/purchases"
                  className="flex items-center space-x-1  text-[#96959F]"
                >
                  <p className="font-medium text-sm underline">
                    See order details
                  </p>
                </Link>{' '}
                <span>or</span>
                <Link
                  to="/"
                  className="flex items-center space-x-1   text-[#96959F]"
                >
                  <p className="font-medium text-sm underline">
                    Continue shopping{' '}
                  </p>
                  <span>
                    <img
                      src="/images/shopping-basket 1.svg"
                      alt="shopping basket"
                    />
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 mt-6 ml-6">
              <Link
                to="/user-dashboard/shopping-overview/purchases"
                className="flex items-center space-x-1  text-[#96959F]"
              >
                <p className="font-medium text-sm underline">
                  see order details
                </p>
              </Link>{' '}
              <span>or</span>
              <Link
                to="/"
                className="flex items-center space-x-1   text-[#96959F]"
              >
                <p className="font-medium text-sm underline">
                  Continue shopping{' '}
                </p>
                <span>
                  <img
                    src="/images/shopping-basket 1.svg"
                    alt="shopping basket"
                  />
                </span>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <p
            className={`${downPaymentSuccess ? 'text-[#3DB54A]' : ''} text-sm font-outfit mb-4 font-semibold flex items-center gap-2`}
          >
            <span className="mr-1 font-normal">Step 1.</span>
            {downPaymentSuccess ? 'Complete' : 'Make your down payment'}
            {downPaymentSuccess && (
              <img src="/images/check 1.svg" alt="Check icon" />
            )}
          </p>

          {downPaymentSuccess ? (
            <div className="bg-white rounded-xl border border-[#DEDEDE] p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-start items-start">
              <p className="text-sm font-semibold font-outfit mb-4">
                DOWN PAYMENT
              </p>

              <p className="font-outfit font-semibold text-3xl mb-4">
                {formatCurrency(downPayment)}
              </p>
              <div className="w-full md:w-2/3 flex items-center gap-2">
                <p className="font-outfit font-medium">Payment Successful </p>
                <img src="/images/check 1.svg" alt="Check icon" />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-[#DEDEDE] p-4 lg:p-6 py-8 shadow-sm flex flex-col justify-center items-center">
              <p className="text-lg font-semibold font-outfit">DOWN PAYMENT</p>

              {/* Replace with <hr /> for consistency */}
              <hr className="w-full my-3 border-t border-gray-300" />

              <p className="font-inter text-sm font-normal mb-3">
                Amount to pay
              </p>
              <p className="font-outfit font-semibold text-3xl mb-4">
                {formatCurrency(downPayment)}
              </p>
              <div className="w-full md:w-2/3">
                <CustomButton
                  text={isValidating ? 'Processing...' : 'Pay now'}
                  role="button"
                  disabled={isValidating}
                  onClick={handlePayDownPayment}
                  className="md:w-2/3"
                />
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
