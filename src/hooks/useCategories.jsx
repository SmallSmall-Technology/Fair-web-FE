import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../api/product-api';

export const useCategories = () => {
  const { data: allCategories, ...rest } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  const categories = Array.isArray(allCategories?.data?.categories)
    ? allCategories.data.categories
    : [];
  return { categories, ...rest };
};
