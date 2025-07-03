import { useState } from 'react';
import { useSelector } from 'react-redux';
import { PurchasedItemOngoing } from './PurchasedItemOngoing';
import { Pagination } from '../../../../../../productCategories/Pagination';
import { getOngoingOrders } from '../../../../../../../features/order/orderSlice';

const PurchaseItemsOngoing = () => {
  const ongoingOrders = useSelector(getOngoingOrders);
  const [expandedIndex, setExpandedIndex] = useState(null);
  // const orderItems = item.items || [];

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

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
              <PurchasedItemOngoing
                item={item}
                // onToggleExpand={toggleExpand}
                // expandedIndex={expandedIndex}
                // setExpandedIndex={setExpandedIndex}
              />
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
