import { CategoryCard } from '../CategoryCard';
import { categories } from '../HomeLivingCategory';

export const Decor = () => {
  return <CategoryCard category={categories[0]} width="lg:w-[30%]" />;
};
