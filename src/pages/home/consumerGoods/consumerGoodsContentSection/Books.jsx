import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ConsumerGoodsCategory';

export const Books = () => {
  return (
    <CategoryCard
      category={categories[8]}
      padding="lg:pt-10 px-4"
      width="lg:w-[40%]"
    />
  );
};
