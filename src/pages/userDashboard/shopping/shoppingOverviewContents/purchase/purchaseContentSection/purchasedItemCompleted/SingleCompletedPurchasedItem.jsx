import { ChevronRight, CircleCheck } from 'lucide-react';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import React, { useState } from 'react';
import SingleCompletedPurchaseItemProgress from './SingleCompletedPurchaseItemProgress';
import { OrderImagesCarousel } from '../../OrderImagesCarousel';

export const SingleCompletedPurchasedItem = ({ orders }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  console.log('Rendering SingleCompletedPurchasedItem', orders);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };
  const index = 0;
  return (
    <article>
      {/* {orders.items?.map((product, index) => ( */}
      <React.Fragment key={index}>
        {expandedIndex !== index && (
          <>
            <div
              key={index}
              className="flex items-start lg:px-2 justify-between text-balance"
            >
              <div className="grid gap-4 lg:flex items-ceter justify-between lg:space-x-3">
                <div className="flex items-start gap-6">
                  <OrderImagesCarousel orders={orders} />

                  <div className="flex-1 space-y-1">
                    <p className="text-[13px] flex items-baseline gap-1">
                      Order number:{' '}
                      <span className="font-medium text-lg ">
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
                </div>
                <div className="flex flex-col items-center mt-10">
                  <div className="lg:hidden">
                    <p className="font-semibold text-[11px]">Item(s)</p>
                    {orders?.items?.map((item, idx) => (
                      <p key={idx} className="text-[14px] font-normal">
                        {item?.productName}
                      </p>
                    ))}
                  </div>
                  <div className="grid gap-2 lg:flex lg:justify-between lg:space-x-5">
                    <div className="flex space-x-6 lg:w-full">
                      {/* <div>
                        <p className="text-[11px] text-[#222224]">Order ID</p>
                        <p className="text-xs font-medium text-[#222224]">
                          <strong>{orders?.orderNumber}</strong>
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#222224]">Order Date</p>
                        <p className="text-xs font-medium text-[#222224]">
                          <strong>{orders?.createdAt}</strong>
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#222224]">Sold By</p>
                        <p className="text-xs font-medium text-[#222224]">
                          <strong>{orders?.soldBy || 'Fair'}</strong>
                        </p>
                      </div> */}
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
                              {formatCurrency(orders?.totalAmount)} paid in full
                            </p>
                          </div>
                        </div>{' '}
                        <div className="">
                          <p className="text-[11px] text-[#222224]">
                            Delivery status
                          </p>
                          <p className="text-xs font-semibold text-[#222224] flex items-center space-x-1">
                            <span>Delivered</span>
                            <CircleCheck
                              fill="#3DB54A"
                              color="white"
                              size={15}
                            />
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
                <div>
                  <p
                    className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer"
                    onClick={() => toggleExpand(index)}
                  >
                    <button className="underline">
                      {expandedIndex === index ? 'Hide Order' : 'View Order'}
                    </button>
                    <span>
                      <ChevronRight size={12} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        {expandedIndex === index && (
          <div className="my-6">
            <SingleCompletedPurchaseItemProgress
              order={orders}
              onToggleExpand={toggleExpand}
              expandedIndex={expandedIndex}
              index={index}
              orders={orders}
            />
          </div>
        )}
      </React.Fragment>
      {expandedIndex === null && <hr className="mt-" />}
    </article>
  );
};
