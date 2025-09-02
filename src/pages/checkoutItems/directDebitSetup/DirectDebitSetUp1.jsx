import { useSelector } from 'react-redux';
import { PaymentFooter } from './PaymentFooter';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectMandateData } from '../../../features/paystack/mandateSlice';

export const DirectDebitSetUp1 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const mandateFromRedux = useSelector(selectMandateData);
  const mandateData = state || mandateFromRedux;

  const orderAmount = mandateData ? mandateData?.consolidated_total_amount : 0;

  const handleContinue = () => {
    navigate('setup-2', { state: mandateData });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between md:bg-[#DEDED] px-4 pt-8 md:pt-14 bg-[#FAFAFA]">
      <header className="w-full lg:max-w-[448px] text-center flex justify-center md:justify-between items-center">
        <Link to="/" className="w-[149px]">
          <img
            src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
            alt="Smallsmall Logo"
            loading="eager"
            className="motion-safe:transition-transform w-full"
          />
        </Link>
        <Link
          to="/cart-items/checkout"
          className="bg-[#222224] text-white px-6 py-4 rounded-full text-xs font-medium hidden md:flex"
        >
          Cancel
        </Link>
      </header>
      <main>
        <div className="max-w-md mx-auto mt-10 rounded-xl border p-6 text-center shadow-sm bg-white">
          <h2 className="text-[23px] font-bold mb-1">
            Set up direct debit for your order
          </h2>
          <p className="text-xs font-normal">
            Please configure your direct debit to enable secure and automatic
            payments.
          </p>
          <hr className="mt-3 mb-5" />
          <p className="text-sm mb-3">Order Amount</p>
          <p className="text-3xl font-semibold mb-4">
            {formatCurrency(orderAmount)}
          </p>

          <p className="text-xs mb-6">
            By clicking Continue, you agree to our
            <br />
            <a href="#" className="underline font-semibold">
              Direct debit terms of use
            </a>{' '}
            and{' '}
            <a href="#" className="underline font-semibold">
              Mono’s end-user policy
            </a>
          </p>

          <button
            onClick={handleContinue}
            className="bg-[var(--yellow-primary)] hover:bg-yellow-500 text-black font-medium py-2 px-6 rounded-md w-[331px] transition-colors duration-200"
          >
            Continue
          </button>

          <div className="mt-4">
            <a href="#" className="text-sm text-gray-700 underline">
              What is direct debit?
            </a>
          </div>
        </div>
      </main>
      <Link
        to="/cart-items/checkout"
        className="bg-[#222224] text-white px-6 py-4 rounded-full text-xs font-medium md:hidden mt-4"
      >
        Cancel
      </Link>

      <PaymentFooter />
    </div>
  );
};
