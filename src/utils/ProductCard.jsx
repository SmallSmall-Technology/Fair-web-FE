/* eslint-disable react/prop-types */
import { Button } from './Button';
import { useDispatch } from 'react-redux';
import { Image as ImageIcon, Share2, Star } from 'lucide-react';
import { formatCurrency } from './FormatCurrency';
import React, { useCallback } from 'react';
import { AddToCart } from '../features/cart/AddToCart';
import { AddFavourite } from '../features/favourite/AddFavourite';
import { handleShareProduct } from '../features/product/ShareProduct';
import { addItemToRecentlyViewed } from '../features/product/recentlyViewedSlice';
import { Link, useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleProduct } from '../api/product-api';

const TransitionLink = ({ to, children, className, ...props }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      startTransition(() => {
        navigate(to);
      });
    },
    [navigate, to]
  );

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

const ProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();
  // console.log('Product Card:', product);
  const handleAddToRecentlyViewed = () => {
    dispatch(addItemToRecentlyViewed(product));
  };

  const {
    productID,
    productName,
    coverImage,
    fairAppPrice,
    slug,
    minimumDownPaymentPercentage,
  } = product || {};

  const { data, isError } = useQuery({
    queryKey: ['product-card', productID],
    queryFn: () => fetchSingleProduct(productID),
    enabled: !!productID,
    refetchOnWindowFocus: false,
  });

  const category = data?.produtCategory.parent_category?.slug;
  const sub_category = data?.produtCategory?.name;

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
          <div className="bg-gray-200 w-[51px] h-6 rounded-[20px] animate-pulse" />
        </div>
        <div className="flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
          <div className="w-full h-3/4 bg-gray-200 rounded animate-pulse mt-10" />
        </div>
      </div>
      <div className="grid grid-cols-1 space-y-2 w-[146px] md:w-[218px] mt-2 px-2">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="flex flex-col space-y-2">
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
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
      aria-label={`Product: ${productName}`}
      style={cardStyles.transform}
      onClick={handleAddToRecentlyViewed}
    >
      <TransitionLink
        to={`/${category}/${sub_category}/${productID}/${slug}`}
        className="block"
      >
        <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl cursor-pointer flex justify-center items-center">
          <div className="absolute top-3 flex justify-between w-full px-3">
            <p className="bg-white p-1 font-medium text-[10px] lg:text-xs">
              <span>{minimumDownPaymentPercentage}% downpayment</span>
            </p>
          </div>
          <div className="flex justify-center items-center mx-auto w-[78px] h-[78px] lg:w-[111px] lg:h-[111px] mt-3">
            {!isLoading ? (
              <img
                src={coverImage}
                alt={productName}
                loading="lazy"
                className="h-[100%] w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-fit w-full mt-10 object-contain" />
            )}
          </div>
        </div>
      </TransitionLink>
      <div className="grid grid-cols-1 space-y-2 text-[#222224] w-[146px] md:w-[218px] mt-2 px-2">
        <TransitionLink
          to={`/${productID}`}
          className="hover:underline focus:underline focus:outline-none"
        >
          {/* <p className="text-xs lg:text-sm font-normal leading-[16.94px] min-h-12 cursor-pointer overflow-hidden lg:overflow-visible line-clamp-2 lg:line-clamp-none"> */}
          <p className="text-xs lg:text-sm font-normal min-h-10">
            {productName?.length > 50
              ? productName.slice(0, 30) + '...'
              : productName}
          </p>
        </TransitionLink>
        <div className="flex items-center lg:space-x-1">
          <Star fill="black" size={14} aria-hidden="true" />
          <p className="text-sm">{/* {ratings} ({noOfProductSold}) */}</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-2 lg:items-center space-y-1">
          <p className="font-semibold text-base">
            {formatCurrency(fairAppPrice)}
          </p>
          {/* {discountPrice ? (
            <p className="text-sm line-through text-[#827db1]">
              {formatCurrency(discountPrice)}
            </p>
          ) : (
            <p className="opacity-0 text-sm line-through">null</p>
          )} */}
        </div>
        <div className="flex items-center justify-between lg:flex-col lg:items-start lg:space-y-3">
          <div className="lg:w-[90%] flex justify-between items-center space-x-1">
            <AddToCart product={product} />
            <div className="flex gap-1">
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
      </div>
    </article>
  );

  return <>{isLoading ? <Skeleton /> : <Content />}</>;
};

export default ProductCard;
