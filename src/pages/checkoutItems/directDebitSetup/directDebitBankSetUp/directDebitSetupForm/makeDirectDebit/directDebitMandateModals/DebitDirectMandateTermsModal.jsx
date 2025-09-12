export const DebitDirectMandateTermsModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 font-inter text-xs ">
      <div className="bg-white w-full max-w-3xl md:w-2/3 overflow-y-auto h-[90svh] flex flex-col rounded-lg shadow-lg px-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            <strong>Direct Debit</strong>
          </h2>
          <button
            onClick={onRequestClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="mb-4">
          <strong>
            This Direct Debit Terms and Conditions Agreement (“Agreement”)
          </strong>{' '}
          sets out the terms under which SmallSmall Technology Limited
          (“SmallSmall”, “we”, “our”, “us”) provides direct debit payment
          facilities to users (“you”, “your”) through our website and mobile
          platforms. These Terms should be read together with the SmallSmall
          Website Terms of Use and Privacy Policy, as well as your Direct Debit
          Request (DDR) authorization.
        </p>

        <div>
          <h3 className="font-semibold">
            <strong>
              Direct Debit & Global Standing Mandate (GSM) Consent
            </strong>
          </h3>
          <p>
            <strong>
              By authorizing a Direct Debit Request (DDR) with SmallSmall, you
              expressly consent to the application of the Central Bank of
              Nigeria’s Global Standing Instruction (GSM) Mandate.
            </strong>{' '}
            This means that, in the event of default or non-payment, SmallSmall
            (through Paystack and its partner financial institutions) may
            recover overdue amounts directly from your accounts held with any
            Nigerian bank, in accordance with the GSI guidelines. If you do not
            agree to this, you should not proceed with setting up a Direct Debit
            arrangement on the SmallSmall platform.
          </p>
        </div>

        <div className="">
          <ol className="list-decimal pl-5 space-y-4 mt-4">
            <li>
              <strong>Direct Debit Authorization</strong> <br />
              <strong>
                By submitting a Direct Debit Request on the SmallSmall website
                or mobile application, you authorize SmallSmall to debit your
                nominated account or card through our authorized payment
                gateway, Paystack, in accordance with your selected payment
                plan.
              </strong>{' '}
              Debits will occur on the agreed dates. If a debit date falls on a
              non-business day, the debit may occur on the following business
              day. Direct debit is a payment method and does not of itself
              constitute an acceptance of any arrangement to clear arrears
              unless specifically approved by SmallSmall.
            </li>

            <li>
              <strong>Use of Paystack as Payment Gateway</strong>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  All direct debit transactions on SmallSmall are securely
                  processed by Paystack Payments Limited (“Paystack”).
                </li>
                <li>
                  Paystack may collect and store your payment details (including
                  bank account or card information) for the purpose of
                  processing recurring payments.
                </li>
                <li>
                  SmallSmall does not store or retain your sensitive financial
                  information. You agree to comply with Paystack’s terms of
                  service and privacy policy, which govern the handling of your
                  payment information.
                </li>
              </ul>
            </li>

            <li>
              <strong>Data We Collect</strong> <br />
              To set up and maintain your direct debit arrangement, we may
              collect the following personal and financial information:
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Full name and contact details</li>
                <li>Email address and phone number</li>
                <li>Billing and residential address</li>
                <li>
                  Bank account or card details (collected and stored securely by
                  Paystack)
                </li>
                <li>Transaction history and payment schedule</li>
              </ul>
            </li>

            <li>
              <strong>How We Use Your Data</strong>
              <p className="mt-1">
                We process your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>To verify and process your payment instructions</li>
                <li>
                  To facilitate recurring payments in line with your DDR
                  authorization
                </li>
                <li>
                  To comply with regulatory obligations (including AML/KYC
                  requirements)
                </li>
                <li>
                  To detect and prevent fraud, misuse, or unauthorized
                  transactions
                </li>
              </ul>
            </li>

            <li>
              <strong>Data Security</strong>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  Payment data is encrypted and securely transmitted to Paystack
                  for processing.
                </li>
                <li>
                  SmallSmall does not store your sensitive debit/credit card
                  details or bank account information.
                </li>
                <li>
                  We implement appropriate technical and organizational measures
                  to safeguard your personal data.
                </li>
              </ul>
            </li>

            <li>
              <strong>Your Obligations</strong>
              <p>You must ensure that:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  Sufficient funds are available in your account on the debit
                  date.
                </li>
                <li>
                  Your bank account or card details are current and valid.
                </li>
                <li>
                  Any changes to your account or card details are communicated
                  to us at least five (5) business days before your next
                  scheduled debit.
                </li>
              </ul>
              <p className="mt-2">
                If a debit is dishonoured due to insufficient funds or invalid
                details:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  You may be charged fees by your bank or financial institution.
                </li>
                <li>
                  SmallSmall reserves the right to suspend or terminate your
                  direct debit arrangement.
                </li>
                <li>
                  You remain responsible for settling any outstanding payments.
                </li>
              </ul>
            </li>

            <li>
              <strong>Failure to Pay / Default</strong>
              <p>If you fail to meet your direct debit payment obligations:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>Service Suspension:</strong> SmallSmall may suspend
                  your access to services or products linked to your payment
                  plan until outstanding amounts are settled.
                </li>
                <li>
                  <strong>Late Payment Fees:</strong> You may incur late fees,
                  penalties, or interest as specified in your agreement with
                  SmallSmall.
                </li>
                <li>
                  <strong>Debt Recovery:</strong> Persistent default may result
                  in referral to debt recovery agencies or legal action to
                  recover the outstanding balance.
                </li>
                <li>
                  <strong>Credit Reporting:</strong> Where permitted by law,
                  your default may be reported to credit bureaus, which could
                  impact your credit profile.
                </li>
                <li>
                  <strong>Global Standing Instruction (GSI):</strong> In line
                  with the CBN GSI Mandate, SmallSmall (through Paystack and
                  partner financial institutions) reserves the right to recover
                  past-due obligations from any of your accounts across Nigerian
                  banks.
                </li>
                <li>
                  <strong>Termination:</strong> SmallSmall reserves the right to
                  terminate your direct debit arrangement and/or associated
                  services if defaults persist.
                </li>
              </ul>
            </li>

            <li>
              <strong>Changes and Cancellations</strong>
              <p>
                You may request changes to, or cancellation of, your DDR
                arrangement by contacting SmallSmall or updating your settings
                in the website/app at least five (5) business days before the
                next debit date. SmallSmall may vary these Terms by giving you
                at least fourteen (14) days’ notice.
              </p>
            </li>

            <li>
              <strong>Disputes</strong>
              <p>
                If you believe there has been an error in debiting your account,
                contact us immediately at{' '}
                <a
                  href="mailto:support@smallsmall.com.ng"
                  className="text-blue-600 underline"
                >
                  support@smallsmall.com.ng
                </a>{' '}
                or through the Help section of our website/app. We will
                investigate promptly and resolve the matter in line with
                applicable regulations. You may also contact your bank or
                financial institution directly to lodge a dispute.
              </p>
            </li>

            <li>
              <strong>Confidentiality and Privacy</strong>
              <p>
                Your personal and financial details are kept private and
                confidential in accordance with the Nigeria Data Protection Act
                (NDPA). Information may be shared with Paystack, your bank, or
                regulatory authorities only as necessary to process payments or
                comply with legal obligations. For more details, please see our{' '}
                <a href="/privacy-policy" className="text-blue-600 underline">
                  Privacy Policy
                </a>
                .
              </p>
            </li>

            <li>
              <strong>Authorization</strong>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  Acknowledge that you have read and accepted these Terms.
                </li>
                <li>
                  Confirm that you are the account holder or an authorized
                  signatory of the nominated account.
                </li>
                <li>
                  Authorize SmallSmall and Paystack to process debits from your
                  nominated account in line with your DDR.
                </li>
                <li>
                  Consent to the application of the CBN GSI Mandate for recovery
                  of any overdue obligations.
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="border-t px-6 py-4 flex justify-end">
          <button
            onClick={onRequestClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
