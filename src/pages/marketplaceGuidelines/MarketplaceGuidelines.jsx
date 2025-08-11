import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';
import PageTitle from '../buyerAndVendor/PageTitle';
import MulticolorDivider from '../../ui/components/MultiColorDivider';
import MainSection from '../../ui/components/MainSection';
import SideBarNav from '../../ui/components/SideBarNav';
import MainContentArticle from '../../ui/components/MainContentArticle';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Marketplace guidelines', href: '/' },
];

function MarketplaceGuidelines() {
  return (
    <div className="mx-[4em] my-[2em]">
      <Breadcrumb routes={routes} />
      <PageTitle title="Marketplace guidelines" />
      <MulticolorDivider />
      <MainSection>
        <SideBarNav title="Marketplace articles" />
        <MainContentArticle title="Core Principles" />
      </MainSection>
      <HelpContactCard />
    </div>
  );
}

export default MarketplaceGuidelines;
