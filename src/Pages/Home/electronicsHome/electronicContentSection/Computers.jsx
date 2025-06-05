import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ElectronicCategory';

export const Computers = () => {
  return (
    <CategoryCard
      category={categories[1]}
      padding=" md:pt-10 lg:pt-12 px-4"
      width="lg:w-[30%]"
    />
  );
};
