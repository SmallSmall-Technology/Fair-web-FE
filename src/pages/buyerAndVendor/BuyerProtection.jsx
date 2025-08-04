import ColoredCard from './ColoredCard';
import ContentCard from './ContentCard';

function BuyerProtection() {
  return (
    <div className="w-[50%]">
      <ColoredCard
        title="Buyer protection"
        color="bg-[#FFF8CF]"
        subtitle="Buying guide"
      />
      <ContentCard>
        <div className="p-6 ">
          <h2 className="font-bold text-lg flex items-center mb-4">
            <span role="img" aria-label="shield" className="mr-2">
              🛡️
            </span>
            Buyer Protection
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Guaranteed Authenticity:</strong> All products are
              verified for quality before shipping.
            </li>
            <li>
              <strong>Secure Payments:</strong> Encrypted transactions with
              fraud monitoring.
            </li>
            <li>
              <strong>Return Policy:</strong> 7-day hassle-free returns if items
              don’t meet expectations.
            </li>
          </ul>

          <h3 className="font-bold text-lg mb-2">Smart Buying Guide</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Browse & Compare:</strong> Filter by budget, brand, or
              installment plans.
            </li>
            <li>
              <strong>Choose How to Pay:</strong>
              <br />
              <span className="ml-2 block">
                <strong>Pay upfront</strong> (full amount).
                <br />
                <strong>Split costs</strong> (3/6/12-month plans at checkout).
              </span>
            </li>
            <li>
              <strong>Fast Approval:</strong> No credit checks—get approved in
              minutes.
            </li>
            <li>
              <strong>Track & Manage:</strong> Monitor orders and payments in
              your dashboard.
            </li>
          </ol>
        </div>
      </ContentCard>
    </div>
  );
}

export default BuyerProtection;
