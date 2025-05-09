import { addItem } from './cartSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

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
    paymentOptions = [],
  } = product;
  console.log(product);
  const paymentMap = {};
  paymentOptions.forEach((option) => {
    if (option.type) {
      paymentMap[option.type] = option;
    }
  });

  const newItem = {
    id,
    // id: `cart-${product.id}-${getSelectedPaymentPlan}-${Date.now()}`,
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
    paymentOptions: [
      {
        type: 'upfront',
        amount: paymentMap.upfront?.amount || 0,
        totalPrice: paymentMap.upfront?.totalPrice || price,
      },
      {
        type: 'monthly',
        months: paymentMap.monthly?.months || 0,
        monthlyPayment: paymentMap.monthly?.monthlyPayment || 0,
        totalPrice: paymentMap.monthly?.totalPrice || price,
      },
      {
        type: 'weekly',
        weeks: paymentMap.weekly?.weeks || 0,
        weeklyPayment: paymentMap.weekly?.weeklyPayment || 0,
        totalPrice: paymentMap.weekly?.totalPrice || price,
      },
      {
        type: 'daily',
        days: paymentMap.daily?.days || 0,
        dailyPayment: paymentMap.daily?.dailyPayment || 0,
        totalPrice: paymentMap.daily?.totalPrice || price,
      },
    ],
  };

  dispatch(addItem(newItem));

  // console.log(newItem);
};

export const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addItem(product))
      .unwrap()
      .catch((error) => {
        console.error('Add to cart failed:', error);
      });
  };

  return (
    <button
      className="bg-[#FFDE11] h-10 w-10 rounded-full flex justify-center focus:outline-none focus:ring-2 focus:ring-black"
      aria-label="Add to cart"
      onClick={() => startTransition(() => handleAddToCart())}
    >
      <img
        src="/images/shopping-bag-add.svg"
        alt="Add to shopping cart"
        className="w-[18.5px] lg:w-5"
      />
    </button>
  );
};
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
