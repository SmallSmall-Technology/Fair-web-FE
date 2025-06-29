import React, { lazy, Suspense } from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';
const Footer = lazy(() => import('../footer/Footer'));

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-36 lg:pt-28">
        <Outlet />
      </main>
      <Suspense>
        <footer>
          <Footer />
        </footer>
      </Suspense>
    </>
  );
};

export default Layout;
