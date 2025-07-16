import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DirectDebitBankSetupForm } from './DirectDebitBankSetupForm';

export const DirectDebitSetUp2 = () => {
  return (
    <>
      <header className="border-b-2 text-center flex justify-center md:justify-between items-center w-full lg:px-16 py-5">
        <Link to="/">
          <img
            src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
            alt="Smallsmall Logo"
            className="w-[149px] md:w-[200px]"
          />
        </Link>
        <Link
          to="/cart-items/checkout"
          className="bg-[#ECEDF1]  px-3 md:px-5 py-2 rounded-[5px] text-sm font-medium flex items-center border"
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
