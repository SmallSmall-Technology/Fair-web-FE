import { shopByElectronicsCategories } from './ElectronicsCategory';
import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';

export const HomeAudioTheater = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[4]}
      padding="px-4 py-4"
    />
  );
};
