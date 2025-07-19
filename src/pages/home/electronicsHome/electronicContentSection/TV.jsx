import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { shopByElectronicsCategories } from './ElectronicsCategory';

export const TV = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[2]}
      // padding=" px-4 pb-4"
      width="lg:w-[40%]"
    />
  );
};
