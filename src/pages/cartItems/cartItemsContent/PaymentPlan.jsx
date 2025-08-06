import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getCurrentQuantityById } from '../../../features/cart/cartSlice';
import CartItemFulllPayment from '../../productCategories/productDetails/productPlan/FullPaymentPlan/CartItemFullPayment';
import { CartItemDailyPayment } from '../../productCategories/productDetails/productPlan/DailyPaymentPlan/CartItemDailyPayment';
import { CartItemWeeklyPayment } from '../../productCategories/productDetails/productPlan/WeeklyPaymentPlan/CartItemWeeklyPayment';
import { CartItemMonthlyPayment } from '../../productCategories/productDetails/productPlan/MonthlyPaymentPlan/CartItemMonthlyPayment';

export const PaymentPlan = ({ item, togglePlan }) => {
  const paymentMethodRef = useRef(null);
  const currentPlan = item.paymentPlan;
  console.log('Current Plan:', currentPlan);
  // console.log('Other Plan:', otherPlan);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const currentQuantity = useSelector(getCurrentQuantityById(item.productID));

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
    <section className="lg:mx-4 overflow-x-auto">
      <div
        className={`flex ${currentPlan !== 'full' ? 'justify-center' : 'justify-start px-4'} py-2 border md:border-0 rounded-[10px] 2xl:px-10`}
      >
        {currentPlan === 'full' && <CartItemFulllPayment product={item} />}
        {currentPlan === 'monthly' && <CartItemMonthlyPayment product={item} />}
        {currentPlan === 'weekly' && <CartItemWeeklyPayment product={item} />}
        {currentPlan === 'daily' && <CartItemDailyPayment product={item} />}
      </div>
    </section>
  );
};
