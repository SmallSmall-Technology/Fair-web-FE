import { CategoryCard } from '../CategoryCard';
import { shopByHomeLivingCategories } from '../HomeLivingCategory';

export const BedBath = () => {
  return (
    <CategoryCard
      category={shopByHomeLivingCategories[4]}
      padding="px-4 py-4"
    />
  );
};
