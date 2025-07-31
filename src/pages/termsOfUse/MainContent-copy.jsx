import { Link } from 'react-router-dom';
import { termsSections } from '../../utils/termsData';

function MainContent() {
  return (
    <div className="ml-7 w-[75%]">
      <div className="py-3 ">
        <h1>Terms of use</h1>
      </div>

      <p className="my-4">Last Updated: July 7th, 2025</p>
      <div className="mb-10">
        <ol>
          {termsSections.map((term, i) => (
            <li key={i}>
              <span>{i + 1}.</span>
              <a className="mx-2 text-blue-600 underline" href={`#${term.id}`}>
                {term.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div>
        {/* Agreement to terms */}
        <div className="my-4">
          <h2 id="agreement-to-terms">1. Agreement to terms</h2>
          <p>
            By accessing or using the SmallSmall platform (“Web and app"), you
            agree to be bound by these Terms of Use. Please read the article
            carefully. This agreement constitutes a legally binding contract
            between you (the “User”) and SmallSmall Technology Ltd. ("we", "us",
            or "our").If you do not agree with these terms, please do not use
            the web or app.
          </p>
        </div>
        {/* Who we are and what we do */}
        <div className="my-4">
          <h2 id="who-we-are-and-what-we-do">2. Who we are and what we do</h2>
          <p>
            The Smallsmall platform ( web and app ) is an online marketplace for
            the sell of goods and services on web and app offering the following
            to users:
          </p>
          <ul className="list-disc pl-6">
            <li>An online marketplace to buy and sell items, rent a home</li>
            <li>Access to exclusive product deals from partner vendors</li>
            <li>Flexible instalment payment options</li>
            <li>Safe and secure transaction processing</li>
          </ul>
          <p>
            We aim to deliver a reliable, accessible, and user-friendly
            experience.
          </p>
        </div>
        {/* Usage guidlines */}
        <div className="my-4">
          <h2>3. Usage guidlines</h2>
          <p>To maintain platform integrity, users must:</p>
          <ul className="list-disc pl-6">
            <li>Use strong, unique passwords</li>
            <li>Keep credentials private and secure</li>
            <li>Regularly update passwords</li>
            <li>Report unauthorized access immediately</li>
          </ul>
          <p>
            Be vigilant against phishing—Smallsmal will never request sensitive
            details via email
          </p>
        </div>
        {/* User conduct policy */}
        <div className="my-4">
          <h2>4. User conduct policy</h2>
          <ol className="list-[upper-alpha] pl-6">
            <li>Behaviour Expectations</li>
            <p>
              Users must act respectfully, professionally, and lawfully on the
              platform. Hate speech, discriminatory behavior, and harassment are
              strictly prohibited.
            </p>
            <li>Prohibited Conduct </li>
            <ul className="list-disc pl-6">
              <li>Harassment, impersonation, or abusive behavior</li>
              <li>Fraudulent listings or transactions</li>
              <li>Distribution of spam or phishing links</li>
              <li>Sale of illegal, counterfeit, or stolen items</li>
              <li>Violation of Nigerian laws or app policies</li>
            </ul>
            <li>Consequences</li>
          </ol>

          <p>
            Violation may result in temporary suspension or permanent account
            termination, without notice.
          </p>
        </div>

        {/* 5. Privacy and Data Protection */}
        <div className="my-4">
          <h2>5. Privacy and Data Protection</h2>
          <p>We prioritize your privacy. Data collected is used to:</p>
          <ul className="list-disc pl-6">
            <li>Improve app functionality</li>
            <li>Personalize user experience</li>
            <li>Ensure account security</li>
          </ul>
          <p>
            Your data is never sold and will only be shared as required by law.
          </p>
        </div>

        {/* 6. Pricing Policy */}
        <div className="my-4">
          <h2>6. Pricing Policy</h2>
          <ul className="list-disc pl-6">
            <li>All prices shown are final at the time of order placement.</li>
            <li>
              Vendors must honor listed prices and may not amend pricing after
              purchase confirmation.
            </li>
            <li>
              The platform is not responsible for price inaccuracies caused by
              vendor error, but complaints will be investigated promptly.
            </li>
          </ul>
        </div>

        {/* 7. Down Payment Policy */}
        <div className="my-4">
          <h2>7. Down Payment Policy</h2>
          <ol className="list-[lower-alpha] pl-6">
            <li>Maximum Down Payment Limit</li>
            <ul className="list-disc pl-6">
              <li>Buyers may pay a maximum 60% down payment at checkout.</li>
            </ul>
            <li>Flexible Options</li>
            <ul className="list-disc pl-6">
              <li>
                Vendors may choose to accept lower percentages, subject to
                product listing or promotional terms.
              </li>
            </ul>
            <li>Remaining Balance</li>
            <ul className="list-disc pl-6">
              <li>
                The remaining amount is payable via the listed instalment plan.
              </li>
            </ul>
            <li>Enforcement</li>
            <ul className="list-disc pl-6">
              <li>
                Vendors may not collect more than 60% full. Violators risk
                account penalties.
              </li>
            </ul>
            <li>Acknowledgment</li>
            <ul className="list-disc pl-6">
              <li>
                By placing a down payment, both buyers and vendors agree to
                comply with this policy.
              </li>
            </ul>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
