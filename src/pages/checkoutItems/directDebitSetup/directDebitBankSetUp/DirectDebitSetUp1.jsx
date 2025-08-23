import React from 'react';
import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DirectDebitBankSetupForm } from './DirectDebitBankSetupForm';
import { selectMandateData } from '../../../../features/mono/mandateSlice';

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

  return (
    <>
      <header className="font-inter border-b-2 text-center flex justify-between items-center w-full px-4 lg:px-32 py-5">
        <Link to="/" className="w-[128px] lg:w-[149px]">
          <img
            src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
            alt="Smallsmall Logo"
            className="w-full"
          />
        </Link>
        <Link
          to="/cart-items/checkout"
          className="bg-[#ECEDF1] px-3 md:px-5 py-2 rounded-[5px] text-sm font-medium flex items-center border"
        >
          <X color="#EF4237" />
          <span>Cancel Setup</span>
        </Link>
      </header>

      <section className="bg-[#FAFAFA]">
        <DirectDebitBankSetupForm />
      </section>
    </>
  );
};
