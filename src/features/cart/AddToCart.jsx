import { addItem } from "./cartSlice";
import { useDispatch } from "react-redux";

export const handleAddToCart = (dispatch, product) => {
  if (!product) return;

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

  dispatch(addItem(newItem));
};

export const AddToCart = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="bg-[#FFDE11] h-10 w-10 rounded-full flex justify-center focus:outline-none focus:ring-2 focus:ring-black"
      tabIndex={0}
      aria-label="Add to cart"
      role="button"
      onClick={() => handleAddToCart(dispatch, product)}
    >
      <img
        src="/images/shopping-bag-add.svg"
        alt="Add to shopping cart"
        className="w-5"
      />
    </div>
  );
};
