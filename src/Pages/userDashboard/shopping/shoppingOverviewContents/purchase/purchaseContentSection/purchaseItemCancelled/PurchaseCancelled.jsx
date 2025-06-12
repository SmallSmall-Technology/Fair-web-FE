import { PurchasedItemCancelled } from './PurchasedItemCancelled';

const PurchaseCancelled = ({ orders }) => {
  const cancelledOrders = orders || [];

  return (
    <section>
      {cancelledOrders.length < 1 ? (
        <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
          No cancelled orders were found
        </p>
      ) : (
        <div>
          {cancelledOrders.map((item, index) => (
            <div key={item.id || index}>
              <PurchasedItemCancelled item={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PurchaseCancelled;
