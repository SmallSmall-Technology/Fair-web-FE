import { useDispatch, useSelector } from 'react-redux';
import { YellowButton } from '../../../../../utils/Button';
import { SingleRecentlyViewed } from './SingleRecentlyViewed';
import {
  clearRecentlyViewed,
  getRecentlyViewed,
} from '../../../../../features/product/recentlyViewedSlice';

const RecentlyViewed = () => {
  const recentlyViewed = useSelector(getRecentlyViewed);
  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(clearRecentlyViewed());
  };

  return (
    <section>
      <div className="flex ml-auto w-fit mb-4">
        {recentlyViewed.length > 0 && (
          <YellowButton
            onClick={handleClearAll}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Clear all
          </YellowButton>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-4 lg:overflow-y-auto lg:h-96 w-full rounded-[10px]">
        {recentlyViewed.length === 0 ? (
          <p className="text-center text-gray-500">No recently viewed items</p>
        ) : (
          recentlyViewed.map((item, index) => (
            <SingleRecentlyViewed key={index} item={item} />
          ))
        )}
      </ul>
    </section>
  );
};

export default RecentlyViewed;
