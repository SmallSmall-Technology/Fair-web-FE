import Breadcrumb from '../../ui/components/Breadcrumb';
import HelpContactCard from '../../ui/components/HelpContactCard';
import PageTitle from '../buyerAndVendor/PageTitle';
import MulticolorDivider from '../../ui/components/MultiColorDivider';
import MainSection from '../../ui/components/MainSection';
import SideBarNav from '../../ui/components/SideBarNav';
import MainContentArticle from '../../ui/components/MainContentArticle';
import PoliciesMainContent from '../../ui/components/PoliciesMainContent';
import TopArticleCards from '../../ui/components/TopArticleCards';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Marketplace guidelines', href: '/' },
];

function MarketplaceGuidelines() {
  return (
    <PoliciesMainContent>
      <Breadcrumb routes={routes} />
      <PageTitle title="Marketplace guidelines" />
      <TopArticleCards title="Marketplace guidelines" />
      <MulticolorDivider />
      <MainSection>
        <SideBarNav title="Marketplace articles" />
        <MainContentArticle title="Core Principles" />
      </MainSection>
      <HelpContactCard />
    </PoliciesMainContent>
  );
}

export default MarketplaceGuidelines;
