import { useNavigate } from 'react-router-dom';
import { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  getExistingCartItemById,
  setSelectedPaymentPlan,
} from './cartSlice';
import { toast } from 'react-toastify';

export const handleAddToCart = (
  dispatch,
  product,
  paymentOptions,
  selectedPaymentPlan
) => {
  if (!product) return;
  const {
    productID,
    name: productName,
    coverImage,
    price: fairAppPrice,
    quantity = 1,
  } = product;

  // Map payment options for easy access
  const paymentMap = {};
  paymentOptions.forEach((option) => {
    if (option.type) paymentMap[option.type.toLowerCase()] = option;
  });

  const newItem = {
    productID,
    productName,
    coverImage,
    quantity,
    price: fairAppPrice,
    totalPrice: fairAppPrice * quantity,
    paymentPlan: selectedPaymentPlan,
    paymentOptions: [
      {
        type: 'full',
        amount: paymentMap.full?.amount || fairAppPrice,
        totalPrice: paymentMap.full?.totalPrice || fairAppPrice,
      },
      {
        type: 'monthly',
        months: paymentMap.monthly?.months || 0,
        monthlyPayment: paymentMap.monthly?.monthlyPayment || 0,
        downPayment: paymentMap.monthly?.downPayment || 0,
        totalPrice: paymentMap.monthly?.totalPrice || fairAppPrice,
      },
      {
        type: 'weekly',
        weeks: paymentMap.weekly?.weeks || 0,
        weeklyPayment: paymentMap.weekly?.weeklyPayment || 0,
        downPayment: paymentMap.weekly?.downPayment || 0,
        totalPrice: paymentMap.weekly?.totalPrice || fairAppPrice,
      },
      {
        type: 'daily',
        days: paymentMap.daily?.days || 0,
        dailyPayment: paymentMap.daily?.dailyPayment || 0,
        downPayment: paymentMap.daily?.downPayment || 0,
        totalPrice: paymentMap.daily?.totalPrice || fairAppPrice,
      },
    ],
  };

  // Dispatch the addToCart action
  dispatch(addToCart(newItem));
};

export const AddToCart = ({ product }) => {
  const existing = useSelector(getExistingCartItemById(product?.productID));
  const dispatch = useDispatch();
  const selectedPaymentPlan = useSelector(
    (state) => state.cart.selectedPaymentPlan
  );
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    if (!product) return;

    if (!selectedPaymentPlan) {
      dispatch(setSelectedPaymentPlan('monthly'));
    }

    if (existing) {
      toast.warn('Item already in cart', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
      });
      return;
    }

    try {
      await dispatch(addToCart(product)).unwrap();
      startTransition(() => {
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
            className: 'toast-yellow',
            bodyClassName: 'm-0 p-0',
            closeButton: false,
          }
        );
      });
    } catch (error) {
      toast.error(error || 'Failed to add item to cart', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    }
  };

  return (
    <button
      className="group bg-[var(--yellow-primary)] flex items-center rounded-[20px] px-2 py-2 overflow-hidden transition-all duration-300 mb-"
      onClick={handleAddToCart}
      disabled={isPending}
    >
      <div className="flex items-center transition-all duration-300 max-w-[22px] group-hover:max-w-[120px]">
        <img
          src="/images/shopping-bag-add.svg"
          alt="Add to shopping cart"
          className="w-[18px] lg:w-5 shrink-0"
        />
        <span className="ml-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isPending ? 'Adding...' : 'Add to cart'}
        </span>
      </div>
    </button>
  );
};
