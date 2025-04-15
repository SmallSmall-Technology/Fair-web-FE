import { addItem } from './cartSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const handleAddToCart = (dispatch, product, navigate) => {
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

  // toast
  //   .success
  //   <div className="flex items-center space-x-2">
  //     <span>Item added to cart</span>
  //     <span className="text-black">|</span>
  //     <button
  //       onClick={() => navigate("/cart-items")}
  //       className="underline text-sm"
  //     >
  //       View cart
  //     </button>
  //   </div>
  //   {
  //     className: "bg-[#FFDE11] text-black text-sm px-2 py-1 rounded-md min-h-0",
  //     bodyClassName: "m-0 p-0",
  //     closeButton: false,
  //   }
  //   ();
};

export const AddToCart = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-[#FFDE11] h-10 w-10 rounded-full flex justify-center focus:outline-none focus:ring-2 focus:ring-black"
      aria-label="Add to cart"
      onClick={() => handleAddToCart(dispatch, product)}
    >
      <img
        src="/images/shopping-bag-add.svg"
        alt="Add to shopping cart"
        className="w-[18.5px] lg:w-5"
      />
    </button>
  );
};
