import React from 'react';
import { useDispatch } from 'react-redux';
import { YellowButton } from '../../../utils/Button';
import { ChevronsRight, HeartHandshake } from 'lucide-react';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { handleAddToCart } from '../../../features/cart/AddToCart';
import { CommentBar } from '../../../features/reviewsRating/CommentBar';

export const SingleProductDetailsAside = React.memo(
  ({ product, shippingDate, category, isLoading }) => {
    const dispatch = useDispatch();

    if (!product) return <div>Product not found</div>;

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

    const paymentsInstallment = [
      {
        amount: product.paymentOptions[1].upfrontPayment,
        label: 'Pay now today',
        icon: '/images/quater-circle.svg',
      },
      {
        amount: product.paymentOptions[1].monthlyPayment,
        label: 'Next Payment',
        date: getPaymentDates(new Date(), 3)[0],
        icon: '/images/half-circle.svg',
      },
      {
        amount: product.paymentOptions[1].monthlyPayment,
        label: '3rd Payment',
        date: getPaymentDates(new Date(), 3)[1],
        icon: '/images/one-third-circle.svg',
      },
      {
        amount: product.paymentOptions[1].monthlyPayment,
        label: 'Final Payment',
        date: getPaymentDates(new Date(), 3)[2],
        icon: '/images/full-circle.svg',
      },
    ];

    const paymentsInFull = [
      {
        amount: product.paymentOptions[0].amount,
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
            <div className="flex items-center text-sm text-[#222224] lg:hidden bg-[#323232] rounded-[10px] px-3">
              <span className="text-white">Share </span>
              <span className="pl-1">
                <img src="/images/share-square-white.svg" alt="A share icon" />
              </span>
            </div>
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
        <article className="bg-[#F2F2F2] rounded-[10px] py-5 flex flex-col justify-center lg:justify-start mx-5 lg:mx-0">
          <div className="flex lg:hidden justify-end w-full pr-3">
            <ChevronsRight className="" role="button" />
          </div>
          <div className="flex gap-4 justify-between items-start px-10 w-full">
            {paymentsInstallment.map((payment, index) => (
              <div key={index} className="flex flex-col justify-center">
                <div className="grid justify-center items-center ">
                  <img
                    src={payment.icon}
                    alt={payment.label}
                    className="mx-auto max-h-[19px]"
                  />
                  <div className="grid ">
                    <p className="flex justify-center text-xs font-medium">
                      {formatCurrency(payment?.amount)}
                    </p>
                    <span className="text-[11px] text-center">
                      {payment.label}
                    </span>
                  </div>
                </div>
                <div className="flex text-center md:flex-col md:items-end lg:hidden xl:flex ml-auto">
                  {payment.date && (
                    <span className="text-[11px]">{payment?.date}</span>
                  )}
                </div>
              </div>
            ))}
            <div className="w-full h-[1px] bg-[#E5E5E5] lg:hidden"></div>
            <div className="mx-5 lg:mx-0 w-full lg:w-fit">
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
        <article className="bg-[hsl(0,0%,95%)] rounded-[10px] py-5 lg:pl-8 pl-0 flex justify-start mb-6 mx-5 lg:mx-0 ">
          <div className="flex flex-col lg:flex-row gap-2 justify-between items-center px-10 w-full">
            <div className="flex gap-2 items-start mr-auto">
              <img
                src="/images/full-circle.svg"
                alt="A diameter of a circle"
                className="mx-auto min-h-[28px]"
              />
              <div className="grid grid-cols-1">
                <p className="font-medium">
                  {formatCurrency(paymentsInFull[0].amount)}
                </p>
                <span className="text-[11px]">Pay now Today</span>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#E5E5E5] my-2 lg:hidden"></div>
            <div className="mx-5 lg:mx-0 w-full lg:w-fit">
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
