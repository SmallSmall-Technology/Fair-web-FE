import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../../utils/Button';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  toggleProductToFavourite,
  fetchFavouriteProducts,
} from '../../api/product-api';

export const AddFavourite = ({ product }) => {
  const queryClient = useQueryClient();

  const { data: favourites = [] } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavouriteProducts,
  });

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (product?.productID) {
      setIsFavourite(favourites.some((f) => f.productID === product.productID));
    }
  }, [favourites, product]);

  const mutation = useMutation({
    mutationFn: () => toggleProductToFavourite(product.productID),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['favourites'] });

      const previousFavourites = queryClient.getQueryData(['favourites']) || [];

      const currentlyFav = previousFavourites.some(
        (f) => f.productID === product.productID
      );

      const newFavourites = currentlyFav
        ? previousFavourites.filter((f) => f.productID !== product.productID)
        : [
            ...previousFavourites,
            { productID: product.productID, productDetails: product },
          ];

      queryClient.setQueryData(['favourites'], newFavourites);

      setIsFavourite(!currentlyFav);

      return { previousFavourites, currentlyFav };
    },

    onError: (err, _variables, context) => {
      if (context?.previousFavourites) {
        queryClient.setQueryData(['favourites'], context.previousFavourites);
      }
      if (typeof context?.currentlyFav === 'boolean') {
        setIsFavourite(context.currentlyFav);
      }
    },

    onSettled: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
  });

  const handleAddToFavourite = () => {
    if (!product?.productID) return;
    if (mutation.isLoading) return;
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
