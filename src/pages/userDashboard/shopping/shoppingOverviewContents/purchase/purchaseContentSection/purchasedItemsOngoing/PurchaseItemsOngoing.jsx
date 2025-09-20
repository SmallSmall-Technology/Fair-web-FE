import { useState } from 'react';
import { PurchasedItemOngoing } from './PurchasedItemOngoing';
import { Pagination } from '../../../../../../productCategories/Pagination';

const PurchaseItemsOngoing = ({ onGoingOrders, isFetching }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
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
          {expandedIndex !== null ? (
            // Show only the expanded order
            <PurchasedItemOngoing
              orders={onGoingOrders[expandedIndex]}
              index={expandedIndex}
              toggleExpand={toggleExpand}
              expandedIndex={expandedIndex}
            />
          ) : (
            // Show all in collapsed view when none is expanded
            onGoingOrders.map((orders, index) => (
              <PurchasedItemOngoing
                key={orders.orderNumber || index}
                orders={orders}
                index={index}
                toggleExpand={toggleExpand}
                expandedIndex={expandedIndex}
              />
            ))
          )}

          <div className="flex justify-center md:justify-end mt-10">
            <Pagination />
          </div>
        </div>
      )}
    </section>
  );
};

export default PurchaseItemsOngoing;
