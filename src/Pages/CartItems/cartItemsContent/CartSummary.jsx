import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from '../../../features/cart/cartSlice';
import { useSelector } from 'react-redux';
import { YellowButton } from '../../../utils/Button';
import { formatCurrency } from '../../../utils/FormatCurrency';

export const CartSummary = ({ onHandleCheckout }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = +1200;
  const subtTotal = totalCartPrice + VAT + shippingFee;
  return (
    <>
      <div className=" rounded-[10px] lg:bg-[#F2F2F2] py-6 lg:px-8 h-fit">
        <hr className="lg:hidden mb-8" />
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="hidden lg:flex font-medium">
              {cart.length > 1 ? 'items' : 'item'} ({totalCartQuantity}) total
            </p>
            <p className="lg:hidden font-medium">Item </p>

            <p className="text-right">{formatCurrency(totalCartPrice)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">VAT</p>
            <p className="text-right">{formatCurrency(VAT)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Shipping</p>
            <p className="text-right">{formatCurrency(shippingFee)}</p>
          </div>
        </div>
        <hr className="mt-8 mb-2" />
        <div className="flex justify-between mb-8">
          <div className="flex justify-between gap-2 lg:hidden font-medium text-xl w-full">
            <div className="flex gap-1">
              <p>Subtotal</p>
              <span>
                ({totalCartQuantity} {cart.length > 1 ? 'items' : 'item'})
              </span>
            </div>
            <p>{formatCurrency(subtTotal)}</p>
          </div>

          <div className="hidden lg:flex justify-between font-medium text-xl w-full">
            <p>Subtotal</p>
            <p>{formatCurrency(subtTotal)}</p>
          </div>
        </div>
        <div className="hidden lg:block">
          <YellowButton onClick={onHandleCheckout}>Checkout</YellowButton>
        </div>
        <div className="lg:hidden">
          <YellowButton onClick={onHandleCheckout}>Go to Checkout</YellowButton>
        </div>
      </div>
    </>
  );
};
