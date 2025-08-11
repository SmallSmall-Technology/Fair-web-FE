import MainContent from './MainContent';
import SideNav from './SideNav';

function Main() {
  return (
    <section className="flex flex-row">
      <SideNav />
      <MainContent />
    </section>
  );
}

export default Main;
