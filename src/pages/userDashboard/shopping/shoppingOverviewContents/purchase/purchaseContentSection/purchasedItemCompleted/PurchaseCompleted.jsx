import { useState } from 'react';
import { SingleCompletedPurchasedItem } from './SingleCompletedPurchasedItem';

const PurchaseCompleted = ({ completedOrders }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section>
      {completedOrders.length < 1 ? (
        <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
          No completed orders were found
        </p>
      ) : (
        <div>
          {expandedIndex !== null ? (
            // Render only the expanded order
            <SingleCompletedPurchasedItem
              orders={completedOrders[expandedIndex]}
              index={expandedIndex}
              toggleExpand={toggleExpand}
              expandedIndex={expandedIndex}
            />
          ) : (
            //  Render all in collapsed view when none is expanded
            completedOrders.map((orders, index) => (
              <SingleCompletedPurchasedItem
                key={orders.orderNumber || index}
                orders={orders}
                index={index}
                toggleExpand={toggleExpand}
                expandedIndex={expandedIndex}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default PurchaseCompleted;
