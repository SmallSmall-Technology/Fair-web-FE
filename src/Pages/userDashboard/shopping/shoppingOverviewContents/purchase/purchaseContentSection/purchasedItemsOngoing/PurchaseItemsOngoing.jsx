import { useSelector } from 'react-redux';
import { getOngoingOrders } from '../../../../../../../features/order/orderSlice';
import { PurchasedItem } from './PurchasedItem';
import { Pagination } from '../../../../../../productCategories/Pagination';

const PurchaseItemsOngoing = () => {
  const ongoingOrders = useSelector(getOngoingOrders);

  return (
    <section>
      {ongoingOrders.length < 1 ? (
        <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
          No ongoing orders were found
        </p>
      ) : (
        <div>
          {ongoingOrders.map((item, index) => (
            <div key={item.id || index}>
              <PurchasedItem item={item} />
            </div>
          ))}
          <div className="flex justify-center md:justify-end mt-10">
            <Pagination />
          </div>
        </div>
      )}
    </section>
  );
};

export default PurchaseItemsOngoing;
