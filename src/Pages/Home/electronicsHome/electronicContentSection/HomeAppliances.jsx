import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ElectronicCategory';

export const HomeAppliances = () => {
  return (
    <CategoryCard
      category={categories[3]}
      padding="py-4 px-4"
      width="lg:w-[40%]"
    />
  );
};
