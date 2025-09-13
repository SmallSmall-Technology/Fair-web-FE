import React, { use } from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectMandateData } from '../../../../features/paystack/mandateSlice';
import { DirectDebitBankSetupForm } from './directDebitSetupForm/DirectDebitBankSetupForm';
import Stepper from '../../../../ui/components/Stepper';
import { CartFooter } from '../../../cartItems/CartFooter';

export const DirectDebitSetUp1 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Pull from Redux if not passed from previous page
  const mandateFromRedux = useSelector(selectMandateData);
  const mandateData = state || mandateFromRedux;

  // If no mandate data, redirect back to step 1
  React.useEffect(() => {
    if (!mandateData) {
      navigate('/cart-items/checkout/mandate/create');
    }
  }, [mandateData, navigate]);

  const downPaymentSuccess = useSelector(
    (state) => state.fullPayment.downPaymentSuccess
  );

  return (
    <div className="bg-[#FAFAFA] w-full px-4">
      <div className="w-full lg:max-w-[540px] mx-auto mb-8">
        <header className="w-full py-8 md:py-16 text-center grid md:flex justify-center md:justify-between items-center">
          <Link to="/" className="w-[149px] mb-4 md:mb-0">
            <img
              src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
              alt="Smallsmall Logo"
              loading="eager"
              className="motion-safe:transition-transform w-full"
            />
          </Link>

          {!downPaymentSuccess && (
            <Link
              to="/cart-items/checkout"
              className="bg-[#222224] text-white px-4 md:px-6 py-4 rounded-full text-xs font-medium flex justify-center items-center"
            >
              Cancel
            </Link>
          )}
        </header>

        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-[23px] font-bold font-outfit">
            {!downPaymentSuccess && 'Start your payment setup'}
            {downPaymentSuccess && 'Complete your payment setup'}
          </h2>
          {downPaymentSuccess ? (
            <p className="font-normal text-xs font-inter text-start md:text-center mx-4">
              Set up a direct debit mandate for your upcoming installments.
            </p>
          ) : (
            <p className="font-normal text-xs font-inter md:text-center text-start mx-4">
              Follow the steps below to secure your purchase and set up your
              installment payments.First, make your down payment. Then, set up a
              direct debit mandate for your upcoming installments.
            </p>
          )}
        </div>
        <Stepper currentStep={downPaymentSuccess ? 2 : 1} />
      </div>

      <section>
        <DirectDebitBankSetupForm />
      </section>
      <CartFooter />
    </div>
  );
};
