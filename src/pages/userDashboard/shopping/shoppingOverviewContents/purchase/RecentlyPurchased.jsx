import { Link } from 'react-router-dom';
import { useOrders } from './useOrders';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const RecentlyPurchased = () => {
  const { completedOrders } = useOrders();

  // Flatten all items from all orders into a single array
  const allCompletedOrders = completedOrders.flatMap((order) => order.items);

  const hasOrders =
    Array.isArray(allCompletedOrders) && allCompletedOrders.length > 0;

  return (
    <div className="mb-4 lg:w-1/2">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4">Recent Purchases</h1>
        {hasOrders && (
          <Link
            to="/user-dashboard/shopping-overview/purchases"
            className="underline font-medium text-[#737376] text-sm"
          >
            See all
          </Link>
        )}
      </div>

      <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px]">
        {!hasOrders ? (
          <p className="text-[#A6A6A6] bg-[#F6F6F6] p-4 py-6 rounded-[10px]">
            No recently purchased items
          </p>
        ) : (
          allCompletedOrders.slice(0, 2).map((product, index) => (
            <div key={product.productID || index}>
              <ul className="recently-viewed p-2">
                <SingleRecentlyPurchased product={product} />
              </ul>
              {index === 0 && <hr className="border-t border-gray-200 mx-2" />}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

const SingleRecentlyPurchased = ({ product }) => {
  console.log('single product', product);

  return (
    <li className="recentlyviewed-item grid grid-cols-1 gap-3">
      <Link to={`/user-dashboard/shopping-overview/purchases`}>
        <div className="flex items-center py-3 px-2 justify-between text-balance">
          <div className="flex items-center space-x-3">
            <div className="h-[60px] w-[60px] border rounded-xl flex justify-center items-center">
              <img
                src={product?.coverImage || '/placeholder-image.jpg'}
                className="h-[44px] w-[44px] rounded-lg object-cover"
                alt={product?.name || 'Product image'}
              />
            </div>
            <div>
              <p className="mb-1 md:mb-3 font-medium">
                {product?.productName?.length > 30
                  ? product.productName.slice(0, 30) + '...'
                  : product?.productName || 'Unnamed Product'}
              </p>
              <p className="mb-1 font-normal text-sm">
                {product?.totalAmount
                  ? formatCurrency(product.totalAmount)
                  : 'Price not available'}
              </p>
              <p className="lg:hidden flex-nowrap text-xs text-[#222224]">
                {product?.orderDate || ''}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <button className="mb-6 lg:mb-3">
              <ChevronRight className="cursor-pointer" size={24} />
            </button>
            <p className="hidden lg:flex flex-nowrap text-xs text-[#222224]">
              {product?.orderDate || ''}
            </p>
            <p className="lg:hidden text-[#3DB54A] font-medium text-xs">
              Delivered
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
