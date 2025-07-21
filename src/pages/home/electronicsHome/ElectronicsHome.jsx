/* eslint-disable react/react-in-jsx-scope */
import { HeroTextSection } from '../HeroTextSection';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import { ElectronicsHomeHeroBanner } from './electronicContentSection/ElectronicsHomeHeroBanner';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../../../api/product-api';
import { ElectronicsCategory } from './electronicContentSection/ElectronicsCategory';
import { useParams } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';

const ElectronicsHome = () => {
  // const electronicsSubcategories = [
  //   { name: 'Phones', link: '/electronics/phones' },
  //   { name: 'Computers', link: '/electronics/computers' },
  //   { name: 'TV', link: '/electronics/tv' },
  //   { name: 'Home Audio & Theater', link: '/electronics/audio-theater' },
  //   { name: 'Video Games', link: '/electronics/video-games' },
  //   { name: 'Gadgets', link: '/electronics/gadgets' },
  //   { name: 'House Appliances', link: '/electronics/house-appliances' },
  //   { name: 'Accessories', link: '/electronics/accessories' },
  // ];

  const { categories } = useCategories();
  return (
    <>
      <ProductCategoriesShortcut categories={categories} />

      <div className="mx-5">
        <ElectronicsHomeHeroBanner />
        <HeroTextSection />
      </div>
      <ElectronicsCategory />
      <div className="mx-5">
        <NewProductsInStore />
        <TodaysDeal />
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default ElectronicsHome;
