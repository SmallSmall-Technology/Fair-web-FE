import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './RealEstateCategory';

export const StaySmallsmall = () => {
  return (
    <CategoryCard
      category={categories[2]}
      padding="px-4 py-4 lg:pt-12"
      width="lg:w-[40%]"
    />
  );
};
