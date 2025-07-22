import { Link } from 'react-router-dom';

const VerificationSent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-[490px] w-full text-center">
        <img
          src="/images/fair-logo.svg"
          alt="Smallsmall Logo"
          className="mb-8 mt-11"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-[10px] shadow p-6 mb-28">
          <div className="flex justify-start mb-4">
            <img
              src="/images/check 1.svg"
              alt="Company Logo"
              className="mb-2 "
            />
          </div>
          <h2 className="text-left text-lg font-semibold mb-1">
            Verification sent!!
          </h2>
          <p className="text-sm text-left text-[#96959F] mb-4">
            Your verification has been sent successfully.
          </p>
          <hr className="mb-4" />
          <div className="text-left text-sm text-[#96959F] space-y-2">
            <p className="mb-2">Whats next?</p>
            <ul className="list-disc pl-5 grid gap-1">
              <li>We’ll review and verify your income within 24 hours.</li>
              <li>
                Check your email for updates regarding the status of your
                verification.
              </li>
              <li>
                If your verification is successful you will gain access to Tier
                2, allowing you to purchase items in instalment valued at ₦1
                million and above.
              </li>
            </ul>
            <hr className="my-5" />

            <p className="">
              If you have any questions or need assistance, feel free to reach
              out to our customer support team at{' '}
              <a href="mailto:help@smallsmall.com" className="underline">
                help@smallsmall.com
              </a>
            </p>
          </div>
          <div className="mt-6 text-left">
            <Link to="/" className="flex items-center space-x-1 mt-6 pb-3 mb-4">
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

export default VerificationSent;
