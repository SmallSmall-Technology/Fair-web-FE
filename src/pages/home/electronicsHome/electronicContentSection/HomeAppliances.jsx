import { shopByElectronicsCategories } from './ElectronicsCategory';
import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';

export const HomeAppliances = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[3]}
      padding="py-4 px-4"
      width="lg:w-[40%]"
    />
  );
};
