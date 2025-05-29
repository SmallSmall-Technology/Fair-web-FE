import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getCompletedOrders } from '../../../../../features/order/orderSlice';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const RecentlyPurchased = () => {
  const recentlyPurchased = useSelector(getCompletedOrders);
  return (
    <div className="mb-4 lg:w-1/2">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4"> Recently Purchased</h1>
        <Link
          to="/user-dashboard/shopping-overview/purchased"
          className="underline font-medium text-[#737376] text-sm"
        >
          {recentlyPurchased < 1 ? '' : 'See all'}
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px] p-2">
        {recentlyPurchased.length === 0 ? (
          <p className="text-center text-gray-500">
            No recently purchased item
          </p>
        ) : (
          recentlyPurchased.slice(0, 2).map((item, index) => (
            <ul key={index}>
              <SingleRecentlyPurchased items={item} key={item.id} />
            </ul>
          ))
        )}
      </section>
    </div>
  );
};

const SingleRecentlyPurchased = ({ items }) => {
  const item = items.items;
  return (
    <li className="recentlyviewed-item grid grid-cols-1 gap-3">
      {item.map((product, index) => (
        <div key={index}>
          <Link>
            <div className="flex items-center py-3 px-2 justify-between text-balance">
              <div className="flex items-center space-x-3">
                <div className="h-[60px] w-[60px]">
                  <img
                    src={product?.image || '/placeholder-image.jpg'}
                    className="h-full w-full rounded-lg object-cover"
                    alt={product?.name}
                  />
                </div>
                <div>
                  <p className="mb-3 font-medium">
                    {product.name.length > 30
                      ? product.name.slice(0, 30) + '...'
                      : product?.name || 'Unnamed Product'}
                  </p>
                  <p className="">
                    {product?.price
                      ? `${formatCurrency(product.price)}`
                      : 'Price not available'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end ">
                <button className="mb-3">
                  <ChevronRight className="cursor-pointer" size={24} />
                </button>
                <p className="flex flex-nowrap text-xs text-[#222224]">
                  {items?.orderDate || ''}
                </p>
              </div>
            </div>
          </Link>
          <hr />
        </div>
      ))}
      <div className="bg-red-500 w-full summary-line"></div>
    </li>
  );
};
