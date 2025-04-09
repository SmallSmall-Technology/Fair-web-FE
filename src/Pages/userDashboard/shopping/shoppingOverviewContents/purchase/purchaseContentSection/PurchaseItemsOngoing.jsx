import { useSelector } from "react-redux";
import { getOngoingOrders } from "../../../../../../features/order/orderSlice";

export const PurchaseItemsOngoing = () => {
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
        </div>
      )}
    </section>
  );
};
const PurchasedItem = ({ item }) => {
  const orderItems = item.items || [];

  return (
    <article>
      {orderItems.map((orderItem, index) => (
        <div
          key={index}
          className="flex items-center py-3 px-2 justify-between text-balance"
        >
          <div className="flex items-ceter justify-between space-x-3">
            <div className="h-24 min-w-24 max-w-24">
              <img
                src={orderItem.image || "/placeholder-image.jpg"}
                className="h-full w-full rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] p-1"
                alt={orderItem.name || "Product image"}
              />
            </div>
            <div className="flex-1 ml-4">
              <p className="mb-4 font-medium">
                {orderItem.name || "Unnamed Product"}
              </p>

              <div className="flex justify-between space-x-5 ">
                <div className="flex space-x-6">
                  <div>
                    <p className="text-[11px] text-[#222224]">Order ID</p>
                    <p className="text-[12px] text-[#222224]">
                      <strong>{item.id || "I7xAA6b"}</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#222224]">Order Date</p>
                    <p className="text-[12px] text-[#222224]">
                      <strong>{item.orderDate || "20 Jan, 2025"}</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#222224]">Sold By</p>
                    <p className="text-[12px] text-[#222224]">
                      <strong>{orderItem.soldBy || "Fair"}</strong>
                    </p>
                  </div>
                </div>
                <hr />
                <div className="h-ful w-ful rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] py-1 px-3 ">
                  <div className="flex space-x-3">
                    <div>
                      <p className="text-[11px] text-[#222224]">
                        Next due payment
                      </p>
                      <p className="text-[12px] text-[#222224]">Jan 24, 2025</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#222224]">
                        Payment status
                      </p>
                      <p className="text-[12px] text-[#222224] flex items-center space-x-1">
                        <span>N220,000 </span> paid of <span> N402,000</span>
                        <img src="/images/time-half-past.svg" alt="clock" />
                      </p>
                    </div>
                  </div>{" "}
                  <div>
                    <p className="text-[11px] text-[#222224]">Payment type</p>
                    <p className="text-[12px] text-[#222224]">Direct debit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black h-8 w-24"></div>
        </div>
      ))}
      <hr />
    </article>
  );
};
