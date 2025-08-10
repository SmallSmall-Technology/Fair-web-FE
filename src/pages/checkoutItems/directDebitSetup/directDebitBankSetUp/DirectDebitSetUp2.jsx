import { X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { DirectDebitBankSetupForm } from './DirectDebitBankSetupForm';
import { DirectDebitBankSetupFormAuthorizeConsent } from './DirectDebitBankSetupFormAuthorizeConsent';
import React from 'react';
import {
  selectMandateData,
  setMandateData,
} from '../../../../features/mono/mandateSlice';

export const DirectDebitSetUp2 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pull from Redux if not passed from previous page
  const mandateFromRedux = useSelector(selectMandateData);
  const mandateData = state || mandateFromRedux;

  const [authorized, setAuthorized] = React.useState(false);

  // If no mandate data, redirect back to step 1
  React.useEffect(() => {
    if (!mandateData) {
      navigate('/cart-items/checkout/mandate/create');
    }
  }, [mandateData, navigate]);

  // Handle bank code + account update
  const handleBankInfoSubmit = (bankCode, accountNumber) => {
    dispatch(
      setMandateData({
        ...mandateData,
        bankCode,
        accountNumber,
      })
    );
    setAuthorized(true);
  };

  return (
    <>
      <header className="border-b-2 text-center flex justify-between items-center w-full px-4 lg:px-32 py-5">
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
        {!authorized ? (
          <DirectDebitBankSetupForm
            onSubmitBankInfo={handleBankInfoSubmit} // Pass function to child
            initialBankCode={mandateData?.bankCode || ''}
            initialAccountNumber={mandateData?.accountNumber || ''}
          />
        ) : (
          <DirectDebitBankSetupFormAuthorizeConsent />
        )}
      </section>
    </>
  );
};
