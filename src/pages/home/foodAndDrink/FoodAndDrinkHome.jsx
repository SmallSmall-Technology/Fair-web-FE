import { HeroTextSection } from '../HeroTextSection';
import { FoodAndDrinkBanner } from './foodAndDrinkContentSection/FoodAndDrinkBanner';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { FoodAndDrinkCategory } from './foodAndDrinkContentSection/FoodAndDrinkCategory';
import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';

const FoodAndDrinkHome = () => {
  const categories = [
    { name: 'Groceries', link: '/food-drink-groceries' },
    { name: 'Confectioneries', link: '/food-drink-confectioneries' },
    { name: 'Beverages', link: '/food-drink-beverages' },
  ];
  return (
    <>
      <ProductCategoriesShortcut categories={categories} />
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
