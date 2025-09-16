import { useState } from 'react';
import { PurchasedItemOngoing } from './PurchasedItemOngoing';
import { Pagination } from '../../../../../../productCategories/Pagination';

const PurchaseItemsOngoing = ({ onGoingOrders, isFetching }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section>
      {isFetching ? (
        <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
          Loading ongoing orders...
        </p>
      ) : onGoingOrders.length === 0 ? (
        <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
          No ongoing orders were found
        </p>
      ) : (
        <div>
          {onGoingOrders.map((orders, index) => (
            <div key={orders.id || index}>
              <PurchasedItemOngoing orders={orders || []} />
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
