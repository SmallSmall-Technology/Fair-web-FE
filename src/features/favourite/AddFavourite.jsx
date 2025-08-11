import { Heart } from 'lucide-react';
import { Button } from '../../utils/Button';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  toggleProductToFavourite,
  fetchFavouriteProducts,
} from '../../api/product-api';

export const AddFavourite = ({ product }) => {
  const queryClient = useQueryClient();

  // Get favourites from cache (or fetch if not present)
  const { data: favourites = [] } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavouriteProducts,
  });

  // Local state for this product
  const [isFavourite, setIsFavourite] = useState(false);

  // Sync with query data
  useEffect(() => {
    if (product?.productID) {
      setIsFavourite(favourites.some((f) => f.productID === product.productID));
    }
  }, [favourites, product]);

  const mutation = useMutation({
    mutationFn: () => toggleProductToFavourite(product.productID),
    onSuccess: (data) => {
      if (data?.action === 'added') {
        setIsFavourite(true);
        queryClient.setQueryData(['favourites'], (old = []) => [
          ...old,
          product,
        ]);
      } else if (data?.action === 'removed') {
        setIsFavourite(false);
        queryClient.setQueryData(['favourites'], (old = []) =>
          old.filter((f) => f.productID !== product.productID)
        );
      }
    },
  });

  const handleAddToFavourite = () => {
    if (!product?.productID) return;
    mutation.mutate();
  };

  if (!product || Object.keys(product).length === 0) return null;

  return (
    <Button
      onClick={handleAddToFavourite}
      aria-label={isFavourite ? 'Remove from favourite' : 'Add to favourite'}
      className="focus:outline-none"
      disabled={mutation.isLoading}
    >
      <span className="sr-only">
        {isFavourite ? 'Remove from favourite' : 'Add to favourite'}
      </span>
      <Heart
        size={18}
        cursor="pointer"
        fill={isFavourite ? 'red' : 'white'}
        aria-hidden="true"
      />
    </Button>
  );
};
