import { Dot } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CancelPurchase } from '../CartHeader.jsx';
import { YellowButton } from '../../../utils/Button.jsx';
import { CartCoupon } from '../../../features/cart/CartCoupon.jsx';
import { formatCurrency } from '../../../utils/FormatCurrency.jsx';
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from '../../../features/cart/cartSlice.js';
import { CartFooter } from '../../cartItems/CartFooter.jsx';
import { Link } from 'react-router-dom';

export const CheckoutPaymentSummary = ({ onSubmitPaymentMethod }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = +1200;
  const subtTotal = totalCartPrice;
  const total = totalCartPrice + VAT + shippingFee;
  const cartItems = useSelector((state) => state.cart.cart);
  const InstallmentPayment = cartItems.find((item) =>
    ['monthly', 'weekly', 'daily'].includes(item.paymentPlan)
  );
  return (
    <>
      <div className=" rounded-[10px] lg:bg-[#F2F2F2] lg:py-6 px-8 h-fit">
        <div className="space-y-4">
          <div className="lg:hidden ">
            <CartCoupon />
          </div>
          <div className="flex justify-between gap-2  font-medium text-xl w-full">
            <div className="flex items-center">
              <p className="text-sm font-medium">Subtotal</p>
              <span className="flex text-sm font-medium">
                <Dot />
                {totalCartQuantity} {cart.length > 1 ? 'items' : 'item'}
              </span>
            </div>
            <p className="font-normal text-base">{formatCurrency(subtTotal)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-sm">
              VAT <span className="text-[#96959F]">7.5%</span>
            </p>
            <p className="text-right">{formatCurrency(VAT)}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium text-sm">Shipping</p>
            <p className="text-right">{formatCurrency(shippingFee)}</p>
          </div>
        </div>
        <div className="flex justify-between my-8">
          <div className=" grid-cols-1 w-full">
            <div className="border border-t-2 border-[#222224] w-full h-0 mb-5"></div>
            <div className="flex justify-between font-medium text-xl w-full mb-8 lg:mb-0">
              <p>Total</p>
              <p>{formatCurrency(total)}</p>
            </div>

            <div className="lg:hidden flex flex-col justify-center gap-5">
              {!InstallmentPayment ? (
                <YellowButton onClick={onSubmitPaymentMethod}>
                  Pay now
                </YellowButton>
              ) : (
                <Link
                  to="direct-debit-setup-1"
                  className="group relative font-semibold text-base flex items-center justify-center overflow-hidden rounded-[20px] bg-[#FFDE11] border-2 w-full mx-auto md:px-12 py-2 hover:bg-gray-50 hover:border-[#FFDE11] hover:text-black"
                >
                  Set up direct debit
                </Link>
              )}

              <div className="mx-auto">
                <CancelPurchase />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="lg:hidden">
        <CartFooter />
      </section>
    </>
  );
};
