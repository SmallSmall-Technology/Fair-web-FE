import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SingleRecentlyViewed } from './SingleRecentlyViewed';
import { getRecentlyViewed } from '../../../../../features/product/recentlyViewedSlice';

export const RecentlyViewedSummary = () => {
  const recentlyViewed = useSelector(getRecentlyViewed);

  return (
    <div className="lg:w-1/2">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4">Recently viewed</h1>
        <Link
          to="/user-dashboard/shopping-overview/recently-viewed"
          className="underline font-medium text-[#737376] text-sm"
        >
          {recentlyViewed.length < 1 ? '' : 'See all'}
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px]">
        {recentlyViewed.length === 0 ? (
          <p className="text-[#A6A6A6] bg-[#F6F6F6] p-4 py-6 rounded-[10px]">
            No recently viewed items
          </p>
        ) : (
          recentlyViewed.slice(0, 2).map((item, index) => (
            <div key={item.productID}>
              <ul className="recently-viewed p-2">
                <SingleRecentlyViewed item={item} />
              </ul>
              {index === 0 && <hr className="border-t border-gray-200 mx-2" />}
            </div>
          ))
        )}
      </section>
    </div>
  );
};
