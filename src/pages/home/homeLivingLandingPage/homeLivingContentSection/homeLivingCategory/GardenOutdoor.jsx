import { CategoryCard } from '../CategoryCard';
import { shopByHomeLivingCategories } from '../HomeLivingCategory';

export const GardenOutdoor = () => {
  return (
    <CategoryCard
      category={shopByHomeLivingCategories[5]}
      padding="px-4 py-4 lg:pt-12"
    />
  );
};
