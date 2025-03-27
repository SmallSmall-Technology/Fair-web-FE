import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatCurrency } from "./FormatCurrency";
import { Image, Share2, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AddToCart } from "../features/cart/AddToCart";
import { AddFavourite } from "../features/favourite/AddFavourite";
import { handleShareProduct } from "../features/product/ShareProduct";
import { addItemToRecentlyViewed } from "../features/product/recentlyViewedSlice";

export const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToRecentlyViewed = () => {
    dispatch(addItemToRecentlyViewed(product.id));
  };

  const {
    id,
    name,
    brand,
    category,
    subcategory,
    image,
    price,
    discountPrice,
    ratings,
    noOfProductSold,
    slug,
  } = product;

  const cardStyles = {
    base: "w-fit rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:pb-[1px]",
    transform: { transform: "scale(1)", transformOrigin: "center" },
  };

  const Skeleton = () => (
    <article
      className={cardStyles.base}
      tabIndex={0}
      role="article"
      aria-label={`Loading product`}
      style={cardStyles.transform}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl">
        <div className="absolute top-2 flex justify-between w-full px-2">
          <div className="rounded-full bg-gray-200 w-8 h-8 animate-pulse" />
          {discountPrice && (
            <div className="bg-gray-200 w-[51px] h-6 rounded-[20px] animate-pulse" />
          )}
        </div>
        <div className="flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
          <div className="w-full h-3/4 bg-gray-200 rounded animate-pulse mt-10" />
        </div>
      </div>
      <div className="grid grid-cols-1 space-y-2 w-[146px] md:w-[218px] mt-2 px-2">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="flex flex-col space-y-2">
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
          {discountPrice && (
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
          )}
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-6">
          <div className="h-10 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </article>
  );

  const Content = () => (
    <article
      className={cardStyles.base}
      tabIndex={0}
      role="article"
      aria-label={`Product: ${name}`}
      style={cardStyles.transform}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onClick={handleAddToRecentlyViewed}
    >
      <Link to={`/${id}/${slug}`} className="block">
        <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl cursor-pointer">
          <div className="absolute top-2 flex justify-between w-full px-2">
            <Button
              aria-label="Share this product"
              title="Share"
              className="rounded-full bg-white p-2 hover:shadow-lg transition-all duration-300 ease-in-out focus:border-2 focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
              onClick={(e) => {
                e.stopPropagation();
                handleShareProduct();
              }}
            >
              <Share2 className="fill-black" size="15px" />
            </Button>
            {discountPrice && (
              <p className="bg-[#FFF8CF] w-[51px] flex justify-center items-center rounded-[20px]">
                <span className="font-medium text-xs">
                  {Math.round(((price - discountPrice) / price) * 100)}%
                </span>
              </p>
            )}
          </div>
          <div className="flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
            <img
              src={image || "fallback-image-url"} // Provide a real fallback URL
              alt={name}
              loading="lazy"
              className="h-fit w-full mt-10"
            />
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-1 space-y-2 text-[#222224] w-[146px] md:w-[218px] mt-2 px-2">
        <Link
          to={`/${id}/${slug}`}
          className="hover:underline focus:underline focus:outline-none"
        >
          <p className="text-sm leading-[16.94px] min-h-12 cursor-pointer">
            {name}
          </p>
        </Link>
        <div className="flex flex-col space-y-1">
          <p className="font-semibold text-base">{formatCurrency(price)}</p>
          {discountPrice && (
            <p className="text-sm line-through text-[#827db1]">
              {formatCurrency(discountPrice)}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Star fill="black" className="w-3" aria-hidden="true" />
          <p>
            {ratings} ({noOfProductSold})
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <AddToCart product={product} />
          <AddFavourite product={product} />
        </div>
      </div>
    </article>
  );

  return <>{isLoading ? <Skeleton /> : <Content />}</>;
};
