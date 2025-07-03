import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ConsumerGoodsCategory';

export const Beauty = () => {
  return (
    <CategoryCard
      category={categories[1]}
      padding=" md:pt-0 lg:pt-10 px-4"
      width="lg:w-[30%]"
    />
  );
};
