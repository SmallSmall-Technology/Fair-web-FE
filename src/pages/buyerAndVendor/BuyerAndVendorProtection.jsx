import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';
import BuyerProtection from './BuyerProtection';
import PageTitle from './PageTitle';
import SellerProtection from './SellerProtection';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Platform protection', href: '/' },
];

function BuyerAndVendorProtection() {
  return (
    <div className="mx-[4em] my-[2em]">
      <Breadcrumb routes={routes} />
      <PageTitle title="Platform protection" />
      <div className="flex">
        <BuyerProtection />
        <SellerProtection />
      </div>
      <HelpContactCard />
    </div>
  );
}

export default BuyerAndVendorProtection;
