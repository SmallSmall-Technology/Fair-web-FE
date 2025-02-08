import { Outlet } from "react-router";
import Header from "../ui/components/Header/Header";

const Layout = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
