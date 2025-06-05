import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './FoodAndDrinkCategory';

export const Grocery = () => {
  return <CategoryCard category={categories[0]} padding="px-4 py-4 lg:pt-12" />;
};
