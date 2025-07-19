import { CategoryCard } from '../CategoryCard';
import { shopByHomeLivingCategories } from '../HomeLivingCategory';

export const HomeImprovement = () => {
  return (
    <CategoryCard category={shopByHomeLivingCategories[3]} width="lg:w-[40%]" />
  );
};
