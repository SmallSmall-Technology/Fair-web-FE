import Hero from './hero/Hero';
import GetApp from './getApp/getApp';
import Products from './landingPageProduct/Products';
import React from 'react';

const Home = () => {
  return (
    <main>
      <Hero />
      <Products />
      <GetApp />
    </main>
  );
};

export default React.memo(Home);
