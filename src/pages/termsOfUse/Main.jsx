import MainContent from './MainContent';
import SideNav from './SideNav';

function Main() {
  return (
    <section className="grid md:grid-cols-4 gap-9">
      <SideNav />
      <MainContent />
    </section>
  );
}

export default Main;
