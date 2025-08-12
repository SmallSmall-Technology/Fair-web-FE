import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';
import PageTitle from '../buyerAndVendor/PageTitle';
import MulticolorDivider from '../../ui/components/MultiColorDivider';
import MainSection from '../../ui/components/MainSection';
import SideBarNav from '../../ui/components/SideBarNav';
import MainContentArticle from '../../ui/components/MainContentArticle';
import PoliciesMainContent from '../../ui/components/PoliciesMainContent';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Marketplace guidelines', href: '/' },
];

function MarketplaceGuidelines() {
  return (
    // <div className="md:mx-[4em] md:my-[2em]">
    <PoliciesMainContent>
      <Breadcrumb routes={routes} />
      <PageTitle title="Marketplace guidelines" />
      <MulticolorDivider />
      <MainSection>
        <SideBarNav title="Marketplace articles" />
        <MainContentArticle title="Core Principles" />
      </MainSection>
      <HelpContactCard />
    </PoliciesMainContent>
    // </div>
  );
}

export default MarketplaceGuidelines;
