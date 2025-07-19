import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SingleRecentlyViewed = ({ item }) => {
  return (
    <li className="recentlyviewed-item grid grid-cols-1 gap-3">
      <Link to={`/user-dashboard/${item.id}/${item.slug}`}>
        <div className="flex items-center py-3 px-2 justify-between text-balance">
          <div className="flex items-center space-x-2">
            <div className="h-[60px] w-[60px] border rounded-xl flex justify-center items-center">
              <img
                src={item?.image || '/placeholder-image.jpg'}
                className="h-[44px] w-[44px] rounded-lg object-cover"
                alt={item?.productName}
              />
            </div>
            <div>
              <p className="mb-3 font-medium">
                {item.productName.length > 30
                  ? item.productName.slice(0, 30) + '...'
                  : item?.productName || 'Unnamed Product'}
              </p>
              <p className="">
                {item.fairAppPrice
                  ? `${formatCurrency(item.fairAppPrice)}`
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
