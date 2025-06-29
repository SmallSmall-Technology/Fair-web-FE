import { CategoryCard } from '../../homeLivingLandingPage/homeLivingContentSection/CategoryCard';
import { categories } from './ConsumerGoodsCategory';

export const PersonalCare = () => {
  return (
    <CategoryCard
      category={categories[0]}
      padding="lg:pt-10 px-4"
      width="lg:w-[30%]"
    />
  );
};
