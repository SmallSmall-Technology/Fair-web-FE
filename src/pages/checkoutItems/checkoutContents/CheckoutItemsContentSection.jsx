import React, { useState } from 'react';
import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutItem } from './CheckoutItem.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { CartFooter } from '../../cartItems/CartFooter.jsx';
import { formatCurrency } from '../../../utils/FormatCurrency.jsx';
import { makePayment } from '../../../features/order/orderSlice.js';
import { getCartSummary } from '../../../features/cart/cartSlice.js';
import { CheckoutPaymentSummary } from './CheckoutPaymentSummary.jsx';
import { CheckoutDeliveryAddressButton } from '../../../utils/Button.jsx';
import { consolidateCartPayments } from '../../../utils/ConsolidateCartPayment.js';
import { getPaymentLabel } from '../../cartItems/cartItemsContent/CartSummary.jsx';
import { CheckoutPaymentMethod } from '../checkoutContents/CheckoutPaymentMethod.jsx';
import EditCheckoutDeliveryAddressForm from '../checkoutAddress/EditCheckoutDeliveryAddressForm.jsx';
import AddCheckoutDelieveryAddressForm from '../checkoutAddress/AddCheckoutDelieveryAddressForm.jsx';
import {
  selectCurrentAddress,
  selectedDeliveryType,
} from '../../../features/order/deliveryAddressSlice.js';
import { CheckoutDeliveryTypes } from './CheckoutDeliveryTypes.jsx';

export const CheckoutItemsContentSection = () => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [addFormIsOpen, setAddFormIsOpen] = useState(false);

  const currentDeliveryAddress = useSelector(selectCurrentAddress);
  const { data: user } = useSelector((state) => state.user);
  const { latest_address } = user;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state?.cart.cart);
  const cartPaymentPlan = cart.map(
    (item) => item?.paymentPlan || item?.selectedPaymentPlan
  );
  const isConsolidatedCart = cartPaymentPlan.every((plan) => plan !== 'full');
  const consolidatedPayments = consolidateCartPayments(cart);
  const userSelectedDeliveryType = useSelector(selectedDeliveryType);
  const shippingFee = userSelectedDeliveryType?.amount || 0;
  const cartSummary = useSelector(getCartSummary);
  const totalCartPrice = cartSummary?.subtotal || 0;
  const VAT = (7.5 / 100) * totalCartPrice;
  const downPayment = consolidatedPayments.firstPayment + VAT + shippingFee;

  const handleSubmitPaymentMethod = (values) => {
    if (values) {
      dispatch(makePayment());
      startTransition(() => {
        navigate('/cart-items/checkout/payment-success');
      });
    }
  };

  const deliveryAddress = [
    currentDeliveryAddress?.streetAddress || latest_address?.streetAddress,
    currentDeliveryAddress?.state || latest_address?.state,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <section className="grid lg:grid-cols-[60%_40%] lg:px-[76p]">
      <main className="w-full pt-8 lg:block lg:px-8">
        {/* Mobile checkout item */}
        <section className="lg:hidden">
          <CheckoutItem />
        </section>

        {/* Divider for mobile */}
        <div className="lg:hidden border border-t-2 border-[#E5E5E5] w-full h-0 my-4"></div>

        {/* Address section */}
        <div className="px-5 pt-8">
          <h2 className="mt-7 mb-3 font-medium text-[21px] lg:hidden">
            Shipping address
          </h2>
          <h2 className="mt-7 mb-3 font-medium text-[21px] hidden lg:block">
            Delivery address
          </h2>

          {/* Show current address when no form is open */}
          {!formIsOpen && !addFormIsOpen && (
            <>
              <p className="font-semibold text-base flex space-x-1 mb-6">
                {deliveryAddress || 'No delivery address'}
              </p>

              {currentDeliveryAddress || deliveryAddress ? (
                <CheckoutDeliveryAddressButton
                  onClick={() => setFormIsOpen(true)}
                >
                  Edit delivery address
                </CheckoutDeliveryAddressButton>
              ) : (
                <CheckoutDeliveryAddressButton
                  onClick={() => setAddFormIsOpen(true)}
                >
                  Add delivery address
                </CheckoutDeliveryAddressButton>
              )}
            </>
          )}
        </div>

        {/* Edit address form */}
        {formIsOpen && (
          <div className="px-5 md:px-0">
            <EditCheckoutDeliveryAddressForm
              currentDeliveryAddress={currentDeliveryAddress}
              onClose={() => setFormIsOpen(false)}
            />
          </div>
        )}

        {/* Add address form */}
        {addFormIsOpen && (
          <AddCheckoutDelieveryAddressForm
            onClose={() => setAddFormIsOpen(false)}
          />
        )}

        <section className="mt-8">
          <h2 className="font-calsans font-normal text-[21px] mb-4 mx-6 md:mx-0">
            Delivery options
          </h2>
          <CheckoutDeliveryTypes />
        </section>
        {/* Desktop payment section */}
        <section className="mt-8 hidden lg:block">
          <div className="grid font-medium mb-4">
            <h2 className="text-[21px]">Payment method</h2>
            <p className="text-[#96959F]">All transactions are secured</p>
          </div>
          <CheckoutPaymentMethod
            onSubmitPaymentMethod={handleSubmitPaymentMethod}
          />
          <CartFooter />
        </section>
      </main>

      {/* ASIDE SECTION  */}
      <aside className=" border-l-2 h-full pt-8 lg:bg-[#F2F2F2] lg:pr-[12px]">
        <p className="hidden lg:block font-semibold pl-8 pt-6">
          Review your order
        </p>
        <div className="hidden lg:block">
          <CheckoutItem />
        </div>
        {isConsolidatedCart && (
          <div className="px-6 hidden lg:block">
            <hr className="mt-8 mb-2" />
            <div className="font-inter flex justify-between items-center">
              {cart.length > 1 ? (
                <p className="font-medium">Consolidated cart</p>
              ) : (
                <p className="font-medium">Cart</p>
              )}
            </div>

            <article
              className="bg-[#FAFAFA] rounded-[12px] my-4 p-4 space-y-2 
                     h-48 overflow-y-auto scroll-smooth 
                     scrollbar-hide"
            >
              <div className="flex justify-between w-full">
                <div className="font-inter">
                  <p>First Payment</p>
                  <p className="text-[#828386]">Today</p>
                </div>
                <p className="font-calsans">{formatCurrency(+downPayment)}</p>
              </div>

              {consolidatedPayments.otherPayments.map((payment, index, arr) => (
                <div key={index} className="flex justify-between w-full">
                  <div className="font-inter">
                    <p>{getPaymentLabel(index, arr.length)}</p>
                    <p className="text-[#828386]">{payment.date}</p>
                  </div>
                  <p className="font-calsans">
                    {formatCurrency(payment.amount)}
                  </p>
                </div>
              ))}
            </article>

            <hr className="mt-8 mb-2" />
          </div>
        )}
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
