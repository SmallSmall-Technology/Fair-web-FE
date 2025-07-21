import { Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PaymentFooter } from '../PaymentFooter';

const MonoSetupPaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-[490px] w-full text-center flex flex-col items-center justify-center">
        <img
          src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
          alt="Smallsmall Logo"
          className="mb-10 mt-11 "
        />

        <div className="flex items-center justify-center mb-8 ">
          <div className="flex items-center gap-1">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              1
            </span>
            <p className="flex items-center text-xs whitespace-nowrap">
              Bank Account{' '}
              <span>
                <Minus />
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              2
            </span>
            <p className="flex items-center text-xs whitespace-nowrap">
              Authorize consent
              <span>
                <Minus />
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-medium text-[11px] text-white bg-black px-1 lg:px-2 py-[3px] rounded-[1px]">
              3
            </span>
            <p className="text-xs whitespace-nowrap">Setup Complete</p>
          </div>
        </div>

        <div className="lg:bg-gray-50 border border-gray-200 rounded-[10px] shadow p-6 mb-28">
          <div className="flex justify-start mb-4">
            <img
              src="/images/check 1.svg"
              alt="Company Logo"
              className="mb-2 "
            />
          </div>
          <h2 className="text-left text-lg font-semibold mb-1">
            Payment successful!
          </h2>
          <p className="text-sm text-left text-[#96959F] mb-4">
            Your payment of N50.00 to initiate your direct debit has been
            successfully received.
          </p>
          <hr className="mb-4" />
          <div className="text-left text-sm text-[#96959F] space-y-2">
            <p className="mb-2">Whats next?</p>
            <ul className="list-disc pl-5 grid gap-4">
              <li>
                The approval process for direct debit from your bank typically
                takes between 1hour to 24hours.You will receive an email
                notification once your direct debit setup is approved or
                successfully completed.
              </li>
              <li>
                Once we receive your initial downpayment from your bank, we will
                commence preparing your order for delivery within the specified
                delivery timeframe.
              </li>
              <li className="mb-4">
                We will keep you informed through email and SMS at every stage
                of the process until delivery.
              </li>
            </ul>
            <hr className="py-3" />

            <p className="">
              If you have any questions or need assistance, feel free to reach
              out to our customer support team at{' '}
              <a href="mailto:help@smallsmall.com" className="underline">
                help@smallsmall.com
              </a>
            </p>
          </div>
          <div className="mt-6 text-left">
            <Link
              to="/"
              state={{ showSuccessModal: true }}
              className="flex items-center space-x-1 mt-6 pb-3 mb-4"
            >
              <p className="font-medium text-sm underline text-[#96959F]">
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
      </div>

      <PaymentFooter />
    </div>
  );
};

export default MonoSetupPaymentSuccess;
