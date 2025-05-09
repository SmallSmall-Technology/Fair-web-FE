// PaymentPlan.jsx (unchanged, for reference)
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { getCurrentQuantityById } from '../../../features/cart/cartSlice';
import { StickyHeaderFullPayment } from '../../productCategories/productDetails/productPlan/FullPaymentPlan/StickyHeaderFullPayment';
import { CartItemMonthlyPayment } from '../../productCategories/productDetails/productPlan/MonthlyPaymentPlan/CartItemMonthlyPayment';
import { CartItemDailyPayment } from '../../productCategories/productDetails/productPlan/DailyPaymentPlan/CartItemDailyPayment';
import { CartItemWeeklyPayment } from '../../productCategories/productDetails/productPlan/WeeklyPaymentPlan/CartItemWeeklyPayment';

export const PaymentPlan = ({ item }) => {
  const paymentMethodRef = useRef(null);
  const currentPlan = item.paymentPlan;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const currentQuantity = useSelector(getCurrentQuantityById(item.productId));

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
    <section className="mx-4 overflow-x-auto">
      <div
        className={`flex ${currentPlan !== 'upfront' ? 'justify-center' : 'justify-start px-4'} py-2 border md:border-0 rounded-[10px] 2xl:px-10`}
      >
        {currentPlan === 'upfront' && (
          <StickyHeaderFullPayment product={item} />
        )}
        {currentPlan === 'monthly' && <CartItemMonthlyPayment product={item} />}
        {currentPlan === 'weekly' && <CartItemWeeklyPayment product={item} />}
        {currentPlan === 'daily' && <CartItemDailyPayment product={item} />}
      </div>
    </section>
  );
};
