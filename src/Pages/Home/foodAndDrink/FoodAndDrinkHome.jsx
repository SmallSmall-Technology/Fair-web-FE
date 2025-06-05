import Header from '../../../ui/components/header/Header';
import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import { HeroTextSection } from '../HeroTextSection';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { FoodAndDrinkBanner } from './foodAndDrinkContentSection/FoodAndDrinkBanner';
import { FoodAndDrinkCategory } from './foodAndDrinkContentSection/FoodAndDrinkCategory';

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
        <FoodAndDrinkCategory />
        <NewProductsInStore />
        <TodaysDeal />
      </div>
    </>
  );
};
export default FoodAndDrinkHome;
