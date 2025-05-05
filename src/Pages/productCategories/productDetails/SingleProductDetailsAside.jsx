import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { useIsInView } from '../../../hooks/useIsInView';
import { PaymentOptions } from './productPlan/PaymentOptions';
import { formatCurrency } from '../../../utils/FormatCurrency';
import CommentBar from '../../../features/reviewsRating/CommentBar';
import { SingleProductStickyHeader } from '../ProductCategoriesShortcut';
import { WeeklyPayment } from './productPlan/WeeklyPaymentPlan/WeeklyPayment';
import { DailyPayment } from './productPlan/DailyPaymentPlan/DailyPayment';
import { MonthlyPayment } from './productPlan/MonthlyPaymentPlan/MonthlyPayment';
import { FullPayment } from './productPlan/FullPaymentPlan/FullPayment';

export const item_width = 70;

export const getPaymentDates = (startDate, months) => {
  const dates = [];
  const currentDate = new Date(startDate);
  for (let i = 1; i <= months; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 30 * i);
    dates.push(
      nextDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    );
  }
  return dates;
};

export const SingleProductDetailsAside = React.memo(
  ({ product, shippingDate, category, selected, setSelected }) => {
    const [targetRef, isInView] = useIsInView();

    return (
      <aside className="w-full xl:w-[45%]">
        <h1
          ref={targetRef}
          className="text-xl lg:text-2xl font-bold mx-5 lg:mx-0"
        >
          {product.name}
        </h1>
        <hr className="my-2 hidden lg:block" />
        <div className="mt-4 lg:mt-0 mx-5 lg:mx-0">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="/images/sold-by-fair.svg"
                alt="An icon representing files"
              />
              <p className="text-sm">
                Sold by <span className="font-semibold">Fair</span>
              </p>
            </div>
            <button className="flex items-center text-sm text-[#222224] lg:hidden bg-[#323232] rounded-[10px] px-3">
              <span className="text-white">Share </span>
              <span className="pl-1">
                <img src="/images/share-square-white.svg" alt="A share icon" />
              </span>
            </button>
          </div>
          <p className="text-xs mt-3 hidden lg:block">
            Brand <span className="font-medium">{product.brand}</span>
          </p>
          <p className="text-[27px] font-semibold lg:mt-3 mb-6">
            {formatCurrency(product.price)}
          </p>
          <p className="flex items-center space-x-2">
            <img
              src="/images/digital-payment.svg"
              alt="An icon for a phone making transaction"
              width={24}
            />
            <span className="font-medium text-sm">
              Downpayment Instant Delivery
            </span>
          </p>
          <p className="text-xs mt-2 mb-6 lg:mb-0">
            Pay downpayment & receive item, spread remaining payment over 3
            interest free payment.
          </p>
        </div>
        <hr className="my-4 hidden lg:block" />
        <p className="hidden lg:block font-medium mb-3 mx-5 lg:mx-0">
          Select how you want to pay
        </p>
        <p className="lg:hidden font-medium mb-3 mx-5 lg:mx-0">
          Choose how you want to pay
        </p>
        {/* <div className="block lg:hidden">
          {selected === 'daily' && <DailyPayment product={product} />}
          {selected === 'weekly' && <WeeklyPayment product={product} />}
          {selected === 'monthly' && <MonthlyPayment product={product} />}
          {selected === 'upfront' && <FullPayment product={product} />}
        </div> */}

        <div>
          <PaymentOptions
            selected={selected}
            setSelected={setSelected}
            product={product}
          />
        </div>

        <div className="mt-10 lg:hidden">
          <div className="border-y-4 rounded-2xl"></div>
          <div className="grid grid-flow-col lg:hidden mt-4 mx-5">
            <div className="mt-4">
              <p className="text-[#A3A3A2]">Shipping</p>
              <p className="text-[#A3A3A2]">Brand</p>
              <p className="text-[#A3A3A2]">Category</p>
            </div>
            <div className="mt-4">
              <p>
                Est.delivery date{' '}
                <span className="font-medium">
                  {shippingDate || '20 Jan, 2025'}
                </span>
              </p>
              <p>{product.brand}</p>
              <p>{category}</p>
            </div>
          </div>
        </div>
        <hr className="mt-6 mb-3 mx-5 lg:mx-0" />
        <section className="lg:overflow-y-auto lg:h-96">
          <div className="mb-16 mx-5 lg:mx-0">
            <h2 className="mb-4 text-lg font-medium">Item description</h2>
            <p>
              {product.description ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
            </p>
          </div>
          <hr className="mb-4 mx-5 lg:mx-0" />
          <div className="mb-16 mx-5 lg:mx-0">
            <h2 className="mb-4 text-lg font-medium">About Item</h2>
            <p>
              {product.about ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'}
            </p>
          </div>
          <hr className="mb-4 mx-5 lg:mx-0" />
          <section className="grid lg:hidden mt-8 mx-5 lg:mx-0">
            <p className="font-semibold text-lg mb-4">
              Customer ratings and review
            </p>
            <CommentBar />
          </section>
          <div className="hidden lg:grid mb-16">
            <h2 className="mb-4 text-lg font-medium">
              Delivery & Return policies
            </h2>
            <ul className="list-none grid gap-4">
              <li className="flex space-x-2">
                <img
                  src="/images/calendar-day.svg"
                  alt="calender icon"
                  className="mr-2"
                />
                Estimated delivery date{' '}
                <span className="font-medium">
                  {product.deliverydate || new Date().toLocaleDateString()}
                </span>
              </li>
              <li className="flex space-x-2">
                <img
                  src="/images/box-alt.svg"
                  alt="A box icon"
                  className="mr-2"
                />
                Returns & refund accepted within{' '}
                <span className="font-medium">2 days</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#FFF8CF] py-4 px-6 hidden lg:block">
            <div className="flex items-start space-x-2">
              <HeartHandshake size={24} />
              <div>
                <p className="font-medium text-[13px] mb-3">
                  Fair purchase protection
                </p>
                <p className="text-xs max-w-80">
                  Shop confidently on Fair knowing if something goes wrong with
                  an order, we've got your back for all eligible purchases.
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="hidden lg:block">
          {!isInView && (
            <SingleProductStickyHeader
              product={product}
              PaymentOptions={PaymentOptions}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </div>
      </aside>
    );
  }
);

// export default SingleProductDetailsAside;
