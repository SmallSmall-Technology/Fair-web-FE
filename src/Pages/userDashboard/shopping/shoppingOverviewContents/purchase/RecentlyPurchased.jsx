import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';
import { getCompletedOrders } from '../../../../../features/order/orderSlice';

export const RecentlyPurchased = () => {
  const recentlyPurchased = useSelector(getCompletedOrders);
  return (
    <div className="mb-4 lg:w-1/2">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4"> Recent Purchased</h1>
        <Link
          to="/user-dashboard/shopping-overview/purchases"
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
                <div className="h-[60px] w-[60px] border rounded-xl flex justify-center items-center">
                  <img
                    src={product?.image || '/placeholder-image.jpg'}
                    className="h-[44px] w-[44px] rounded-lg object-cover"
                    alt={product?.name}
                  />
                </div>
                <div>
                  <p className="mb-1 md:mb-3 font-medium">
                    {product.name.length > 30
                      ? product.name.slice(0, 30) + '...'
                      : product?.name || 'Unnamed Product'}
                  </p>
                  <p className="mb-1 font-normal text-sm">
                    {product?.price
                      ? `${formatCurrency(product.price)}`
                      : 'Price not available'}
                  </p>
                  <p className="lg:hidden flex-nowrap text-xs text-[#222224]">
                    {items?.orderDate || ''}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end ">
                <button className="mb-6 lg:mb-3">
                  <ChevronRight className="cursor-pointer" size={24} />
                </button>
                <p className="hidden lg:flex flex-nowrap text-xs text-[#222224]">
                  {items?.orderDate || ''}
                </p>
                <p className="lg:hidden text-[#3DB54A] font-medium text-xs">
                  Delivered
                </p>
              </div>
            </div>
          </Link>
          {/* <hr /> */}
        </div>
      ))}
      <div className="bg-red-500 w-full summary-line"></div>
    </li>
  );
};
