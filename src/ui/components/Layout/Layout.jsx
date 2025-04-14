import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="">
        <Header />
      </header>
      <main className=" pt-44 lg:pt-28">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
