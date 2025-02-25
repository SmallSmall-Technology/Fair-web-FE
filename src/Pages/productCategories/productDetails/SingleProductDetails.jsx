import { NavLink } from "react-router";
import { CommentBar } from "./CommentBar";
import { ProductImage } from "./ProductImage";
import {
  Share2,
  Star,
  Heart,
  Share,
  FileDigitIcon,
  Calendar,
  File,
  Box,
  BoxIcon,
  FolderArchive,
} from "lucide-react";
import { YellowButton } from "../../../utils/Button";

export const SingleProductDetails = ({ product }) => {
  // Array of images for the aside section
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <>
      {/* Main Product Section */}
      <div className="flex flex-wrap w-full justify-between">
        {/* Left Section - Product Images */}
        <main className="w-full md:w-1/2">
          <div className="flex justify-between gap-5">
            {/* Aside - Thumbnail Images */}
            <aside className="w-[100px]">
              <ul className="hidden md:grid grid-cols-1 gap-2">
                {productImages.map((image, index) => (
                  <ProductImage
                    key={index}
                    image={image}
                    alt={`${product.slug}-thumbnail-${index}`}
                    className="w-[94px] h-[94px]"
                  />
                ))}
              </ul>
            </aside>

            {/* Main Product Image */}
            <main className="flex-1">
              <div className="bg-[#F2F2F2] rounded-2xl w-full h-[589px] flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.slug}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </main>
          </div>
          <section className="mt-8">
            <p className="font-semibold text-lg mb-4">
              Customer ratings and review
            </p>
            <CommentBar />
          </section>
        </main>

        {/* Right Section - Product Details */}
        <aside className="w-full md:w-1/2 md:px-10">
          <div className="flex justify-end space-x-2">
            <p className="flex items-center text-sm text-[#222224]">
              Add to favorite{" "}
              <span className="pl-1">
                <Heart size={22} />
              </span>
            </p>
            <p className="flex items-center text-sm text-[#222224]">
              Share{" "}
              <span className="pl-1">
                <Share size={22} />
              </span>
            </p>
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <hr className="my-2" />
          <div className="">
            <div className="flex items-center space-x-2">
              <img
                src="/public/images/sold-by-fair.svg"
                alt="An icon representing files"
              />
              <p className="text-sm">
                Sold by <span className="font-semibold">Fair</span>{" "}
              </p>
            </div>
            <p className="text-xs mt-3">
              Brand <span className="font-medium">{product.brand}</span>
            </p>
            {/* <p className="text-gray-600">{product.description}</p> */}
            <p className="text-[27px] font-semibold mt-4 mb-6">
              {product.price}
            </p>
            {/* <p className="text-sm text-gray-500">{product.subcategory}</p> */}
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
            <p className="text-xs mt-2">
              Pay downpayment & receive item, spread remaining payment over 3
              interest free payment.
            </p>
          </div>
          <hr className="my-4" />

          {/* Right Section - Pay in instalments */}

          <div>
            <p className="text-xs mb-3">Pay in instalments</p>

            <article className="bg-[#F2F2F2] rounded-[10px] py-10 flex justify-center md:justify-start">
              <div className="flex space-x-6 md:ml-10 ">
                <div className="max-w-[80px] grid gap-2 text-center">
                  <img
                    src="/public/images/half-circle.svg"
                    alt="A diameter of a circle"
                    className="mx-auto"
                  />
                  <div className="grid grid-cols-1 ">
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
                  <div className="grid grid-cols-1 ">
                    <p className="text-xs font-medium">N200.000</p>
                    <span className="text-[11px]">
                      Next payment 24 Jun, 2024
                    </span>
                  </div>
                </div>

                <div className="max-w-[80px] grid gap-2 text-center">
                  <img
                    src="/public/images/full-circle.svg"
                    alt="A diameter of a circle"
                    className="mx-auto"
                  />
                  <div className="grid grid-cols-1 ">
                    <p className="text-xs font-medium">N200.000</p>
                    <span className="text-[11px]">
                      Final payment 24 Jul, 2024
                    </span>
                  </div>
                </div>
              </div>
            </article>

            <hr className="my-4" />
          </div>
          {/* Right Section - Pay in ful */}

          <div>
            <p className="text-xs mb-3">Pay in full</p>

            <article className="bg-[#F2F2F2] rounded-[10px] py-6 flex justify-center md:justify-start mb-6">
              <div className="flex space-x-6 md:ml-10 ">
                <div className="flex gap-2 items-start">
                  <img
                    src="/public/images/full-circle.svg"
                    alt="A diameter of a circle"
                    className="mx-auto"
                  />
                  <div className="grid grid-cols-1 ">
                    <p className="font-medium">N207.000</p>
                    <span className="text-[11px]">Pay now Today</span>
                  </div>
                </div>
              </div>
            </article>
            <YellowButton onClick={() => console.log("AddtoCart")}>
              Add to cart
            </YellowButton>
          </div>
          <hr className="mt-6 mb-3" />

          <div className="mb-16">
            <h2 className="mb-4 text-lg font-medium">Item description</h2>
            <p>
              {product.description ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
            </p>
          </div>
          <hr className="mb-4" />
          <div className="mb-16">
            <h2 className="mb-4 text-lg font-medium">About Item</h2>
            <p>
              {product.about ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
            </p>
          </div>
          <hr className="mb-4" />
          <div className="mb-16">
            <h2 className="mb-4 text-lg font-medium">
              Delivery & Return policies
            </h2>
            <ul className="list-none grid gap-4">
              <li className="flex space-x-2">
                <Calendar className="mr-1" />
                Estimated delivery date{" "}
                <span className="font-medium">
                  {product.deliverydate || new Date().toLocaleDateString()}
                </span>
              </li>
              <li className="flex space-x-2">
                <FolderArchive className="mr-1" />
                Returns & refund accepted within{" "}
                <span className="font-medium">2 days</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* "You May Also Like" Section */}
      <div className="mt-8 flex justify-between items-center bg-black h-52">
        <p className="text-lg font-semibold">You may also like</p>
        <NavLink
          to="/related-products"
          className="text-blue-500 hover:underline"
        >
          See more
        </NavLink>
      </div>
    </>
  );
};
