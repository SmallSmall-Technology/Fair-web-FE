import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { shopByElectronicsCategories } from './ElectronicsCategory';

export const Computers = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[1]}
      padding=" md:pt-10 lg:pt-12 px-4"
      width="lg:w-[30%]"
    />
  );
};
