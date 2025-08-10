import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Marketplace guidelines', href: '/' },
];

function MarketplaceGuidelines() {
  return (
    <div className="mx-[4em] my-[2em]">
      <Breadcrumb routes={routes} />
      <HelpContactCard />
    </div>
  );
}

export default MarketplaceGuidelines;
