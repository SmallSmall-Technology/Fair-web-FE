import Breadcrumb from '../../ui/components/Breadcrumb';
import Main from './Main';
import MainContent from './MainContent';
import SideNav from './SideNav';
import PoliciesMainContent from '../../ui/components/PoliciesMainContent';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Terms of Use', href: '/' },
];

function TermsOfUse() {
  return (
    <PoliciesMainContent>
      <Breadcrumb routes={routes} />
      <Main />
    </PoliciesMainContent>
  );
}

export default TermsOfUse;
