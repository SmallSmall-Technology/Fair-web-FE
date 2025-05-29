import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import { ChevronRight } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

export const PurchasedItem = ({ item }) => {
  const orderItems = item.items || [];

  return (
    <article>
      {orderItems.map((orderItem, index) => (
        <div
          key={index}
          className="lg:flex items-center py-3 px-2 justify-between text-balance w-full"
        >
          <div className="lg:flex items-ceter justify-between lg:space-x-3">
            <div className="flex gap-2">
              <div className="min-w-[51px] max-w-[51px] h-[51px] lg:h-24 lg:min-w-24 lg:max-w-24">
                <img
                  src={orderItem.image || '/placeholder-image.jpg'}
                  className="h-full w-full rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] p-1"
                  alt={orderItem.name || 'Product image'}
                />
              </div>
              <p className="mb-4 font-medium lg:hidden">
                {orderItem.name || 'Unnamed Product'}
              </p>
            </div>
            <div className="hidden lg:block lg:flex-1 ml-4">
              <p className="mb-4 font-medium">
                {orderItem.name || 'Unnamed Product'}
              </p>

              <div className="flex justify-between space-x-5  ">
                <div className="flex space-x-6">
                  <div>
                    <p className="text-[11px] text-[#222224]">Order ID</p>
                    <p className="text-[12px] text-[#222224]">
                      <strong>{item?.i || 'I7xAA6b'}</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#222224]">Order Date</p>
                    <p className="text-[12px] text-[#222224]">
                      <strong>{item.orderDate || '20 Jan, 2025'}</strong>
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#222224]">Sold By</p>
                    <p className="text-[12px] text-[#222224]">
                      <strong>{orderItem.soldBy || 'Fair'}</strong>
                    </p>
                  </div>
                  {/* <CircularProgress /> */}
                </div>
                <hr />
                <div className="h-ful w-ful rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] py-1 px-3">
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
                      <div className="text-[12px] text-[#222224] flex items-center space-x-1">
                        <p>
                          {formatCurrency(orderItem.price)} paid of{' '}
                          {formatCurrency(Number(orderItem.totalPrice))}
                        </p>
                        <img src="/images/time-half-past.svg" alt="clock" />
                      </div>
                    </div>
                  </div>{' '}
                  <div>
                    <p className="text-[11px] text-[#222224]">Payment type</p>
                    <p className="text-[12px] text-[#222224]">Direct debit</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid lg:hidden ">
              <div className="flex lg:space-x-6 justify-between my-3">
                <div>
                  <p className="text-[11px] text-[#222224]">Order ID</p>
                  <p className="text-[12px] text-[#222224]">
                    <strong>{item?.i || 'I7xAA6b'}</strong>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#222224]">Order Date</p>
                  <p className="text-[12px] text-[#222224]">
                    <strong>{item.orderDate || '20 Jan, 2025'}</strong>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-[#222224]">Sold By</p>
                  <p className="text-[12px] text-[#222224]">
                    <strong>{orderItem.soldBy || 'Fair'}</strong>
                  </p>
                </div>
                <div className="flex flex-col items-end lg:hidden">
                  <CircularProgress />
                  <p className="text-[11px]">Payment Cycle </p>
                </div>
              </div>
              <hr className="hidden lg:block" />
              <div className=" w-full rounded-lg object-cover bg-[#F6F6F6] py-1 px-3 ">
                <div className="flex space-x-3">
                  <div>
                    <p className="text-[11px] text-[#222224]">
                      Next due payment
                    </p>
                    <p className="text-[12px] text-[#222224]">Jan 24, 2025</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#222224]">Payment status</p>
                    <p className="text-[12px] text-[#222224] flex items-start space-x-1">
                      <span>{formatCurrency(orderItem.price)}</span>
                      <span>paid of</span>
                      <span>
                        {formatCurrency(Number(orderItem.totalPrice))}
                      </span>
                      <img
                        src="/images/time-half-past.svg"
                        alt="clock"
                        className="w-[18px]"
                      />
                    </p>
                  </div>
                </div>{' '}
                <div>
                  <p className="text-[11px] text-[#222224]">Payment type</p>
                  <p className="text-[12px] text-[#222224]">Direct debit</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" gap-4 lg:grid">
            <div className="hidden lg:flex flex-col gap-3 items-center">
              <CircularProgress />
              <p className="text-[11px]">Payment Cycle </p>
            </div>
            <p className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer mt-2 lg:mt-0">
              <span className="underline ">View Order </span>
              <span>
                <ChevronRight size={12} />
              </span>
            </p>
          </div>
        </div>
      ))}
      <hr />
    </article>
  );
};
