import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ConsumerGoodsCategory';

export const Health = () => {
  return (
    <CategoryCard
      category={categories[3]}
      padding="lg:pt-10 md:pt- px-4"
      width="lg:w-[40%]"
    />
  );
};
