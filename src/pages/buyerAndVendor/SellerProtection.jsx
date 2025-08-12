import ColoredCard from './ColoredCard';
import ContentCard from './ContentCard';

function SellerProtection() {
  return (
    <div className="">
      <ColoredCard
        title="Seller protection"
        subtitle="Selling guide"
        color="bg-[#E6EFF3]"
      />
      <ContentCard>
        <div className="p-6 ">
          <h2 className="font-bold text-lg flex items-center mb-4">
            <span role="img" aria-label="shield" className="mr-2">
              🛡️
            </span>
            Seller Protection
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>
              <strong>Secure Transactions:</strong> Payments sent to your wallet
              until agreed dates which you can then move to your bank
            </li>
            <li>
              <strong>Fraud Prevention::</strong> AI-driven monitoring for
              suspicious buyer activity.
            </li>
            <li>
              <strong>Dispute Resolution:</strong> Dedicated team to mediate
              conflicts fairly.
            </li>
          </ul>
          <h3 className="my-4 font-bold text-lg mb-2">
            Seller’s Quick-Start Guide
          </h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>List Your Product</li>
            <li>Upload clear photos + detailed descriptions.</li>
            <li>Set pricing (hint: competitive rates attract more buyers!).</li>
            <li>Choose Your Payment Terms</li>
          </ol>
          <h3 className="my-4 font-bold text-lg mb-2">Pro Tips for Success</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Boost Visibility: Renew listings weekly for higher rankings.
            </li>
            <li>
              Reputation Matters: Fast shipping = better reviews = more sales..
            </li>
          </ol>
        </div>
      </ContentCard>
    </div>
  );
}

export default SellerProtection;
