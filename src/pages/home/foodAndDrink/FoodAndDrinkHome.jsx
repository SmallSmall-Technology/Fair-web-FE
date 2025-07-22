import { HeroTextSection } from '../HeroTextSection';
import { FoodAndDrinkBanner } from './foodAndDrinkContentSection/FoodAndDrinkBanner';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { FoodAndDrinkCategory } from './foodAndDrinkContentSection/FoodAndDrinkCategory';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';

import { ProductCategoriesShortcut } from '../../productCategories/productCategoriesShortcut/ProductCategoriesShortcut';

const FoodAndDrinkHome = () => {
  return (
    <>
      <ProductCategoriesShortcut />
      <div className="mx-5">
        <FoodAndDrinkBanner />
        <HeroTextSection />
      </div>
      <FoodAndDrinkCategory />
      <div className="mx-5">
        <NewProductsInStore />
        <TodaysDeal />
      </div>
    </>
  );
};
export default FoodAndDrinkHome;
