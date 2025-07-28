import { Heart } from 'lucide-react';
import { Button } from '../../utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToFavourite, removeItemFromFavourite } from './favouriteSlice';
import { useMutation } from '@tanstack/react-query';
import { toggleProductToFavourite } from '../../api/product-api';

export const AddFavourite = ({ product }) => {
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite.favourite);
  console.log('favourite', favourite);

  const mutation = useMutation({
    mutationFn: () => toggleProductToFavourite(product.productID),
    onSuccess: (data) => {
      if (data?.isFavourite) {
        dispatch(addItemToFavourite(product));
      } else {
        dispatch(removeItemFromFavourite(product));
      }
    },
  });

  const handleAddToFavourite = () => {
    if (!product || !product.productID) return;
    mutation.mutate();
  };

  const isFavourite = favourite?.some(
    (item) => item.productID === product.productID
  );

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
