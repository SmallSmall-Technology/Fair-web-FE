/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HeartHandshake } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../../utils/ProductCard';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CommentBar from '../../../features/reviewsRating/CommentBar';
import { AddFavourite } from '../../../features/favourite/AddFavourite';
import { SingleProductDetailsAside } from './SingleProductDetailsAside';
import { FullPayment } from './productPlan/FullPaymentPlan/FullPayment';
import { getSelectedPaymentPlan } from '../../../features/cart/cartSlice';
import { DailyPayment } from './productPlan/DailyPaymentPlan/DailyPayment';
import { handleShareProduct } from '../../../features/product/ShareProduct';
import { WeeklyPayment } from './productPlan/WeeklyPaymentPlan/WeeklyPayment';
import { MonthlyPayment } from './productPlan/MonthlyPaymentPlan/MonthlyPayment';
import { fetchProductsByCategoryAndSubcategory } from '../../../api/product-api';
import { ProductThumbnails } from './ProductThumbnails';

export const SingleProductDetails = React.memo(function SingleProductDetails({
  product,
  category,
  subcategory,
}) {
  if (!product) return <div className="skeleton w-full h-screen"></div>;

  const navigate = useNavigate();
  const selectedPaymentPlan = useSelector(getSelectedPaymentPlan);
  const [selectedImage, setSelectedImage] = useState(product?.mainImage || '');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['relatedProducts', category, subcategory],
    queryFn: () => fetchProductsByCategoryAndSubcategory(category, subcategory),
  });
  const relatedProducts = data?.data?.products;

  const shippingDate = '20 Jan, 2025';

  const SingleProductDetails = () => (
    <>
      {product?.inStock === true && (
        <div className="hidden xl:flex justify-end lg:space-x-2 mb-3 px-5 xl:mx-0">
          <p className="flex items-center text-sm text-[#222224] cursor-pointer">
            Add to favorite{' '}
            <span className="pl-1">
              <AddFavourite product={product} />
            </span>
          </p>
          <button
            className="flex items-center text-sm text-[#222224] cursor-pointer"
            onClick={() => handleShareProduct(product)}
          >
            <span>Share</span>
            <span className="pl-1">
              <img src="/images/share-square.svg" alt="A share icon" />
            </span>
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[50%_45%] lg:space-x-10 flex-wrap w-full justify-between gap-2 lg:px-4">
        <main className="grid gap-4 mx-5 lg:mx-0">
          <div className="flex justify-between items-center lg:items-start gap-5 lg:mb-20">
            <ProductThumbnails
              product={product}
              onHoverImage={setSelectedImage}
            />
            <section className="flex-1 ">
              <div className="md:hidden w-full justify-center items-center">
                <img
                  src={product?.coverImage}
                  alt={product?.slug}
                  className="w-full  object-cover"
                />
              </div>

              <div className="hidden md:bg-[#F2F2F2] rounded-2xl w-full h-[363px] lg:h-[589px] lg:w-[589px] md:flex justify-center items-center">
                <img
                  src={selectedImage || product.coverImage}
                  alt={product?.slug}
                  className="w-full lg:w-[487px] lg:h-[487px] object-cover"
                />
              </div>
              {/* <section className="relative flex justify-center mb-8 md:hidden bg-slate-500">
                <div
                  className="flex w-full md:hidden overflow-hidden h-[363px]"
                  aria-live="polite"
                  role="group"
                  aria-roledescription="carousel"
                ></div>
                <div className="absolute bottom-2 flex justify-center space-x-4 bg-[#323232] w-fit p-1 rounded-xl"></div>
                <div className="absolute bottom-0 right-0 md:hidden w-fit shadow-[2px_4px_7px_1px_rgba(0,0,0,0.2)] ml-auto p-2 flex items-center rounded-[10px]">
                  <AddFavourite product={product} />
                </div>
              </section> */}
            </section>
          </div>
          <section className="hidden xl:grid mt-8">
            <p className="font-inter font-semibold text-lg mb-4">
              Customer ratings and review
            </p>
            <CommentBar product={product} />
          </section>
          <div className="hidden lg:block">
            {selectedPaymentPlan === 'daily' && (
              <>
                <WeeklyPayment product={product} />
                <MonthlyPayment product={product} />
                <FullPayment product={product} />
              </>
            )}
            {selectedPaymentPlan === 'weekly' && (
              <>
                <DailyPayment product={product} />
                <MonthlyPayment product={product} />
                <FullPayment product={product} />
              </>
            )}
            {selectedPaymentPlan === 'monthly' && (
              <>
                <DailyPayment product={product} />
                <WeeklyPayment product={product} />
                <FullPayment product={product} />
              </>
            )}
            {selectedPaymentPlan === 'full' && (
              <>
                <DailyPayment product={product} />
                <WeeklyPayment product={product} />
                <MonthlyPayment product={product} />
              </>
            )}
          </div>
        </main>
        <SingleProductDetailsAside
          product={product}
          shippingDate={shippingDate}
          category={category}
        />
      </div>

      <section className="md:hidden">
        <div className="w-full h-[6px] bg-[#E5E5E5]"></div>

        <div className="flex items-start space-x-2 my-5 mx-4">
          <HeartHandshake size={24} />
          <div>
            <p className="font-medium text-[13px] mb-3">
              Fair purchase protection
            </p>
            <p className="text-xs max-w-80">
              Shop confidently on Fair knowing if something goes wrong with an
              order, we've got your back for all eligible purchases.
              <Link to="" className="font-medium underline ml-1">
                See purchase terms
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full h-[6px] bg-[#E5E5E5]"></div>
      </section>

      <section className="mt-14 font-inter mb-24 mx-5 xl:mx-0">
        <div className=" flex justify-between items-center mb-6">
          <p className="text-2xl font-semibold">You may also like</p>
          <NavLink to={`/${category}/${subcategory}`} className="underline">
            See more
          </NavLink>
        </div>

        <div className="grid grid-flow-col space-x-4 w-full overflow-x-scroll scrollbar-hide scroll-smooth">
          {relatedProducts?.map((prod, productID) => (
            <ProductCard product={prod} key={productID} isLoading={isLoading} />
          ))}
        </div>
      </section>
      <section className="hidden xl:block">
        <h2 className="font-semibold text-2xl">Explore related searches</h2>
        <p className="text-[13px] mt-4 mb-20">Fridge 200 litre</p>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-[#DB1C5E] text-[13px] underline"
            onClick={() => {
              navigate(-1);
              window.location.reload();
            }}
          >
            Back previous page
          </button>
          <button
            type="submit"
            className="text-[13px] underline"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Return to top
          </button>
        </div>
      </section>
    </>
  );

  return (
    <>
      <SingleProductDetails />
    </>
  );
});
SingleProductDetails.displayName = 'SingleProductDetails';

SingleProductDetails.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    slug: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  category: PropTypes.string.isRequired,
};

export default SingleProductDetails;
