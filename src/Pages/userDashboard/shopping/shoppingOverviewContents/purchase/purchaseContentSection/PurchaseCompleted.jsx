import { useSelector } from 'react-redux';
import { ChevronRight, CircleCheck } from 'lucide-react';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import { getCompletedOrders } from '../../../../../../features/order/orderSlice';

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
              <PurchasedItem item={item} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PurchaseCompleted;

const PurchasedItem = ({ item }) => {
  const products = item.items;
  return (
    <article>
      {products.map((product, index) => (
        <>
          <div
            key={index}
            className="flex items-start py-3 lg:px-2 justify-between text-balance"
          >
            <div className="grid gap-4 lg:flex items-ceter justify-between lg:space-x-3">
              <div className="flex space-x-4 min-w-[30%] max-w-[51px] min-h-[51px] lg:h-24 lg:min-w-24 lg:max-w-24">
                <img
                  src={product.image || '/placeholder-image.jpg'}
                  className="min-h-full min-w-full rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] p-1"
                  alt={product.name || 'Product image'}
                />
                <p className="mb-4 font-medium lg:hidden">
                  {product.name || 'Unnamed Product'}
                </p>
              </div>
              <div className="flex flex-col ">
                <div className="flex lg:flex">
                  <p className="hidden lg:block mb-4 font-medium">
                    {product.name || 'Unnamed Product'}
                  </p>
                </div>
                <div className="grid gap-2 lg:flex lg:justify-between lg:space-x-5">
                  <div className="flex space-x-6 lg:w-full">
                    <div>
                      <p className="text-[11px] text-[#222224]">Order ID</p>
                      <p className="text-xs font-mediumtext-[#222224]">
                        {/* <strong>{item.id || 'I7xAA6b'}</strong> */}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#222224]">Order Date</p>
                      <p className="text-xs font-medium text-[#222224]">
                        <strong>{item.orderDate || '20 Jan, 2025'}</strong>
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#222224]">Sold By</p>
                      <p className="text-xs font-medium text-[#222224]">
                        <strong>{product.soldBy || 'Fair'}</strong>
                      </p>
                    </div>
                    <div className="lg:hidden  flex flex-col gap-3 items-end">
                      <div className="bg-[#3DB54A] text-sm rounded-full h-[30px] w-[30px] flex items-center justify-center text-white outline-image">
                        3/3
                      </div>
                      <p className="text-[11px]">Cycle completed</p>
                    </div>
                  </div>

                  <div className="flex items-center w-full">
                    <hr className="h-10 mr-2 border border-[#E5E5E5] hidden lg:block" />
                    <div className="flex items-start space-x-3 justify-between lg:space-x-14 w-full lg:w-[353px] rounded-lg object-cover bg-[#F6F6F6] py-2 px-4">
                      <div className="flex  lg:space-x-3">
                        <div>
                          <p className="text-[11px] text-[#222224]">
                            Payment status
                          </p>
                          <p className="text-xs font-semibold ">
                            {formatCurrency(product.price)} paid in full
                          </p>
                        </div>
                      </div>{' '}
                      <div className="">
                        <p className="text-[11px] text-[#222224]">
                          Delivery status
                        </p>
                        <p className="text-xs font-semibold text-[#222224] flex items-center space-x-1">
                          <span>Delivered</span>
                          <CircleCheck fill="#3DB54A" color="white" size={15} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-3 items-end ">
              <div className="bg-[#3DB54A] text-sm rounded-full h-11 w-11 flex items-center justify-center text-white outline-image">
                3/3
              </div>
              <p className="text-[11px]">Cycle completed</p>
            </div>
          </div>
          <p className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer">
            <span className="underline">View Order </span>
            <span>
              <ChevronRight size={12} />
            </span>
          </p>
        </>
      ))}
      <hr className="mt-8" />
    </article>
  );
};
