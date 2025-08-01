import React, { useState } from 'react';
import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutItem } from './CheckoutItem.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { CartFooter } from '../../cartItems/CartFooter.jsx';
import { makePayment } from '../../../features/order/orderSlice.js';
import { CheckoutPaymentSummary } from './CheckoutPaymentSummary.jsx';
import { CheckoutDeliveryAddressButton } from '../../../utils/Button.jsx';
import { selectLatestDeliveryAddress } from '../../../features/user/userSlice.js';
import { CheckoutPaymentMethod } from '../checkoutContents/CheckoutPaymentMethod.jsx';
import CheckoutDeliveryAddressForm from '../checkoutAddress/CheckoutDeliveryAddressForm.jsx';

export const CheckoutItemsContentSection = () => {
  const deliveryAddress = useSelector(selectLatestDeliveryAddress);
  const [showCheckoutDeliveryAddressForm, setShowCheckoutDeliveryAddressForm] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenCheckoutDeliveryAddressForm = () => {
    setShowCheckoutDeliveryAddressForm((show) => !show);
  };

  const handleSubmitPaymentMethod = (values) => {
    if (values) {
      dispatch(makePayment());
      startTransition(() => {
        navigate('/cart-items/checkout/payment-success');
      });
    }
  };

  // const handleDirectCreditPayment = (values) => {
  //   if (values) {
  //     dispatch(makePayment());
  //     startTransition(() => {
  //       navigate('/cart-items/checkout/payment-success');
  //     });
  //   }
  // };

  return (
    <section className="grid lg:grid-cols-[60%_40%] lg:px-[76p]">
      <main className="w-full pt-8  lg:block lg:px-8">
        <section className=" lg:hidden">
          <CheckoutItem />
        </section>

        <div className=" lg:hidden border border-t-2 border-[#E5E5E5] w-full h-0 my-4"></div>
        {deliveryAddress.length !== 0 ? (
          <div className="px-8 pt-8">
            <h2 className="mt-7 mb-3 font-medium text-[21px] lg:hidden">
              Shipping address
            </h2>
            <h2 className="mt-7 mb-3 font-medium text-[21px] hidden lg:block">
              Delivery address
            </h2>
            <p className="font-semibold text-base">{deliveryAddress}</p>
            {
              <div>
                <article className="mb-6">
                  <p className="font-semibold text-[#96959F]">
                    <deliveryAddress />
                  </p>
                </article>
                {!showCheckoutDeliveryAddressForm ? (
                  <CheckoutDeliveryAddressButton
                    onClick={handleOpenCheckoutDeliveryAddressForm}
                  >
                    Edit delivery address
                  </CheckoutDeliveryAddressButton>
                ) : (
                  <CheckoutDeliveryAddressForm
                    handleOpenCheckoutDeliveryAddressForm={
                      handleOpenCheckoutDeliveryAddressForm
                    }
                  />
                )}
              </div>
            }
          </div>
        ) : (
          <>
            <CheckoutDeliveryAddressForm
              handleOpenCheckoutDeliveryAddressForm={
                handleOpenCheckoutDeliveryAddressForm
              }
            />
          </>
        )}
        <section className="mt-8 hidden lg:block px-8">
          <div className=" grid font-medium mb-4">
            <h2 className=" text-[21px]">Payment method</h2>
            <p className=" text-[#96959F] ">All transactions are secured</p>
          </div>
          <CheckoutPaymentMethod
            onSubmitPaymentMethod={handleSubmitPaymentMethod}
          />
          <CartFooter />
        </section>
      </main>
      <aside className=" border-l-2 h-full pt-8 lg:bg-[#F2F2F2] lg:pr-[12px]">
        <p className="hidden lg:block font-semibold pl-8 pt-6">
          Review your order
        </p>
        <div className="hidden lg:block">
          <CheckoutItem />
        </div>
        <div className=" lg:hidden border border-t-2 border-[#E5E5E5] w-full h-0 my-4"></div>
        <section className=" lg:hidden">
          <CheckoutPaymentMethod
            onSubmitPaymentMethod={handleSubmitPaymentMethod}
          />
        </section>
        <div className=" lg:hidden border border-t-2 border-[#E5E5E5] w-full h-0 my-4"></div>
        <CheckoutPaymentSummary
          onSubmitPaymentMethod={handleSubmitPaymentMethod}
        />
      </aside>
    </section>
  );
};
