import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { shopByFoodAndDrinksCategories } from './FoodAndDrinkCategory';

export const Beverages = () => {
  return (
    <CategoryCard
      category={shopByFoodAndDrinksCategories[2]}
      padding="px-4 py-4 lg:pt-12"
      width="lg:w-[40%]"
    />
  );
};
