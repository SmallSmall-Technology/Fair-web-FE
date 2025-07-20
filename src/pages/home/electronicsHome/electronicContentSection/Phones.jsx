import { shopByElectronicsCategories } from './ElectronicsCategory';
import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';

export const Phones = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[0]}
      padding="py-4 lg:pt-12 px-4"
      width="lg:w-[30%]"
    />
  );
};
