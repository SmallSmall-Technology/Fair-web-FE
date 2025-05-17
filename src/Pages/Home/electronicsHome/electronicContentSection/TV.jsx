import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ElectronicCategory';

export const TV = () => {
  return (
    <CategoryCard
      category={categories[2]}
      // padding=" px-4 pb-4"
      width="lg:w-[40%]"
    />
  );
};
