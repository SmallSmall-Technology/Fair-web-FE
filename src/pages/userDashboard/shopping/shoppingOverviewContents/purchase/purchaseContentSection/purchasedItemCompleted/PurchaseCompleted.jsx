import { useSelector } from 'react-redux';
import { SingleCompletedPurchasedItem } from './SingleCompletedPurchasedItem';
import { getCompletedOrders } from '../../../../../../../features/order/orderSlice';

const PurchaseCompleted = () => {
  const completedOrders = useSelector(getCompletedOrders);
  return (
    <section>
      {completedOrders.length < 1 ? (
        <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
          No completed orders were found
        </p>
      ) : (
        <div>
          {completedOrders.map((item, index) => (
            <div key={item.id || index}>
              <SingleCompletedPurchasedItem item={item} key={index} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PurchaseCompleted;
