import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  lazy,
  startTransition,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { YellowButton } from '../../../../utils/Button';
import { FullPayment } from './FullPaymentPlan/FullPayment';
import { DailyPayment } from './DailyPaymentPlan/DailyPayment';
import { WeeklyPayment } from './WeeklyPaymentPlan/WeeklyPayment';
import { formatCurrency } from '../../../../utils/FormatCurrency';
import { handleAddToCart } from '../../../../features/cart/AddToCart';
import {
  getSelectedPaymentPlan,
  setSelectedPaymentPlan,
} from '../../../../features/cart/cartSlice';

const MonthlyPayment = lazy(
  () => import('./MonthlyPaymentPlan/MonthlyPayment')
);

export const PaymentOptions = React.memo(({ product }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const dispatch = useDispatch();
  const selectedPaymentPlan = useSelector(getSelectedPaymentPlan);
  const paymentMethodRef = useRef(null);

  if (!product) return <div>Product not found</div>;

  const updateScrollButtons = () => {
    const el = paymentMethodRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const handleScroll = (scrollAmount) => {
    const el = paymentMethodRef.current;
    if (!el) return;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handlePlanChange = (type) => {
    startTransition(() => {
      dispatch(setSelectedPaymentPlan(type));
    });
  };

  useEffect(() => {
    const el = paymentMethodRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const renderSelectedPayment = () => {
    const props = {
      product,
      handleScroll,
      canScrollRight,
      canScrollLeft,
      paymentMethodRef,
    };

    switch (selectedPaymentPlan) {
      case 'daily':
        return <DailyPayment {...props} />;
      case 'weekly':
        return <WeeklyPayment {...props} />;
      case 'monthly':
        return (
          <Suspense fallback={<div>Loading monthly plan...</div>}>
            <MonthlyPayment {...props} />
          </Suspense>
        );
      case 'upfront':
        return <FullPayment product={product} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="block lg:hidden">
        {renderSelectedPayment()}
        {selectedPaymentPlan && (
          <div className="lg:mx-0 lg:w-[80%] mt-4 mx-5">
            <YellowButton onClick={() => handleAddToCart(dispatch, product)}>
              Add to cart
            </YellowButton>
          </div>
        )}
      </div>

      <div className="py-4 w-full lg:w-[80%] px-5 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-4">
          {product.paymentOptions.map((option, index) => {
            const isSelected = selectedPaymentPlan === option.type;
            const price =
              option.dailyPayment ||
              option.weeklyPayment ||
              option.monthlyPayment ||
              option.amount;
            const unit =
              option.type === 'daily'
                ? 'per day'
                : option.type === 'weekly'
                  ? 'per week'
                  : option.type === 'monthly'
                    ? 'per month'
                    : 'one time';
            const tag = option.type === 'monthly' ? 'Popular' : '';

            return (
              <label
                key={`${option.type}-${index}`}
                htmlFor={option.type}
                className={`relative flex items-start gap-3 border rounded-md p-4 cursor-pointer transition ${
                  isSelected
                    ? 'bg-yellow-50 border-yellow-500 ring-1 ring-yellow-400'
                    : 'hover:border-gray-400'
                }`}
              >
                <div className="pt-1">
                  <div className="h-2 w-2 rounded-full border border-black flex items-center justify-center">
                    {isSelected && (
                      <div className="h-2 w-2 bg-black rounded-full"></div>
                    )}
                  </div>
                </div>

                <input
                  id={option.type}
                  type="radio"
                  name="payment"
                  value={option.type}
                  checked={isSelected}
                  onChange={() => handlePlanChange(option.type)}
                  className="sr-only"
                />

                <div className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-gray-700 text-sm">
                    {formatCurrency(price)}{' '}
                    <span className="text-xs">{unit}</span>
                  </span>
                </div>

                {tag && (
                  <span className="absolute bottom-[68px] right-4 bg-yellow-400 text-xs text-black px-1 rounded">
                    {tag}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      <div className="hidden lg:block">
        {renderSelectedPayment()}
        {selectedPaymentPlan && (
          <div className="lg:mx-0 lg:w-[80%] mt-4 mx-5">
            <YellowButton onClick={() => handleAddToCart(dispatch, product)}>
              Add to cart
            </YellowButton>
          </div>
        )}
      </div>
    </>
  );
});
