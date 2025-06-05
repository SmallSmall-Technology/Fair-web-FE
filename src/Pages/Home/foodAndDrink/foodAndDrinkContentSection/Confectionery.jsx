import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './FoodAndDrinkCategory';

export const Confectionery = () => {
  return <CategoryCard category={categories[1]} padding="px-4 py-4 lg:pt-12" />;
};
