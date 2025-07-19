import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { shopByElectronicsCategories } from './ElectronicsCategory';

export const Gadgets = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[5]}
      padding="py-4 px-4 lg:pt-8"
    />
  );
};
