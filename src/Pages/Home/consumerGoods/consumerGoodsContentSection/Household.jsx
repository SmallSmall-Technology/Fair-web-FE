import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ConsumerGoodsCategory';

export const Household = () => {
  return (
    <CategoryCard category={categories[5]} padding="md:pt- lg:pt-10 px-4" />
  );
};
