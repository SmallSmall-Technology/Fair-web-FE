import { useSelector } from 'react-redux';
import ProductCard from '../../../utils/ProductCard';
import { getRecentlyViewed } from '../../../features/product/recentlyViewedSlice';

const RecentlyViewedProducts = () => {
  const recentlyViewed = useSelector(getRecentlyViewed);
  return (
    <section className="px-4 py-8 lg:mx-10 my-10">
      {recentlyViewed.length !== 0 && (
        <div className="flex justify-between mb-4">
          <p className="font-semibold">Your recently viewed Items</p>
          <a href="" className="underline">
            View all
          </a>
        </div>
      )}
      {recentlyViewed.length !== 0 && (
        <div className="grid gap-3 md:flex lg:space-x-2">
          {recentlyViewed.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyViewedProducts;
