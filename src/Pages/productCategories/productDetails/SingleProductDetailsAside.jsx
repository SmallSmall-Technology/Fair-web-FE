import React from "react";
import { useDispatch } from "react-redux";
import { YellowButton } from "../../../utils/Button";
import { ChevronsRight, HeartHandshake } from "lucide-react";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { handleAddToCart } from "../../../features/cart/AddToCart";
import { CommentBar } from "../../../features/reviewsRating/CommentBar";

// Reusable SkeletonBox for placeholders
const SkeletonBox = ({ width = "100%", height = "1rem", className = "" }) => (
  <div
    className={`bg-gray-200 animate-pulse rounded ${className}`}
    style={{ width, height }}
  />
);

export const SingleProductDetailsAside = React.memo(
  ({ product, shippingDate, category, isLoading }) => {
    // const [isLoading] = useState(parentIsLoading ?? true);
    const dispatch = useDispatch();

    if (!product) return <div>Product not found</div>;

    // Skeleton Component
    const Skeleton = () => (
      <aside className="w-full lg:w-1/2 lg:pl-10">
        <SkeletonBox width="80%" height="2rem" className="mx-5 lg:mx-0" />
        <hr className="my-2 hidden lg:block" />
        <div className="mt-4 lg:mt-0 mx-5 lg:mx-0">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <SkeletonBox width="24px" height="24px" />
              <SkeletonBox width="100px" height="1rem" />
            </div>
            <div className="flex items-center text-sm text-[#222224] lg:hidden bg-[#323232] rounded-[10px] px-3">
              <SkeletonBox width="40px" height="1rem" />
              <SkeletonBox width="16px" height="16px" className="ml-1" />
            </div>
          </div>
          <SkeletonBox
            width="120px"
            height="0.75rem"
            className="mt-3 hidden lg:block"
          />
          <SkeletonBox width="150px" height="2rem" className="lg:mt-3 mb-6" />
          <div className="flex items-center space-x-2">
            <SkeletonBox width="24px" height="24px" />
            <SkeletonBox width="150px" height="1rem" />
          </div>
          <SkeletonBox
            width="100%"
            height="1.5rem"
            className="text-xs mt-2 mb-6 lg:mb-0"
          />
        </div>
        <hr className="my-4 hidden lg:block" />
        <p className="hidden lg:block text-xs mb-3">Pay in instalments</p>
        <article className="bg-[#F2F2F2] rounded-[10px] py-3 lg:py-5 flex flex-col justify-center lg:justify-start mx-5 lg:mx-0">
          <div className="flex lg:hidden justify-end w-full pr-3">
            <ChevronsRight className="" role="button" />
          </div>
          <div className="flex justify-center lg:justify-start">
            <div className="flex space-x-6 lg:ml-10">
              {Array(3)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="max-w-[80px] grid gap-2 text-center"
                  >
                    <SkeletonBox
                      width="40px"
                      height="40px"
                      className="mx-auto rounded-full"
                    />
                    <div className="grid grid-cols-1">
                      <SkeletonBox
                        width="60px"
                        height="1rem"
                        className="mx-auto"
                      />
                      <SkeletonBox
                        width="70px"
                        height="0.75rem"
                        className="mx-auto"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </article>
        <hr className="my-4 mx-5 lg:mx-0" />
        <p className="text-xs mb-3 mx-5 lg:mx-0">Pay in full</p>
        <article className="bg-[#F2F2F2] rounded-[10px] py-4 pl-8 lg:pl-0 flex justify-start mb-6 mx-5 lg:mx-0">
          <div className="flex space-x-6 lg:ml-10">
            <div className="flex gap-2 items-start">
              <SkeletonBox
                width="40px"
                height="40px"
                className="mx-auto rounded-full"
              />
              <div className="grid grid-cols-1">
                <SkeletonBox width="80px" height="1rem" />
                <SkeletonBox width="100px" height="0.75rem" />
              </div>
            </div>
          </div>
        </article>
        <div className="mx-5 lg:mx-0">
          <SkeletonBox width="100%" height="40px" className="rounded" />
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
              <SkeletonBox width="150px" height="1rem" />
              <SkeletonBox width="100px" height="1rem" />
              <SkeletonBox width="120px" height="1rem" />
            </div>
          </div>
        </div>
        <hr className="mt-6 mb-3 mx-5 lg:mx-0" />
        <div className="mb-16 mx-5 lg:mx-0">
          <h2 className="mb-4 text-lg font-medium">Item description</h2>
          <SkeletonBox width="100%" height="6rem" />
        </div>
        <hr className="mb-4 mx-5 lg:mx-0" />
        <div className="mb-16 mx-5 lg:mx-0">
          <h2 className="mb-4 text-lg font-medium">About Item</h2>
          <SkeletonBox width="100%" height="6rem" />
        </div>
        <hr className="mb-4 mx-5 lg:mx-0" />
        <section className="grid lg:hidden mt-8 mx-5 lg:mx-0">
          <p className="font-semibold text-lg mb-4">
            Customer ratings and review
          </p>
          <SkeletonBox width="100%" height="60px" />
        </section>
        <div className="hidden lg:grid mb-16">
          <h2 className="mb-4 text-lg font-medium">
            Delivery & Return policies
          </h2>
          <ul className="list-none grid gap-4">
            <li className="flex space-x-2">
              <SkeletonBox width="24px" height="24px" className="mr-2" />
              <SkeletonBox width="200px" height="1rem" />
            </li>
            <li className="flex space-x-2">
              <SkeletonBox width="24px" height="24px" className="mr-2" />
              <SkeletonBox width="180px" height="1rem" />
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
              <SkeletonBox width="100%" height="2rem" />
            </div>
          </div>
        </div>
      </aside>
    );

    // Content Component
    const Content = () => (
      <aside className="w-full lg:w-1/2 lg:pl-10">
        <h1 className="text-xl lg:text-2xl font-bold mx-5 lg:mx-0">
          {product.name}
        </h1>
        <hr className="my-2 hidden lg:block" />
        <div className="mt-4 lg:mt-0 mx-5 lg:mx-0">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="/public/images/sold-by-fair.svg"
                alt="An icon representing files"
              />
              <p className="text-sm">
                Sold by <span className="font-semibold">Fair</span>
              </p>
            </div>
            <div className="flex items-center text-sm text-[#222224] lg:hidden bg-[#323232] rounded-[10px] px-3">
              <span className="text-white">Share </span>
              <span className="pl-1">
                <img
                  src="/public/images/share-square-white.svg"
                  alt="A share icon"
                />
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
              src="/public/images/digital-payment.svg"
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
        <p className="hidden lg:block text-xs mb-3">Pay in instalments</p>
        <article className="bg-[#F2F2F2] rounded-[10px] py-3 lg:py-5 flex flex-col justify-center lg:justify-start mx-5 lg:mx-0">
          <div className="flex lg:hidden justify-end w-full pr-3">
            <ChevronsRight className="" role="button" />
          </div>
          <div className="flex justify-center lg:justify-start">
            <div className="flex space-x-6 lg:ml-10">
              <div className="max-w-[80px] grid gap-2 text-center">
                <img
                  src="/public/images/half-circle.svg"
                  alt="A diameter of a circle"
                  className="mx-auto"
                />
                <div className="grid grid-cols-1">
                  <p className="text-xs font-medium">N200.000</p>
                  <span className="text-[11px]">Pay now today</span>
                </div>
              </div>
              <div className="max-w-[80px] grid gap-2 text-center">
                <img
                  src="/public/images/one-quater-circle.svg"
                  alt="A diameter of a circle"
                  className="mx-auto"
                />
                <div className="grid grid-cols-1">
                  <p className="text-xs font-medium">N200.000</p>
                  <span className="text-[11px]">Next payment 24 Jun, 2024</span>
                </div>
              </div>
              <div className="max-w-[80px] grid gap-2 text-center">
                <img
                  src="/public/images/full-circle.svg"
                  alt="A diameter of a circle"
                  className="mx-auto"
                />
                <div className="grid grid-cols-1">
                  <p className="text-xs font-medium">N200.000</p>
                  <span className="text-[11px]">
                    Final payment 24 Jul, 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </article>
        <hr className="my-4 mx-5 lg:mx-0" />
        <p className="text-xs mb-3 mx-5 lg:mx-0">Pay in full</p>
        <article className="bg-[#F2F2F2] rounded-[10px] py-4 pl-8 lg:pl-0 flex justify-start mb-6 mx-5 lg:mx-0">
          <div className="flex space-x-6 lg:ml-10">
            <div className="flex gap-2 items-start">
              <img
                src="/public/images/full-circle.svg"
                alt="A diameter of a circle"
                className="mx-auto"
              />
              <div className="grid grid-cols-1">
                <p className="font-medium">N207.000</p>
                <span className="text-[11px]">Pay now Today</span>
              </div>
            </div>
          </div>
        </article>
        <div className="mx-5 lg:mx-0">
          <YellowButton onClick={() => handleAddToCart(dispatch, product)}>
            Add to cart
          </YellowButton>
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
                Est.delivery date{" "}
                <span className="font-medium">
                  {shippingDate || "20 Jan, 2025"}
                </span>
              </p>
              <p>{product.brand}</p>
              <p>{category}</p>
            </div>
          </div>
        </div>
        <hr className="mt-6 mb-3 mx-5 lg:mx-0" />
        <div className="mb-16 mx-5 lg:mx-0">
          <h2 className="mb-4 text-lg font-medium">Item description</h2>
          <p>
            {product.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
          </p>
        </div>
        <hr className="mb-4 mx-5 lg:mx-0" />
        <div className="mb-16 mx-5 lg:mx-0">
          <h2 className="mb-4 text-lg font-medium">About Item</h2>
          <p>
            {product.about ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
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
                src="/public/images/calendar-day.svg"
                alt="calender icon"
                className="mr-2"
              />
              Estimated delivery date{" "}
              <span className="font-medium">
                {product.deliverydate || new Date().toLocaleDateString()}
              </span>
            </li>
            <li className="flex space-x-2">
              <img
                src="/public/images/box-alt.svg"
                alt="A box icon"
                className="mr-2"
              />
              Returns & refund accepted within{" "}
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
                Shop confidently on Fair knowing if something goes wrong with an
                order, we've got your back for all eligible purchases.
              </p>
            </div>
          </div>
        </div>
      </aside>
    );

    // Render with loading state
    return <>{isLoading ? <Skeleton /> : <Content />}</>;
  }
);

export default SingleProductDetailsAside;
