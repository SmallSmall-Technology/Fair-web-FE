import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';
import PoliciesMainContent from '../../ui/components/PoliciesMainContent';
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
    <PoliciesMainContent>
      {/* <Breadcrumb routes={routes} />
      <PageTitle title="Platform protection" />
      <div className="grid md:grid-cols-2">
        <BuyerProtection />
        <SellerProtection />
      </div>
      <HelpContactCard /> */}
    </PoliciesMainContent>
  );
}

export default BuyerAndVendorProtection;
