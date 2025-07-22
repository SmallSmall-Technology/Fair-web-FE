import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../api/product-api';

export const useCategories = () => {
  const { data: allCategories, ...rest } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const categories = Array.isArray(allCategories?.data?.categories)
    ? allCategories.data.categories
    : [];
  return { categories, ...rest };
};
