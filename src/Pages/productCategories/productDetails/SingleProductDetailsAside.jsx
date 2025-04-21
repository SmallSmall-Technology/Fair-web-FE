import { useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { Button, YellowButton } from '../../../utils/Button';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { handleAddToCart } from '../../../features/cart/AddToCart';
import { CommentBar } from '../../../features/reviewsRating/CommentBar';
import { ChevronsLeft, ChevronsRight, HeartHandshake } from 'lucide-react';

const item_width = 70;

export const SingleProductDetailsAside = React.memo(
  ({ product, shippingDate, category, isLoading }) => {
    const dispatch = useDispatch();
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
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

    const getPaymentDates = (startDate, months) => {
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

    const installmentOption = product.paymentOptions?.[1] || {};
    const fullPaymentOption = product.paymentOptions?.[0] || {};

    const paymentsInstallment = [
      {
        amount: installmentOption.upfrontPayment,
        label: 'Pay now today',
        icon: '/images/quater-circle.svg',
      },
      {
        amount: installmentOption.monthlyPayment,
        label: '2nd Payment',
        date: getPaymentDates(new Date(), 3)[0],
        icon: '/images/half-circle.svg',
      },
      {
        amount: installmentOption.monthlyPayment,
        label: '3rd Payment',
        date: getPaymentDates(new Date(), 3)[1],
        icon: '/images/one-third-circle.svg',
      },
      {
        amount: installmentOption.monthlyPayment,
        label: 'Final Payment',
        date: getPaymentDates(new Date(), 3)[2],
        icon: '/images/full-circle.svg',
      },
    ];

    const paymentsInFull = [
      {
        amount: fullPaymentOption.amount,
        label: 'Pay in full today',
        date: new Date(),
        icon: '/images/full-circle.svg',
      },
    ];

    return (
      <aside className="w-full xl:w-[45%]">
        <h1 className="text-xl lg:text-2xl font-bold mx-5 lg:mx-0">
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
        <p className="font-medium mb-4 mx-4 ">Choose how you want to pay</p>
        <p className="hidden lg:block text-xs mb-3">Pay in instalments</p>

        <article className="bg-[#F2F2F2] rounded-[10px] py-5 flex flex-col justify-center lg:justify-start mx-5 lg:mx-0 relative">
          {canScrollRight && (
            <Button
              onClick={() => handleScroll(item_width)}
              className="absolute right-2 top-5 -translate-y-1/2 z-10 lg:hidden"
            >
              <ChevronsRight />
            </Button>
          )}
          {canScrollLeft && (
            <Button
              onClick={() => handleScroll(-item_width)}
              className="absolute left-2 top-5 -translate-y-1/2 z-10 lg:hidden"
            >
              <ChevronsLeft />
            </Button>
          )}

          <div className="grid lg:flex gap-4 lg:justify-between items-start px-10 w-full mt-4">
            <div
              ref={paymentMethodRef}
              className="flex space-x-9 lg:space-x-3 w-full overflow-x-auto scrollbar-hide "
            >
              {paymentsInstallment.map((payment, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-24 lg:min-w-fit"
                >
                  <div className="h-7 w-7">
                    <img
                      src={payment.icon}
                      alt={payment.label}
                      className="h-full w-full"
                    />
                  </div>
                  <p className="text-xs font-medium mt-1">
                    {formatCurrency(payment?.amount)}
                  </p>
                  <span className="text-[11px] text-center ">
                    {payment.label}
                  </span>
                  {payment.date && (
                    <span className="text-[11px] text-center mt-1">
                      {payment.date}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className=" lg:mx-0 lg:min-w-fit">
              <YellowButton onClick={() => handleAddToCart(dispatch, product)}>
                Add to cart
              </YellowButton>
            </div>
          </div>
        </article>
        <div className="flex items-center">
          <hr className="flex-grow my-4 mx-5 lg:mx-0" />
          <span className="mx-4">or</span>
          <hr className="flex-grow my-4 mx-5 lg:mx-0" />
        </div>

        <p className="text-xs mb-3 mx-5 lg:mx-0">Pay in full</p>

        <article className="bg-[#F2F2F2] rounded-[10px] py-5 flex justify-start mb-6 mx-5 lg:mx-0">
          <div className="flex flex-col lg:flex-row gap-2 justify-between items-center px-10 w-full">
            <div className="flex gap-2 items-start mr-auto">
              <div className="h-7 w-7">
                <img
                  src={paymentsInFull[0].icon}
                  alt="Full payment icon"
                  className="h-full w-full"
                />
              </div>
              <div className="grid">
                <p className="font-medium">
                  {formatCurrency(paymentsInFull[0].amount)}
                </p>
                <span className="text-[11px]">{paymentsInFull[0].label}</span>
              </div>
            </div>
            <div className="mx-5 lg:mx-0 lg:w-fit w-full">
              <YellowButton onClick={() => handleAddToCart(dispatch, product)}>
                Add to cart
              </YellowButton>
            </div>
          </div>
        </article>
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
      </aside>
    );
  }
);

export default SingleProductDetailsAside;
