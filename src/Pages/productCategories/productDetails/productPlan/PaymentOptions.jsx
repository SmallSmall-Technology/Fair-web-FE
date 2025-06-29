import { YellowButton } from '../../../../utils/Button';
import React, { useEffect, useRef, useState } from 'react';
import { FullPayment } from './FullPaymentPlan/FullPayment';
import { DailyPayment } from './DailyPaymentPlan/DailyPayment';
import { WeeklyPayment } from './WeeklyPaymentPlan/WeeklyPayment';
import { formatCurrency } from '../../../../utils/FormatCurrency';
import { MonthlyPayment } from './MonthlyPaymentPlan/MonthlyPayment';
import { handleAddToCart } from '../../../../features/cart/AddToCart';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSelectedPaymentPlan,
  setSelectedPaymentPlan,
} from '../../../../features/cart/cartSlice';

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

  useEffect(() => {
    const el = paymentMethodRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  return (
    <>
      <div className="block lg:hidden">
        {selectedPaymentPlan === 'daily' && (
          <DailyPayment
            product={product}
            handleScroll={handleScroll}
            canScrollRight={canScrollRight}
            canScrollLeft={canScrollLeft}
            paymentMethodRef={paymentMethodRef}
          />
        )}
        {selectedPaymentPlan === 'weekly' && (
          <WeeklyPayment
            product={product}
            handleScroll={handleScroll}
            canScrollRight={canScrollRight}
            canScrollLeft={canScrollLeft}
            paymentMethodRef={paymentMethodRef}
          />
        )}
        {selectedPaymentPlan === 'monthly' && (
          <MonthlyPayment
            product={product}
            handleScroll={handleScroll}
            canScrollRight={canScrollRight}
            canScrollLeft={canScrollLeft}
            paymentMethodRef={paymentMethodRef}
          />
        )}
        {selectedPaymentPlan === 'upfront' && <FullPayment product={product} />}
        {selectedPaymentPlan && (
          <div className=" lg:mx-0 lg:w-[80%] mt-4 mx-5">
            <YellowButton onClick={() => handleAddToCart(dispatch, product)}>
              Add to cart
            </YellowButton>
          </div>
        )}
      </div>

      <div className="py-4 w-full lg:w-[80%] px-5 lg:px-0">
        <div className="grid lg:grid-cols-2 gap-4">
          {product.paymentOptions.map((option, index) => {
            let price = '';
            let unit = '';
            let tag = '';

            switch (option.type) {
              case 'daily':
                price = option.dailyPayment;
                unit = 'per day';
                tag = '';
                break;
              case 'weekly':
                price = option.weeklyPayment;
                unit = 'per week';
                tag = '';
                break;
              case 'monthly':
                price = option.monthlyPayment;
                unit = 'per month';
                tag = 'Popular';
                break;
              case 'upfront':
                price = option.amount;
                unit = 'one time';
                tag = '';

                break;
              default:
                price = '';
            }
            return (
              <label
                key={`${option.type}-${index}`}
                htmlFor={option.type}
                className={`relative flex items-start gap-3 border rounded-md p-4 cursor-pointer transition 
          ${selectedPaymentPlan === option.type ? 'bg-yellow-50 border-yellow-500 ring-1 ring-yellow-400' : 'hover:border-gray-400'}`}
              >
                <div className="pt-1">
                  <div className="h-2 w-2 rounded-full border border-1 border-black flex items-center justify-center">
                    {selectedPaymentPlan === option.type && (
                      <div className="h-2 w-2 bg-black rounded-full"></div>
                    )}
                  </div>
                </div>

                <input
                  id={option.type}
                  type="radio"
                  name="payment"
                  value={option.type}
                  checked={selectedPaymentPlan === option.type}
                  onChange={() => dispatch(setSelectedPaymentPlan(option.type))}
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
        {selectedPaymentPlan === 'daily' && (
          <DailyPayment
            product={product}
            handleScroll={handleScroll}
            canScrollRight={canScrollRight}
            canScrollLeft={canScrollLeft}
            paymentMethodRef={paymentMethodRef}
          />
        )}
        {selectedPaymentPlan === 'weekly' && (
          <WeeklyPayment
            product={product}
            handleScroll={handleScroll}
            canScrollRight={canScrollRight}
            canScrollLeft={canScrollLeft}
            paymentMethodRef={paymentMethodRef}
          />
        )}
        {selectedPaymentPlan === 'monthly' && (
          <MonthlyPayment
            product={product}
            handleScroll={handleScroll}
            canScrollRight={canScrollRight}
            canScrollLeft={canScrollLeft}
            paymentMethodRef={paymentMethodRef}
          />
        )}
        {selectedPaymentPlan === 'upfront' && <FullPayment product={product} />}
        {selectedPaymentPlan && (
          <div className=" lg:mx-0 lg:w-[80%] mt-4 mx-5">
            <YellowButton onClick={() => handleAddToCart(dispatch, product)}>
              Add to cart
            </YellowButton>
          </div>
        )}
      </div>
    </>
  );
});
