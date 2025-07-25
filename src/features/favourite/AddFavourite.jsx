import { Heart } from 'lucide-react';
import { Button } from '../../utils/Button';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToFavourite, removeItemFromFavourite } from './favouriteSlice';
import { useQuery } from '@tanstack/react-query';
// import { toggleProductToFavourite } from '../../api/product-api';

export const AddFavourite = ({ product = {} }) => {
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite.favourite);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['favorite'],
  //   queryFn: () => toggleProductToFavourite(product.productID),
  // });

  // console.log(data);

  // Prevents the component from rendering if product is missing
  if (!product || Object.keys(product).length === 0) {
    return null;
  }

  const {
    productID,
    productName,
    coverImage,
    fairAppPrice,
    slug,
    minimumDownPaymentPercentage,
  } = product;

  const handleAddToFavourite = () => {
    const newItem = {
      productID,
      productName,
      coverImage,
      fairAppPrice,
      slug,
      minimumDownPaymentPercentage,
    };

    const isFavourite = favourite.some((item) => item.productID === productID);
    if (isFavourite) {
      dispatch(removeItemFromFavourite(newItem));
    } else {
      dispatch(addItemToFavourite(newItem));
    }
  };

  return (
    <Button
      onClick={handleAddToFavourite}
      aria-label={
        favourite.some((item) => item.productID === productID)
          ? 'Remove from favourite'
          : 'Add to favourite'
      }
      className="focus:outline-none"
    >
      <span className="sr-only">Add to favourite</span>
      <Heart
        size={18}
        cursor="pointer"
        fill={
          favourite.some((item) => item.productID === productID)
            ? 'red'
            : 'white'
        }
        aria-hidden="true"
      />
      <span className="sr-only">
        {favourite.some((item) => item.productID === productID)
          ? 'Remove from favourite'
          : 'Add to favourite'}
      </span>
    </Button>
  );
};
