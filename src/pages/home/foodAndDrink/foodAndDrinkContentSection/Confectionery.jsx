import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { shopByFoodAndDrinksCategories } from './FoodAndDrinkCategory';

export const Confectionery = () => {
  return (
    <CategoryCard
      category={shopByFoodAndDrinksCategories[1]}
      padding="px-4 py-4 lg:pt-12"
      width="lg:w-[30%]"
    />
  );
};
