import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';
import MultiColorDivider from '../../ui/components/MultiColorDivider';
import PageTitle from '../buyerAndVendor/PageTitle';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Buying guide', href: '/' },
];

function BuyingGuide() {
  // return <div>Refunds and Returns</div>;
  return (
    <div className="mx-[4em] my-[2em]">
      <Breadcrumb routes={routes} />
      <PageTitle title="Buying guide" />
      <MultiColorDivider />
      <HelpContactCard />
    </div>
  );
}

export default BuyingGuide;
