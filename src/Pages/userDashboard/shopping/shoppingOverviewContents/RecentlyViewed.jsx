import { useDispatch, useSelector } from 'react-redux';
import {
  clearRecentlyViewed,
  getRecentlyViewed,
} from '../../../../features/product/recentlyViewedSlice';
import { formatCurrency } from '../../../../utils/FormatCurrency';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { YellowButton } from '../../../../utils/Button';

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

export const SingleRecentlyViewed = ({ item }) => {
  return (
    <li className="recentlyviewed-item grid grid-cols-1 gap-3">
      <Link to={`/user-dashboard/${item.id}/${item.slug}`}>
        <div className="flex items-center py-3 px-2 justify-between text-balance">
          <div className="flex items-center space-x-2">
            <div className="h-[60px] w-[60px]">
              <img
                src={item.image || '/placeholder-image.jpg'}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div>
              <p className="mb-3 font-medium">
                {item.name.length > 30
                  ? item.name.slice(0, 30) + '...'
                  : item?.name || 'Unnamed Product'}
              </p>
              <p className="">
                {item.price
                  ? `${formatCurrency(item.price)}`
                  : 'Price not available'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end ">
            <button className="mb-3">
              <ChevronRight className="cursor-pointer" size={24} />
            </button>
            <p className="flex flex-nowrap text-xs text-[#222224]">
              {item.date || 'Jan 13, 2025'}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

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
