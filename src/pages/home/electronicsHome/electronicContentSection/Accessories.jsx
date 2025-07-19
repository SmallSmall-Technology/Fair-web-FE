import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { shopByElectronicsCategories } from './ElectronicsCategory';

export const Accessories = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[7]}
      padding="py-4 lg:pt-8 px-4"
    />
  );
};
