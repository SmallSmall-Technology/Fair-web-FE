import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ElectronicCategory';

export const Gadgets = () => {
  return <CategoryCard category={categories[5]} padding="py-4 px-4 lg:pt-8" />;
};
