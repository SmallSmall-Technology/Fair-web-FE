import { useSelector } from 'react-redux';
import ProductCard from '../../../utils/ProductCard';
import { getRecentlyViewed } from '../../../features/product/recentlyViewedSlice';
import { Link } from 'react-router-dom';

const RecentlyViewedProducts = () => {
  const recentlyViewed = useSelector(getRecentlyViewed);
  return (
    <section className="md:px-4 py-8 lg:mx-10 my-10">
      {recentlyViewed.length !== 0 && (
        <div className="flex justify-between mb-4">
          <p className="font-calsans font-normal">Your recently viewed Items</p>
          <Link
            to="/user-dashboard/shopping-overview/recently-viewed"
            className="underline font-inter"
          >
            View all
          </Link>
        </div>
      )}
      {recentlyViewed.length !== 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:flex flex-wrap lg:space-x-2">
          {recentlyViewed.slice(0, 5).map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyViewedProducts;
