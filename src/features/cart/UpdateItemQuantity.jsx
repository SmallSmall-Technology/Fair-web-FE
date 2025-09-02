import { Minus, Plus } from 'lucide-react';
import { Button } from '../../utils/Button';
import { updateCartItem } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

const UpdateItemQuantity = ({ productID, currentQuantity, variant }) => {
  const dispatch = useDispatch();

  // Get session from Redux or localStorage
  const cartSessionID =
    useSelector((state) => state.cart.sessionID) ||
    localStorage.getItem('cartSessionID');

  const handleUpdate = (newQuantity) => {
    if (!productID || !cartSessionID) return;

    // Don't allow quantity below 1
    const safeQuantity = Math.max(newQuantity, 1);

    dispatch(
      updateCartItem({
        productID,
        cartSessionID,
        quantity: safeQuantity,
      })
    );
  };

  if (variant === 'single') {
    return (
      <div className="flex items-center space-x-2 lg:space-x-1 my-2">
        <Button
          className="bg-[var(--yellow-primary)] px-2 py-2 hover:bg-[var(--btn-hover-bg-primary)] transition-all duration-300 rounded-md shadow-md"
          onClick={() => handleUpdate(currentQuantity - 1)}
        >
          <Minus />
        </Button>
        <p className="px-4 text-black font-inter text-lg">{currentQuantity}</p>
        <Button
          className="bg-[var(--yellow-primary)] px-2 py-2 hover:bg-[var(--btn-hover-bg-primary)] transition-all duration-300 rounded-md shadow-md"
          onClick={() => handleUpdate(currentQuantity + 1)}
        >
          <Plus />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 lg:space-x-1">
      <Button
        className="bg-[var(--yellow-primary)] px-2 py-1 hover:bg-[var(--btn-hover-bg-primary)] transition-all duration-300 rounded-md shadow-md"
        onClick={() => handleUpdate(currentQuantity - 1)}
      >
        -
      </Button>
      <p className="bg-[#ECEDF1] px-2 py-1 rounded-md">{currentQuantity}</p>
      <Button
        className="bg-[var(--yellow-primary)] px-2 py-1 hover:bg-[var(--btn-hover-bg-primary)] transition-all duration-300 rounded-md shadow-md"
        onClick={() => handleUpdate(currentQuantity + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default memo(UpdateItemQuantity);

/*
export const UpdateItemQuantityInSingleProductPage = memo(
  ({ productID, currentQuantity }) => {
    const dispatch = useDispatch();

    // Get session from Redux or localStorage
    const cartSessionID =
      useSelector((state) => state.cart.sessionID) ||
      localStorage.getItem('cartSessionID');

    const handleUpdate = (newQuantity) => {
      if (!productID || !cartSessionID) return;

      // Don't allow quantity below 1
      const safeQuantity = Math.max(newQuantity, 1);

      dispatch(
        updateCartItem({
          productID,
          cartSessionID,
          quantity: safeQuantity,
        })
      );
    };

    return (
      <div className="flex items-center space-x-2 lg:space-x-1 my-2">
        <Button
          className="bg-[var(--yellow-primary)] px-2 py-2 hover:bg-[var(--btn-hover-bg-primary)] transition-all duration-300 rounded-md shadow-md"
          onClick={() => handleUpdate(currentQuantity - 1)}
        >
          <Minus />
        </Button>
        <p className="px-4 text-black font-inter text-lg">{currentQuantity}</p>
        <Button
          className="bg-[var(--yellow-primary)] px-2 py-2 hover:bg-[var(--btn-hover-bg-primary)] transition-all duration-300 rounded-md shadow-md"
          onClick={() => handleUpdate(currentQuantity + 1)}
        >
          <Plus />
        </Button>
      </div>
    );
  }
);
*/
