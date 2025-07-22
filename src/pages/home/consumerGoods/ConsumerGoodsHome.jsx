import { HeroTextSection } from '../HeroTextSection';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { ConsumerGoodsCategory } from './consumerGoodsContentSection/ConsumerGoodsCategory';
import { ConsumerGoodsHeroBanner } from './consumerGoodsContentSection/ConsumerGoodsHeroBanner';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';
import { ProductCategoriesShortcut } from '../../productCategories/productCategoriesShortcut/ProductCategoriesShortcut';

const ConsumerGoodsHome = () => {
  return (
    <>
      <ProductCategoriesShortcut />
      <div className="mx-5">
        <ConsumerGoodsHeroBanner />
        <HeroTextSection />
      </div>

      <ConsumerGoodsCategory />
      <div className="mx-5">
        <NewProductsInStore />
        <TodaysDeal />
      </div>
    </>
  );
};

export default ConsumerGoodsHome;
