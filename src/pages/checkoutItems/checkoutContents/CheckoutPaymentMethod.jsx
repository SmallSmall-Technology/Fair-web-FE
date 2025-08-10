import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { YellowButton } from '../../../utils/Button.jsx';
import { useDispatch, useSelector } from 'react-redux';

import {
  getTotalCartPrice,
  // clearCart,
} from '../../../features/cart/cartSlice.js';
import {
  createOrder,
  makePayment,
} from '../../../features/order/orderSlice.js';
import { selectLatestDeliveryAddress } from '../../../features/user/userSlice.js';
import { paymentOptionSchema } from '../../../utils/Validation.js';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatCurrency } from '../../../utils/FormatCurrency.jsx';
import { useProceedToMandate } from '../../../hooks/useProceedToMandate.jsx';

const API_URL = 'http://localhost:8002';

export const CheckoutPaymentMethod = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const cartItems = useSelector((state) => state.cart.cart);
  const onDeliveryAddress = useSelector(selectLatestDeliveryAddress);
  const handleProceedToMandate = useProceedToMandate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: { picked: '' },
    resolver: zodResolver(paymentOptionSchema),
  });

  const onSubmit = async (values) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    if (!onDeliveryAddress || onDeliveryAddress.length === 0) {
      toast.dismiss();
      toast.error('Please input your delivery address', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      return;
    }

    try {
      const enrichedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const { data: product } = await axios.get(
            `${API_URL}/products/${item.productId}`
          );
          return {
            ...item,
            name: product?.name,
            image: product?.image,
            soldBy: product?.brand,
          };
        })
      );

      if (values.picked === 'interest-free-credit') {
        const initialPayment = totalCartPrice;

        // const order = await dispatch(
        //   createOrder({ cartItems: enrichedCartItems, initialPayment })
        // ).unwrap();

        toast.info(
          `Payment plan started with ₦${initialPayment.toFixed(2)} initial payment!`,
          {
            className:
              'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
            bodyClassName: 'm-0 p-0',
            closeButton: false,
          }
        );

        navigate('/cart-items/checkout/payment-success');
      } else {
        const order = await dispatch(
          createOrder({
            cartItems: enrichedCartItems,
            initialPayment: totalCartPrice,
          })
        ).unwrap();

        setTimeout(async () => {
          await dispatch(
            makePayment({ orderId: order.id, amount: 0 })
          ).unwrap();
          await dispatch(clearCart()).unwrap();

          toast.success(
            `Payment of ₦${totalCartPrice} successful via ${values.picked}!`,
            {
              className:
                'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
              bodyClassName: 'm-0 p-0',
              closeButton: false,
            }
          );

          navigate('/cart-items/checkout/payment-success');
        }, 2000);
      }

      reset();
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.dismiss();
      toast.error('Payment failed. Please try again.', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    }
  };

  const InstallmentPayment = cartItems.find((item) =>
    ['monthly', 'weekly', 'daily'].includes(item.paymentPlan)
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-8 lg:px-0">
        <h1 className="lg:hidden text-lg font-bold mt-6 mb-3">
          Payment method
        </h1>

        <div
          role="group"
          aria-labelledby="payment-options-label"
          className="rounded-md lg:border lg:border-[#E5E5E5] mb-10"
        >
          <span id="payment-options-label" className="sr-only">
            Payment Options
          </span>

          {!InstallmentPayment ? (
            <>
              <div className="lg:px-4 py-1 lg:py-2">
                <label htmlFor="debit-card" className="text-sm">
                  <input
                    type="radio"
                    id="debit-card"
                    {...register('picked')}
                    value="debit card"
                    className="px-4 py-10 mr-2"
                  />
                  Debit card
                </label>
              </div>
              <hr className="hidden lg:block" />
              <div className="lg:px-4 py-1 lg:py-2">
                <label htmlFor="interest-free-credit" className="text-sm">
                  <input
                    type="radio"
                    id="interest-free-credit"
                    {...register('picked')}
                    value="interest-free-credit"
                    className="px-4 py-10 mr-2"
                  />
                  Smallsmall Interest Free Credit{' '}
                  <span className="text-[#96959F] text-xs">
                    (Balance: {formatCurrency(0)})
                  </span>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="lg:px-4 py-1 lg:py-2">
                <label
                  htmlFor="direct-debit"
                  className="text-sm flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="direct-debit"
                      {...register('picked')}
                      value="direct debit"
                      className="px-4 py-10 mr-2"
                      defaultChecked
                    />
                    Direct debit
                    <span className="text-xs rounded-[2px] bg-[var(--yellow-primary)] py-1 px-2">
                      Recommended
                    </span>
                  </div>
                  <img src="/images/MonoLogo.svg" alt="Mono Logo" />
                </label>
              </div>
              {/* <hr className="hidden lg:block" />
              <div className="lg:px-4 py-1 lg:py-2">
                <label htmlFor="interest-free-credit" className="text-sm">
                  <input
                    type="radio"
                    id="interest-free-credit"
                    {...register('picked')}
                    value="interest-free-credit"
                    className="px-4 py-10 mr-2"
                  />
                  Smallsmall Interest Free Credit{' '}
                  <span className="text-[#96959F] text-xs">
                    (Balance: {formatCurrency(0)})
                  </span>
                </label>
              </div> */}
            </>
          )}
        </div>

        {errors.picked && (
          <div className="text-red-500 text-xs mt-3">
            {errors.picked.message}
          </div>
        )}

        {!InstallmentPayment && (
          <div className="hidden lg:block">
            <YellowButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Pay now'}
            </YellowButton>
          </div>
        )}
      </form>
      {InstallmentPayment && (
        <section className=" grid gap-14 px-8">
          <Link to="" className=" font-normal text-sm underline">
            What is direct debit?
          </Link>

          <div className="hidden lg:block ">
            <Link
              to="mandate/create"
              disabled={isSubmitting}
              onClick={handleProceedToMandate}
              className="bg-(var-yellow-primary) group relative font-semibold text-base flex items-center justify-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)] border-2 w-full mx-auto md:px-12 py-2 hover:bg-gray-50 hover:border-bg-[var(--yellow-primary)]  hover:text-black"
            >
              Set up direct debit
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
