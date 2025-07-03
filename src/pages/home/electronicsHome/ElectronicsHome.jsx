import { HeroTextSection } from '../HeroTextSection';
import { ElectronicsCategory } from './electronicContentSection/ElectronicCategory';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import { ElectronicsHomeHeroBanner } from './electronicContentSection/ElectronicsHomeHeroBanner';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';

const ElectronicsHome = () => {
  const categories = [
    { name: 'Phones', link: '/electronics/phones' },
    { name: 'Computers', link: '/electronics/computers' },
    { name: 'TV', link: '/electronics/tv' },
    { name: 'Home Audio & Theater', link: '/electronics/audio-theater' },
    { name: 'Video Games', link: '/electronics/video-games' },
    { name: 'Gadgets', link: '/electronics/gadgets' },
    { name: 'House Appliances', link: '/electronics/house-appliances' },
    { name: 'Accessories', link: '/electronics/accessories' },
  ];
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
    </>
  );
};

export default ElectronicsHome;
