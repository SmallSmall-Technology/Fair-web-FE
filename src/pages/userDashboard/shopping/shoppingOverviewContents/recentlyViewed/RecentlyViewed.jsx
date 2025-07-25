import { useSelector } from 'react-redux';
import { getRecentlyViewed } from '../../../../../features/product/recentlyViewedSlice';
import ProductCard from '../../../../../utils/ProductCard';

const RecentlyViewed = () => {
  const recentlyViewed = useSelector(getRecentlyViewed);

  return (
    <section>
      <div className="flex mx-auto w-full">
        {recentlyViewed <= 0 && (
          <div className="bg-[#F6F6F6] w-full h-[141px] flex items-center justify-center rounded-[6px]">
            <p className="font-medium">No recently viewed product</p>
          </div>
        )}
      </div>

      {!recentlyViewed.length !== 0 && (
        <>
          <h1 className="font-semibold text-[23px] mb-3">Recently viewed</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:flex flex-wrap lg:space-x-2">
            {recentlyViewed.slice(0, 5).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default RecentlyViewed;
