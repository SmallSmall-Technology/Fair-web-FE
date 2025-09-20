import { ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react';
import { OrderImagesCarousel } from '../../OrderImagesCarousel';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import SingleCompletedPurchaseItemProgress from './SingleCompletedPurchaseItemProgress';

export const SingleCompletedPurchasedItem = ({
  orders,
  toggleExpand,
  expandedIndex,
  index,
}) => {
  const isExpanded = expandedIndex === index;

  return (
    <article>
      {!isExpanded && (
        <div className="flex items-start lg:px-2 justify-between text-balance">
          <div className="grid gap-4 lg:flex items-ceter justify-between lg:space-x-3">
            <div className="flex items-start gap-2 lg:gap-6">
              <OrderImagesCarousel orders={orders} />

              <div className="flex space-y-1">
                <div>
                  <p className="text-[13px] flex items-baseline gap-1">
                    Order number:{' '}
                    <span className="font-medium lg:text-lg ">
                      {orders?.orderNumber}
                    </span>
                  </p>
                  <div>
                    <p className="font-semibold text-[11px]">Item(s)</p>
                    {orders?.items?.map((item, idx) => (
                      <p key={idx} className="text-[14px] font-normal">
                        {item?.productName}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="lg:hidden  flex flex-col gap-3 items-end">
                  <p className="text-[11px]">Completed</p>
                  <div className="bg-[#3DB54A] text-sm rounded-full h-[30px] w-[30px] flex items-center justify-center text-white outline-image">
                    {orders?.paymentType === 'direct debit'
                      ? `${'1/3'}`
                      : '1/1'}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & delivery status */}
            <div className="flex flex-col items-center mt-10">
              <div className="grid gap-2 lg:flex lg:justify-between lg:space-x-5">
                <div className="flex items-center w-full">
                  <hr className="h-10 mr-2 border border-[#E5E5E5] hidden lg:block" />
                  <div className="flex items-start space-x-3 justify-between lg:space-x-14 w-full lg:w-[353px] rounded-lg object-cover bg-[#F6F6F6] py-2 px-4">
                    <div>
                      <p className="text-[11px] text-[#222224]">
                        Payment status
                      </p>
                      <p className="text-xs font-semibold ">
                        {formatCurrency(orders?.totalAmount)} paid in full
                      </p>
                    </div>
                    <div>
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

          {/* Expand Button */}
          <div className="hidden lg:flex flex-col gap-3 items-end">
            <div className="bg-[#3DB54A] text-sm rounded-full h-11 w-11 flex items-center justify-center text-white outline-image">
              3/3
            </div>
            <p className="text-[11px]">Cycle completed</p>
            <p
              className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <button className="underline">View Order</button>
              <ChevronRight size={12} />
            </p>
          </div>
        </div>
      )}
      <p
        className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer mt-6 mb-4 lg:hidden"
        onClick={() => toggleExpand(index)}
      >
        <button className="underline">
          {isExpanded ? 'Hide Order' : 'View Order'}
        </button>
        {!isExpanded && <ChevronRight size={12} />}
      </p>

      {/* Expanded section */}
      {isExpanded && (
        <div className="my-6">
          <SingleCompletedPurchaseItemProgress
            order={orders}
            onToggleExpand={() => toggleExpand(index)}
          />
        </div>
      )}

      {expandedIndex === null && <hr />}
    </article>
  );
};
