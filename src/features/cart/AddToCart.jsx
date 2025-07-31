import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setSelectedPaymentPlan } from './cartSlice';
import { toast } from 'react-toastify';

export const handleAddToCart = (dispatch, product) => {
  console.log(product);
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
        type: 'full',
        amount: paymentMap.full?.amount || 0,
        totalPrice: paymentMap.full?.totalPrice || price,
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
};

export const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const selectedPaymentPlan = useSelector(
    (state) => state.cart.selectedPaymentPlan
  );
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedPaymentPlan) {
      dispatch(setSelectedPaymentPlan('full'));
    }

    try {
      startTransition(() => {
        dispatch(addItem(product));
        toast.success(
          <div className="flex items-center space-x-2 justify-between h-[42px]">
            <div className="flex space-x-1 items-center">
              <span className="font-light text-base">Item added to cart</span>
              <img src="/images/blackcheckcircle.svg" alt="icon" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-black">|</span>
              <button
                onClick={() => navigate('/cart-items')}
                className="underline text-base font-medium"
              >
                View cart
              </button>
            </div>
          </div>,
          {
            icon: false,
            type: 'success',
            className:
              'bg-[var(--yellow-primary)] text-black text-sm px-2 py-1 rounded-md min-h-0',
            bodyClassName: 'm-0 p-0',
            closeButton: false,
          }
        );
      });

      return true;
    } catch (error) {
      console.error('Add to cart failed:', error);
      return false;
    }
  };

  return (
    <button
      className="group bg-[var(--yellow-primary)] flex items-center rounded-[20px] px-2 py-2 overflow-hidden transition-all duration-300 mb-"
      onClick={handleAddToCart}
    >
      <div className="flex items-center transition-all duration-300 max-w-[22px] group-hover:max-w-[120px]">
        <img
          src="/images/shopping-bag-add.svg"
          alt="Add to shopping cart"
          className="w-[18px] lg:w-5 shrink-0"
        />
        <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add to cart
        </span>
      </div>
    </button>
  );
};
