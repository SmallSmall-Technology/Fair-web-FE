export const PurchasedItemCancelled = ({ item }) => {
  return (
    <article>
      <div className="flex items-center py-3 px-2 justify-between text-balance">
        <div className="h-24 min-w-24 max-w-24">
          <img
            src={item.image || '/placeholder-image.jpg'}
            className="h-full w-full rounded-lg object-cover"
            alt={`${item.name.slice(0, 20) + '...'}`}
          />
        </div>
        <div className="flex-1 ml-4">
          <p className="mb-4 font-medium">{item.name || 'Unnamed Product'}</p>
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <div>
                <p className="text-[11px] text-[#222224]">Order ID</p>
                <strong>{item.id || 'I7xAA6b'}</strong>
              </div>
              <div>
                <p className="text-[11px] text-[#222224]">Order Date</p>
                <strong>{item.orderDate || '20 Jan, 2025'}</strong>
              </div>
              <div>
                <p className="text-[11px] text-[#222224]">Sold By</p>
                <strong>{item.soldBy || 'Fair'}</strong>
              </div>
            </div>
            <div className="border rounded-[6px] w-1/3 py-2 px-4 bg-yellow-200"></div>
          </div>
        </div>
      </div>
    </article>
  );
};
