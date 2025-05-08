import { Link, NavLink } from 'react-router-dom';
import { singleProductCategories } from '../../utils/data';
import { StickyHeaderWeeklyPayment } from './productDetails/productPlan/WeeklyPaymentPlan/StickyHeaderWeeklyPayment';
import { StickyHeaderDailyPayment } from './productDetails/productPlan/DailyPaymentPlan/StickyHeaderDailyPayment';
import { StickyHeaderMonthlyPayment } from './productDetails/productPlan/MonthlyPaymentPlan/StickyHeaderMonthlyPayment';
import { formatCurrency } from '../../utils/FormatCurrency';
import { StickyHeaderFullPayment } from './productDetails/productPlan/FullPaymentPlan/StickyHeaderFullPayment';
import { useEffect, useState } from 'react';

const SingleProductCategory = ({ product }) => {
  return (
    <li className="flex flex-col items-center hover:cursor-pointer hover:shadow-[0px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 transition-all duration-300 ease-in-out">
      <NavLink to={product.link}>
        <p className="text-sm font-medium text-nowrap">{product.productName}</p>
      </NavLink>
    </li>
  );
};

export const ProductCategoriesShortcut = () => {
  return (
    <section className="flex space-x-4 items-center justify-center md:justify-start xl:justify-center">
      <p className="flex p-2 w-fit px-2 rounded-[20px] font-medium text-xs border">
        <img
          src="/public/images/category-alt.svg"
          alt="category icon"
          width={15}
        />

        <select>
          <option>Department</option>
          <option>Electonics</option>
        </select>
      </p>
      <ul className="flex space-x-6 justify-center md:justify-start items-center overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {singleProductCategories.map((product) => (
          <SingleProductCategory product={product} key={product.id} />
        ))}
      </ul>
      <Link className="font-medium text-[#DB1C5E] text-sm">Sales & Offers</Link>
    </section>
  );
};

export const SingleProductStickyHeader = ({ product, selected }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, [selected]);

  const paymentMethodsAvailable = [
    {
      amount: product.paymentOptions[0].dailyPayment,
      label: 'Daily',
      icon: '/images/quater-circle.svg',
    },
    {
      amount: product.paymentOptions[1].weeklyPayment,
      label: 'Weekly',
      icon: '/images/half-circle.svg',
    },
    {
      amount: product.paymentOptions[2].monthlyPayment,
      label: 'Monthly',
      icon: '/images/one-third-circle.svg',
    },
    {
      amount: product.price,
      label: 'Pay in full',
      icon: '/images/full-circle.svg',
    },
  ];
  return (
    <>
      <div
        className=" pl-40 mx-auto w-full fixed top-0 left-0 right-0 bg-white z-30 py-4 flex justify-between items-center border-b border-gray-200 pb-2 transition-all motion-safe:duration-200 px-20"
        role="banner"
        aria-label="Main site navigation"
      >
        <div className="flex items-center space-x-3">
          <div className="w-[55px] h-[55px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="font-semibold">{product.name}</p>
        </div>

        <div className="hidden md:flex items-center max-w-[40%] overflow-x-scroll relative transition-all duration-500">
          <div
            className={`w-full transform transition-transform duration-500 ease-out ${
              show ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            {selected === '' && (
              <article className="flex">
                <div className="flex space-x-5 w-full">
                  {paymentMethodsAvailable.map((payment, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h- w-7">
                        <img
                          src={payment.icon}
                          alt={`${payment.label} payment icon`}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-xs font-medium mt-1">
                          {formatCurrency(payment.amount)}
                        </p>
                        <span className="text-[11px] text-center">
                          {payment.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {selected === 'daily' && (
              <StickyHeaderDailyPayment product={product} />
            )}
            {selected === 'weekly' && (
              <StickyHeaderWeeklyPayment product={product} />
            )}
            {selected === 'monthly' && (
              <StickyHeaderMonthlyPayment product={product} />
            )}
            {selected === 'upfront' && (
              <StickyHeaderFullPayment product={product} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
