import React, { lazy, Suspense, useRef, useState } from 'react';

const TodaysDeal = lazy(
  () => import('./homeLivingLandingPage/homeLivingContentSection/TodaysDeal')
);

const NewProductsInStore = lazy(
  () =>
    import(
      './homeLivingLandingPage/homeLivingContentSection/NewProductsInStore'
    )
);

export const Products = () => {
  const [newProductsScroll, setNewProductsScroll] = useState(0);
  const [todaysDealScroll, setTodaysDealScroll] = useState(0);
  const [count, setCount] = useState(1);

  const newProductsRef = useRef(null);
  const todaysDealRef = useRef(null);

  const item_width = 136;

  const handleScroll = (ref, setScroll, scrollAmount) => {
    if (ref.current) {
      const newScrollPosition = ref.current.scrollLeft + scrollAmount;
      ref.current.scrollLeft = newScrollPosition;
      setScroll(newScrollPosition);
    }
  };
  return (
    <section className="mx-6 md:mx-[76px]">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        }
      >
        <NewProductsInStore
          count={count}
          onScrollProduct={(scrollAmount) =>
            handleScroll(newProductsRef, setNewProductsScroll, scrollAmount)
          }
          item_width={item_width}
          containerRef={newProductsRef}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        }
      >
        <TodaysDeal
          onScrollProduct={(scrollAmount) =>
            handleScroll(todaysDealRef, setTodaysDealScroll, scrollAmount)
          }
          item_width={item_width}
          containerRef={todaysDealRef}
        />
      </Suspense>
    </section>
  );
};

export default Products;

const cardStyles = {
  base: 'w-fit rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:pb-[1px]',
  transform: { transform: 'scale(1)', transformOrigin: 'center' },
};

const discountPrice = 1;

const Skeleton = () => (
  <article
    className={cardStyles.base}
    tabIndex={0}
    role="article"
    aria-label={`Loading product`}
    style={cardStyles.transform}
    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
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
