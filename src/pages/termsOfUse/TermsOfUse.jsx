import Breadcrumb from '../../ui/components/Breadcrumb';
import Main from './Main';
import MainContent from './MainContent';
import SideNav from './SideNav';

const routes = [
  { name: 'Fair', href: '/' },
  { name: 'Support', href: '/' },
  { name: 'Terms of Use', href: '/' },
];

function TermsOfUse() {
  return (
    <div className="mx-[4em] my-[2em]">
      <Breadcrumb routes={routes} />
      <Main />
    </div>
  );
}

export default TermsOfUse;
