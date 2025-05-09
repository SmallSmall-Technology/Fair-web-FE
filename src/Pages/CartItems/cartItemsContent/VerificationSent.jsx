import React from 'react';
import { CheckCircle } from 'lucide-react';

const VerificationSent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <img
          src="/images/fair-logo.svg"
          alt="Fair logo"
          className="mx-auto mb-6"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow p-6">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 w-8 h-8" />
          </div>
          <h2 className="text-lg font-semibold mb-1">Verification sent !!</h2>
          <p className="text-sm text-gray-600 mb-4">
            Your verification has been sent successfully.
          </p>
          <hr className="mb-4" />
          <div className="text-left text-sm text-gray-600 space-y-2">
            <p>Whats next?</p>
            <ul className="list-disc list-inside">
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
            <p className="mt-4">
              If you have any questions or need assistance, feel free to reach
              out to our customer support team at{' '}
              <a
                href="mailto:help@smallsmall.com"
                className="text-blue-600 underline"
              >
                help@smallsmall.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center text-sm text-gray-700 hover:underline"
          >
            Continue shopping
            <span className="ml-1">🛒</span>
          </a>
        </div>

        <footer className="mt-10 text-xs text-gray-500">
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
      </div>
    </div>
  );
};

export default VerificationSent;
