import { ProductCategoriesShortcut } from '../../productCategories/productCategoriesShortcut/ProductCategoriesShortcut';
import { HeroTextSection } from '../HeroTextSection';
import { HomeLivingCategory } from './homeLivingContentSection/HomeLivingCategory';
import NewProductsInStore from './homeLivingContentSection/NewProductsInStore';
import TodaysDeal from './homeLivingContentSection/TodaysDeal';
import HomeLivingHeroBanner from './homeLivingContentSection/homeLivingCategory/HomeLivingHeroBanner';

const HomeLivingHome = () => {
  return (
    <>
      <ProductCategoriesShortcut />
      <div className="mx-5">
        <HomeLivingHeroBanner />
        <HeroTextSection />
      </div>
      <HomeLivingCategory />
      <div className="mx-5">
        <NewProductsInStore />
        <TodaysDeal />
      </div>
    </>
  );
};

export default HomeLivingHome;
