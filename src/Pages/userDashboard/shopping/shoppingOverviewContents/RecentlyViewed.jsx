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
            <div className="h-24 min-w-24 max-w-24">
              <img
                src={item.image || '/placeholder-image.jpg'}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div>
              <p className="mb-4 font-medium">
                {item.name || 'Unnamed Product'}
              </p>
              <p className="text-gray-600">
                {item.price
                  ? `${formatCurrency(item.price)}`
                  : 'Price not available'}
              </p>
            </div>
          </div>
          <button>
            <ChevronRight className="cursor-pointer" />
          </button>
          {/* <p></p> */}
        </div>
      </Link>

      <hr className="mx-2" />
    </li>
  );
};
