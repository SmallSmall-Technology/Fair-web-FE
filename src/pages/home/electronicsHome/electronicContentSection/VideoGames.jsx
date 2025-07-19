import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { shopByElectronicsCategories } from './ElectronicsCategory';

export const VideoGames = () => {
  return (
    <CategoryCard
      category={shopByElectronicsCategories[6]}
      padding="py-4 px-4"
    />
  );
};
