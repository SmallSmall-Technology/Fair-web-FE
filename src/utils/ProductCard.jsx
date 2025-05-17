import { Button } from './Button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Image as ImageIcon } from 'lucide-react';
import { Share2, Star } from 'lucide-react';
import { formatCurrency } from './FormatCurrency';
import React, { memo, useEffect, useState } from 'react';
import { AddToCart } from '../features/cart/AddToCart';
import { AddFavourite } from '../features/favourite/AddFavourite';
import { handleShareProduct } from '../features/product/ShareProduct';
import { addItemToRecentlyViewed } from '../features/product/recentlyViewedSlice';

const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToRecentlyViewed = () => {
    dispatch(addItemToRecentlyViewed(product));
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
    base: 'w-fit rounded-2xl transition-all duration-300 ease-in-out hover:drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] pb-2',

    transform: { transform: 'scale(1)', transformOrigin: 'center' },
  };

  const Skeleton = () => (
    <article
      className={cardStyles.base}
      tabIndex={0}
      role="article"
      aria-label={`Loading product`}
      style={cardStyles.transform}
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
      // onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
      // onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onClick={handleAddToRecentlyViewed}
    >
      <Link to={`/${id}/${slug}`} className="block">
        <div className="relative bg-[#F2F2F2] w-[146px] h-[146p] md:w-[218px] md:h-[218px] rounded-2xl cursor-pointer flex justify-center items-center">
          <div className="absolute top-3 flex justify-between w-full px-3">
            {discountPrice && (
              <p className="bg-white p-1">
                <span className="font-medium text-xs">
                  <p>35% downpayment</p>
                </span>
              </p>
            )}
          </div>
          <div className="flex justify-center items-center mx-aut w-[78p] h-[78p] lg:w-[111px] lg:h-[111px]">
            {!imgError ? (
              <img
                src={image}
                alt={name}
                loading="lazy"
                onError={() => setImgError(true)}
                className="h-[100%] w-full object-cover "
              />
            ) : (
              <ImageIcon className="h-fit w-full mt-10 object-contain" />
            )}
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-1 space-y-2 text-[#222224] w-[146px] md:w-[218px] mt-2 px-">
        <Link
          to={`/${id}/${slug}`}
          className="hover:underline focus:underline focus:outline-none"
        >
          <p className="text-xs lg:text-sm font-normal  leading-[16.94px] min-h-12 cursor-pointer overflow-hidden lg:overflow-visible line-clamp-2 lg:line-clamp-none">
            {name}
          </p>
        </Link>
        <div className="flex items-center lg:space-x-1">
          <Star fill="black" size={14} aria-hidden="true" />
          <p className="text-sm">
            {ratings} ({noOfProductSold})
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-2 lg:items-center space-y-1">
          <p className="font-semibold text-base">{formatCurrency(price)}</p>
          {discountPrice ? (
            <p className="text-sm line-through text-[#827db1]">
              {formatCurrency(discountPrice)}
            </p>
          ) : (
            <p className="opacity-0 text-sm line-through">null</p>
          )}
        </div>
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:space-y-3">
          <div className="lg:w-[90%] flex justify-between items-center space-x-1 ">
            <AddToCart product={product} />

            <div className="flex gap-4">
              <AddFavourite product={product} />

              <Button
                className="rounded-full bg-white p-2 shadow-lg border border-gray-200 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareProduct();
                }}
              >
                <span className="sr-only">Share this product</span>
                <Share2 className="text-black" size="15px" />
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="bg-[#FFDE11] flex items-center space-x-2 px-2 pr-6 rounded-[20px] w-fit">
          <AddToCart />
          <p>Add to cart</p>
        </div> */}
      </div>
    </article>
  );

  return <>{isLoading ? <Skeleton /> : <Content />}</>;
};

export default ProductCard;
