import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';
import MainContentArticle from '../../ui/components/MainContentArticle';
import MainSection from '../../ui/components/MainSection';
import MultiColorDivider from '../../ui/components/MultiColorDivider';
import SideBarNav from '../../ui/components/SideBarNav';
import PageTitle from '../buyerAndVendor/PageTitle';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Refund&Returns', href: '/' },
];

function RefundsAndReturns() {
  // return <div>Refunds and Returns</div>;
  return (
    <div className="mx-[4em] my-[2em]">
      <Breadcrumb routes={routes} />
      <PageTitle title="Refunds & Returns" />
      <MultiColorDivider />
      <MainSection>
        <SideBarNav title="Refunds and returns" />
        <MainContentArticle title="Fair refund and return policy" />
      </MainSection>
      <HelpContactCard />
    </div>
  );
}

export default RefundsAndReturns;
