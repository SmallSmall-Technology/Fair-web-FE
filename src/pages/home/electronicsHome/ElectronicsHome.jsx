import { HeroTextSection } from '../HeroTextSection';
import { ElectronicsCategory } from './electronicContentSection/ElectronicsCategory';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { ElectronicsHomeHeroBanner } from './electronicContentSection/ElectronicsHomeHeroBanner';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';
import { ProductCategoriesShortcut } from '../../productCategories/productCategoriesShortcut/ProductCategoriesShortcut';

const ElectronicsHome = () => {
  return (
    <>
      <ProductCategoriesShortcut />

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
