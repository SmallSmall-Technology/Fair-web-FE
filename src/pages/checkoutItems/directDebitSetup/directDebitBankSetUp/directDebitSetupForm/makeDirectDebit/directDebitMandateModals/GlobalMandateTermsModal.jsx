import React from 'react';

export const GlobalMandateTermsModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white  shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-bold">
            Global Standing Mandate Privacy Policy
          </h2>
          <button
            onClick={onRequestClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-4 overflow-y-auto text-sm  space-y-4">
          <p>
            This Global Standing Mandate Privacy Policy (“Policy”) describes how
            SmallSmall (“we,” “our,” or “us”) collects, uses, discloses, and
            safeguards your personal and financial information in relation to
            the Global Standing Order (GSM) feature for installment-based
            purchases on our Fair by SmallSmall e-commerce platform. By choosing
            the GSM payment option, you acknowledge and agree to the terms of
            this Policy and explicitly authorize us, along with our third-party
            payment service providers, to collect and process your information
            as outlined below.
          </p>
          <h3 className="font-semibold text-base">
            1. What is a Global Standing Mandate (GSM)?
          </h3>
          <p>
            A Global Standing Order (GSM) is an automated, recurring payment
            authorization mechanism. It enables us to deduct installment
            payments directly from your authorized bank account, debit card, or
            other approved payment methods in accordance with a repayment
            schedule you agree to when purchasing goods or services on our
            platform. This system may also integrate with the Global Standing
            Instruction (GSI) framework introduced by the Central Bank of
            Nigeria (CBN) to facilitate debt recovery across multiple bank
            accounts where necessary
          </p>
          <h3 className="font-semibold text-base">2. Information We Collect</h3>
          <p>
            To implement and manage the GSM process, we collect and process the
            following types of information:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <p>
              a. <strong>Personally Identifiable Information (PII)</strong>:
            </p>
            <li>Full name,</li>
            <li>Residential and billing address,</li>
            <li>Date of birth,</li>
            <li>Phone number,</li>
            <li>Email address,</li>
            <li>
              National identification numbers (e.g., NIN, BVN, voter’s card).
            </li>
            <p>
              b.
              <strong>Financial Information</strong>:
            </p>
            <li>Bank account number and name of bank</li>
            <li>Debit/credit card details</li>
            <li>GSO/GSI consent authorization</li>
            <li>Debit or credit card details (number, expiry date, CVV)</li>
            <li>Payment authorization tokens (via payment partners)</li>
            <li>Repayment history and transactional behavior.</li>
            <li>
              <p>
                c.
                <strong>Technical & Usage Data</strong>:
              </p>
              <li>IP address, device identifiers</li>
              <li>Browser type, session duration</li>
              <li>Logs related to setup or authorization of GSO</li>
              <li>Time-stamped records of payment attempts and status</li>
            </li>
          </ul>
          <h3 className="font-semibold text-base">
            3. How We Use Your Information
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Verify your identity and assess your eligibility for installment
              payments.
            </li>
            <li>
              Facilitate the secure setup and activation of a GSM with your
              financial institution or card provider.
            </li>
            <li>
              Initiate, schedule, and process recurring payment deductions.
            </li>
            <li>
              Send notifications about due dates, successful transactions, or
              failed payment attempts.
            </li>
            <li>
              Meet obligations under Anti-Money Laundering (AML) and
              Know-Your-Customer (KYC) regulations.
            </li>
            <li>
              Detect, investigate, and mitigate fraud, financial risks, or
              unauthorized transactions.
            </li>
            <li>
              Maintain accurate records for audit, accounting, and financial
              reporting purposes
            </li>
          </ul>
          <h3 className="font-semibold text-base">
            4. Lawful Basis for Processing
          </h3>
          <p>
            Our processing of your personal and financial data under the GSM
            arrangement is supported by one or more of the following legal
            grounds under the Nigeria Data Protection Act (NDPA):
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Consent: You provide explicit, informed consent during the GSM
              setup process.
            </li>
            <li>
              Contractual Necessity: We process your data to fulfill the
              repayment terms of your installment purchase.
            </li>
            <li>
              Legal Obligation: Required for compliance with financial and
              regulatory directives (e.g., from the CBN).
            </li>
            <li>
              Legitimate Interest: We have a legitimate interest in recovering
              due payments and preserving the financial integrity of our
              operations—balanced with your privacy rights.
            </li>
          </ul>
          <h3 className="font-semibold text-base">
            5. Data Sharing and Disclosure
          </h3>
          <p>
            We do not sell or lease your personal or financial data. However, we
            may share your information with trusted third parties where
            necessary, including:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Payment Processors (e.g., Paystack, Flutterwave, Interswitch) for
              secure transaction processing.
            </li>
            <li>
              Banks and Financial Institutions for executing GSM or GSI-based
              deductions.
            </li>
            <li>
              Credit Bureaus to report payment performance or verify
              creditworthiness (as permitted by law).
            </li>
            <li>
              Regulatory Authorities such as the CBN, NDPC, or law enforcement,
              when lawfully requested.
            </li>
            <li>
              Debt Recovery Agents in cases of prolonged default or unresolved
              non-payment.
            </li>
            <li>
              Technology Vendors supporting fraud detection, identity
              verification, and GSM infrastructure.
            </li>
          </ul>
          <h3 className="font-semibold text-base">6. Data Retention</h3>
          <p>
            We retain your data only for as long as necessary to fulfill the
            purposes outlined in this Policy, including:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              The duration of your repayment term and for up to six (6) years
              thereafter to comply with financial, legal, and audit obligations.
            </li>
            <li>
              Longer retention where required by applicable law, regulatory
              guidance, or pending disputes.
            </li>
          </ul>
          <h3 className="font-semibold text-base">
            7. You have the following rights under the NDPA and other applicable
            data protection regulations:
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Right to Access: Request a copy of the personal data we hold about
              you
            </li>
            <li>
              Right to Rectification: Request correction of inaccurate or
              incomplete data.
            </li>
            <li>
              Right to Withdraw Consent: Withdraw consent to GSM processing at
              any time (note: this may terminate installment eligibility).
            </li>
            <li>
              Right to Erasure: Request deletion of your data, subject to legal
              and contractual requirements.
            </li>
            <li>
              Right to Object: Object to certain processing activities where
              applicable.
            </li>
            <li>
              Right to Complain: File a complaint with the Nigeria Data
              Protection Commission (NDPC).
            </li>
          </ul>
          <p>
            To exercise your rights, contact our Data Protection Officer at:
            <a
              href="mailto:info@smallsmall.com"
              className="text-black no-underline"
            >
              info@smallsmall.com
            </a>
          </p>
          <h3 className="font-semibold text-base">8. Security Measures</h3>
          <p>
            We take your data protection seriously. To safeguard your personal
            and financial information, we implement robust technical and
            organizational measures, including:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Secure Sockets Layer (SSL) encryption for all transactions.</li>
            <li>Tokenization of sensitive financial data.</li>
            <li>
              Multi-factor authentication for account access where applicable
            </li>
            <li>Strict access controls for data handling personnel.</li>
            <li>
              Regular audits and vulnerability assessments to identify and
              mitigate security risks.
            </li>
          </ul>
          <h3 className="font-semibold text-base">9. Updates to This Policy</h3>
          <p>
            We may update this Policy from time to time to reflect changes in
            our practices, legal requirements, or platform features. We will
            notify you of material changes via email or in-app notifications.
            Your continued use of the GSM feature after such updates constitutes
            acceptance of the revised Policy.
          </p>
        </div>

        {/* Footer */}
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
