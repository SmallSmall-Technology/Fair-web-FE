import React from 'react';
import { Link } from 'react-router-dom';

export const DirectDebitSetUp1 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between md:bg-[#DEDED] px-4 pt-8 md:pt-14 bg-[#FAFAFA]">
      <header className="w-[362px] md-w-[400px] lg:max-w-[448px] text-center flex justify-center md:justify-between items-center">
        <Link to="/">
          <img
            src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
            alt="Fair Logo"
            // width={120}
            height="11px"
            loading="eager"
            className="motion-safe:transition-transform"
          />
        </Link>
        <Link
          to="/cart-items/checkout"
          className="bg-[#222224] text-white px-6 py-4 rounded-full text-xs font-medium hidden md:flex hover:"
        >
          Cancel
        </Link>
      </header>
      <body>
        <div className="max-w-md mx-auto mt-10 rounded-xl border p-6 text-center shadow-sm bg-white">
          <h2 className="text-[23px] font-bold mb-1">
            Set up direct debit for your order
          </h2>
          <p className="text-xs mb- font-normal">
            Please configure your direct debit to enable secure and automatic
            payments.
          </p>
          <hr className="mt-3 mb-5" />
          <p className="text-sm mb-3">Order Amount</p>
          <p className="text-3xl font-semibold mb-4">₦200,000.00</p>

          <p className="text-xs mb-6">
            By clicking Continue, you agree to our
            <br />
            <a href="#" className=" underline font-semibold">
              Direct debit terms of use
            </a>{' '}
            and{' '}
            <a href="#" className=" underline font-semibold">
              Mono’s end-user policy
            </a>
          </p>

          <Link
            to="direct-debit-setup-2"
            className="bg-[#FFDE11] hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-md w-[331px] transition-colors duration-200"
          >
            Continue
          </Link>

          <div className="mt-4">
            <a href="#" className="text-sm text-gray-700 underline">
              What is direct debit?
            </a>
          </div>
        </div>
      </body>
      <Link
        to="/cart-items/checkout"
        className="bg-[#222224] text-white px-6 py-4 rounded-full text-xs font-medium md:hidden mt-4 hover:"
      >
        Cancel
      </Link>
      <footer className="hidden lg:flex mt-8 mb-8 text-xs text-[#222224] w-full justify-center">
        <p>
          © Smallsmall Technology 2025 &nbsp; | &nbsp;{' '}
          <a href="https://smallsmall.com" className="underline">
            smallsmall.com
          </a>{' '}
          &nbsp; | &nbsp;
          <a href="#" className="underline">
            Terms of use
          </a>{' '}
          &nbsp; | &nbsp;
          <a href="#" className="underline">
            Refunds and returns
          </a>
        </p>
      </footer>
      <footer className="lg:hidden mt-8 mb-8 text-xs text-[#222224] w-full grid ">
        <div className="flex gap-3 mb-2">
          <a href="#" className="underline">
            Refunds and returns
          </a>
          <a href="#" className="underline">
            Contact us
          </a>
          <a href="#" className="underline">
            Buying policy
          </a>
        </div>
        <hr className="my-3" />
        <div className="flex gap-5 mb-4">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of use</a>
        </div>
        <div className="flex justify-between">
          <p>© Smallsmall Technology 2025</p>
          <a href="https://smallsmall.com" className="underline">
            Smallsmall.com
          </a>
        </div>
      </footer>
    </div>
  );
};
