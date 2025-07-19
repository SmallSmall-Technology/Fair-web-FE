import { CategoryCard } from '../CategoryCard';
import { shopByHomeLivingCategories } from '../HomeLivingCategory';

export const Decor = () => {
  return (
    <CategoryCard category={shopByHomeLivingCategories[0]} width="lg:w-[30%]" />
  );
};
