import { Minus, Plus } from 'lucide-react';
import { Button } from '../../utils/Button';
import { updateCartItem } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';

export const UpdateItemQuantity = ({ productID, currentQuantity }) => {
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
    <div className="flex items-center space-x-2 lg:space-x-1">
      <Button onClick={() => handleUpdate(currentQuantity - 1)}>-</Button>
      <p className="bg-[#ECEDF1] px-4 py-2 rounded-xl">{currentQuantity}</p>
      <Button onClick={() => handleUpdate(currentQuantity + 1)}>+</Button>
    </div>
  );
};

export const UpdateItemQuantityInSingleProductPage = ({
  productID,
  currentQuantity,
}) => {
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
    <div className="flex items-center space-x-2 lg:space-x-1">
      <Button onClick={() => handleUpdate(currentQuantity - 1)}>
        <Minus />
      </Button>
      <p className="px-4 text-black font-inter text-lg">{currentQuantity}</p>
      <Button onClick={() => handleUpdate(currentQuantity + 1)}>
        <Plus />
      </Button>
    </div>
  );
};
