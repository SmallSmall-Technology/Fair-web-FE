import { shopByFoodAndDrinksCategories } from './FoodAndDrinkCategory';
import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';

export const Grocery = () => {
  return (
    <CategoryCard
      category={shopByFoodAndDrinksCategories[0]}
      padding="px-4 py-4 lg:pt-12"
      width="lg:w-[30%]"
    />
  );
};
