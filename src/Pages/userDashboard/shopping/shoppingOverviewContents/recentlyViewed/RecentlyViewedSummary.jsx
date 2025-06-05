import { useSelector } from 'react-redux';
import { getRecentlyViewed } from '../../../../../features/product/recentlyViewedSlice';
import { Link } from 'react-router-dom';
import { SingleRecentlyViewed } from './SingleRecentlyViewed';

export const RecentlyViewedSummary = () => {
  const recentlyViewed = useSelector(getRecentlyViewed);
  return (
    <div className="lg:w-1/2">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4"> Recently viewed</h1>
        <Link
          to="/user-dashboard/shopping-overview/recently-viewed"
          className="underline font-medium text-[#737376] text-sm"
        >
          {recentlyViewed < 1 ? '' : 'See all'}
        </Link>
      </div>
      <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px] p-2">
        {recentlyViewed.length === 0 ? (
          <p className="text-center text-gray-500">No recently viewed items</p>
        ) : (
          recentlyViewed.slice(0, 2).map((item, index) => (
            <ul key={index} className="recently-viewed">
              <SingleRecentlyViewed item={item} key={item.id} />
            </ul>
          ))
        )}
      </section>
    </div>
  );
};
