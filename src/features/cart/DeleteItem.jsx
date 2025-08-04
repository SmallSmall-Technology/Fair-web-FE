import { Button } from '../../utils/Button';
import { Trash2 } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from './cartSlice';

export const DeleteItem = ({ productID }) => {
  const dispatch = useDispatch();
  const cartSessionID =
    useSelector((state) => state.cart.sessionID) ||
    localStorage.getItem('cartSessionID');

  const handleRemoveItem = () => {
    if (productID && cartSessionID) {
      dispatch(removeFromCart({ productID, cartSessionID }));
    }
  };

  return (
    <Button
      className="underline text-sm font-normal"
      onClick={handleRemoveItem}
      aria-label="Remove item"
    >
      Remove
    </Button>
  );
};

export const DeleteItemFromCart = ({ productID }) => {
  const dispatch = useDispatch();

  const cartSessionID =
    useSelector((state) => state.cart.sessionID) ||
    localStorage.getItem('cartSessionID');

  const handleRemoveItem = () => {
    if (!productID || !cartSessionID) return;

    dispatch(removeFromCart({ productID, cartSessionID }));
  };

  return (
    <Button onClick={handleRemoveItem} aria-label="Remove item">
      <Trash2 />
    </Button>
  );
};
