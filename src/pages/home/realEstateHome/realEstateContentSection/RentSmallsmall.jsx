import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './RealEstateCategory';

export const RentSmallsmall = () => {
  return (
    <CategoryCard
      category={categories[0]}
      padding="px-4 py-4 lg:pt-1"
      width="lg:w-[30%]"
    />
  );
};
