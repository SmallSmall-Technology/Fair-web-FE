import { useOrders } from '../../useOrders';
import { PendingOrdersCard } from './PendingOrdersCard';

export const PurchasePending = () => {
  const { pendingOrders, isFetching, refetchOrders } = useOrders();

  return (
    <div>
      <section>
        {isFetching ? (
          <p>Loading...</p>
        ) : pendingOrders.length > 0 ? (
          pendingOrders.map((order) => (
            <PendingOrdersCard key={order.id} order={order} />
          ))
        ) : (
          <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
            No pending orders were found
          </p>
        )}
      </section>
    </div>
  );
};
