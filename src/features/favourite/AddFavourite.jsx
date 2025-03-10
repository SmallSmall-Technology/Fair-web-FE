import { Heart } from "lucide-react";
import { Button } from "../../utils/Button";
import { useSelector, useDispatch } from "react-redux";
import { addItemToFavourite, removeItemFromFavourite } from "./favouriteSlice";

export const AddFavourite = ({ product = {} }) => {
  const dispatch = useDispatch();
  const favourite = useSelector((state) => state.favourite.favourite);

  // Prevents the component from rendering if product is missing
  if (!product || Object.keys(product).length === 0) {
    return null;
  }

  const {
    id,
    name,
    brand,
    category,
    subcategory,
    image,
    price,
    discountPrice,
    ratings,
    noOfProductSold,
    slug,
  } = product;

  const handleAddToFavourite = () => {
    const newItem = {
      id,
      name,
      brand,
      category,
      subcategory,
      image,
      price,
      discountPrice,
      ratings,
      noOfProductSold,
      slug,
      quantity: 1,
      totalPrice: price * 1,
    };

    const isFavourite = favourite.some((item) => item.id === id);
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
        favourite.some((item) => item.id === id)
          ? "Remove from favourite"
          : "Add to favourite"
      }
      className="focus:outline-none"
    >
      <Heart
        size={18}
        cursor="pointer"
        fill={favourite.some((item) => item.id === id) ? "red" : "white"}
        aria-hidden="true"
      />
      <span className="sr-only">
        {favourite.some((item) => item.id === id)
          ? "Remove from favourite"
          : "Add to favourite"}
      </span>
    </Button>
  );
};
