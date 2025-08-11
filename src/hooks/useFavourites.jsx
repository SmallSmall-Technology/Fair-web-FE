import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setFavourites } from '../features/favourite/favouriteSlice';
import { fetchFavouriteProducts } from '../api/product-api';

export const useFavourites = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavouriteProducts,
    onSuccess: (data) => {
      dispatch(setFavourites(data || []));
    },
  });
};
