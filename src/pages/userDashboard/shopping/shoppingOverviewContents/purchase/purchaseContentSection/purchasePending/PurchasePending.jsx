import { useOrders } from '../../useOrders';

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

const PendingOrdersCard = ({ order }) => {
  return (
    <div className="border p-4 rounded-md mb-4">
      <div className="flex justify-between">
        <div>
          <p className="text-[11px]">Order number</p>
          <h3 className="text-base font-bold">
            {order?.items?.[0]?.orderID ?? 'N/A'}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          {new Date(order?.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <p className="text-[11px]">Order amount</p>
        <h3 className="text-sm font-medium">{order?.totalAmount}</h3>
      </div>

      <div>
        <p className="text-[11px]">Item</p>
        <h3 className="text-sm font-medium">{order?.productName}</h3>
      </div>

      <p className="font-medium text-[13px]">Your order is being processed</p>
      <p className="text-gray-600">Direct debit status: {order?.orderStatus}</p>
    </div>
  );
};
