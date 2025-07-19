import { shopByHomeLivingCategories } from '../HomeLivingCategory';
import { CategoryCard } from '../CategoryCard';

export const Kitchen = () => {
  return (
    <CategoryCard
      category={shopByHomeLivingCategories[2]}
      padding="py-4 px-4 lg:pt-12 "
      width="lg:w-[40%]"
    />
  );
};
