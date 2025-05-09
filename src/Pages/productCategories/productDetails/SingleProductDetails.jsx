import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProductImage } from '../ProductImage';
import { products } from '../../../utils/data';
import ProductCard from '../../../utils/ProductCard';
import { NavLink, useNavigate } from 'react-router-dom';
import CommentBar from '../../../features/reviewsRating/CommentBar';
import { AddFavourite } from '../../../features/favourite/AddFavourite';
import { SingleProductDetailsAside } from './SingleProductDetailsAside';
import { FullPayment } from './productPlan/FullPaymentPlan/FullPayment';
import { getSelectedPaymentPlan } from '../../../features/cart/cartSlice';
import { DailyPayment } from './productPlan/DailyPaymentPlan/DailyPayment';
import { handleShareProduct } from '../../../features/product/ShareProduct';
import { WeeklyPayment } from './productPlan/WeeklyPaymentPlan/WeeklyPayment';
import { MonthlyPayment } from './productPlan/MonthlyPaymentPlan/MonthlyPayment';

export const SingleProductDetails = React.memo(({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const selectedPaymentPlan = useSelector(getSelectedPaymentPlan);

  const navigate = useNavigate();

  const productImages = [
    product?.image || '',
    product?.image || '',
    product?.image || '',
    product?.image || '',
    product?.image || '',
  ];

  const category = product?.category || '';
  const shippingDate = '20 Jan, 2025';

  if (!product || !product.image) return <div>Product not found</div>;

  const SingleProductDetails = () => (
    <>
      <div className="hidden xl:flex justify-end space-x-2 mb-3 px-5 xl:mx-0">
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
      <div className="flex flex-wrap w-full justify-between gap-2 lg:px-4">
        <main className="w-full lg:w-full xl:w-[52%] mx-5 md:mx-0">
          <div className="flex justify-between items-center md:items-start gap-5 md:mb-20">
            <aside className="w-[100px] hidden md:grid">
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
            <main className="flex-1">
              <div className="hidden md:bg-[#F2F2F2] rounded-2xl w-full h-[363px] md:h-[589px] xl:w-[589px] md:flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.slug}
                  className="w-full xl:w-[487px] xl:h-[487px] object-cover"
                />
              </div>
              <section className="relative flex justify-center mb-8 md:hidden">
                <div
                  className="flex w-full md:hidden overflow-hidden h-[363px]"
                  aria-live="polite"
                  role="group"
                  aria-roledescription="carousel"
                >
                  {productImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className={`absolute h-full w-full transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      alt={`Product image ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-2 flex justify-center space-x-4 bg-[#323232] w-fit p-1 rounded-xl">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-[#FFFFFF] scale-125'
                          : 'bg-[#A3A3A2]'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ')
                          setCurrentIndex(index);
                      }}
                      aria-label={`Go to image ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="absolute bottom-0 right-0 md:hidden w-fit shadow-[2px_4px_7px_1px_rgba(0,0,0,0.2)] ml-auto p-2 flex items-center rounded-[10px]">
                  <AddFavourite product={product} />
                </div>
              </section>
            </main>
          </div>
          <section className="hidden xl:grid mt-8">
            <p className="font-semibold text-xl mb-4">
              Customer ratings and review
            </p>
            <CommentBar />
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
            {selectedPaymentPlan === 'upfront' && (
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
          // selectPlan={selectedPaymentPlan}
        />
      </div>
      <section className="mb-24 mx-5 xl:mx-0">
        <div className="mt-8 flex justify-between items-center mb-6">
          <p className="text-xl font-semibold">You may also like</p>
          <NavLink to="/related-products" className="underline">
            See more
          </NavLink>
        </div>

        <div className="grid grid-flow-col space-x-4 w-full overflow-x-scroll scrollbar-hide scroll-smooth">
          {products
            .filter((prod) => prod.category === category)
            .map((prod, id) => (
              <ProductCard product={prod} key={id} />
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

export default SingleProductDetails;
