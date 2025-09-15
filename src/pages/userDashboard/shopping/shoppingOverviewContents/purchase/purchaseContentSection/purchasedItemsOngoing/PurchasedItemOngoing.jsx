import React, { useCallback, useState } from 'react';
import { CircularProgress } from './CircularProgress';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import SingleOngoingPurchaseProgress from './SingleOngoingPurchaseProgress/SingleOngoingPurchaseProgress';

export const PurchasedItemOngoing = React.memo(({ orders }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const orderItems = orders?.items || [];
  const singleOrders = orders || {};

  // console.log('Ongoing orders:', orders);
  // console.log('Order items:', orderItems);
  // console.log('Single order:', singleOrders);

  const handleToggle = useCallback((index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <article>
      {orderItems?.map((orderItem, index) => (
        <section key={index}>
          <div
            key={orderItem.id || index}
            className="lg:flex items-center py-3 px-2 justify-between text-balance w-full"
          >
            {expandedIndex !== index && (
              <div className="lg:flex items-ceter justify-between lg:space-x-3">
                <div className="flex gap-2">
                  <div className="min-w-[51px] max-w-[51px] h-[51px] lg:h-24 lg:min-w-24 lg:max-w-24">
                    <img
                      src={orderItem.coverImage}
                      className="h-full w-full rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] p-1"
                      alt={`${orderItem.productName.slice(0, 30) + '...'}`}
                    />
                  </div>
                  <p className="mb-4 font-medium lg:hidden ">
                    {orderItem.productName || 'Unnamed Product'}
                  </p>
                </div>
                <div className="hidden lg:block lg:flex-1 ml-4">
                  <p className="mb-4 font-medium">
                    {orderItem.productName || 'Unnamed Product'}
                  </p>

                  <div className="flex justify-between space-x-5  ">
                    <div>
                      <div className="flex space-x-6">
                        <div>
                          <p className="text-[11px] text-[#222224]">Order ID</p>
                          <p className="text-[12px] font-medium text-[#222224]">
                            <span>{orderItem?.orderID}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px]  text-[#222224]">
                            Order Date
                          </p>
                          <p className="text-[12px] font-medium text-[#222224]">
                            <span>{singleOrders?.createdAt}</span>
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-[#222224]">Sold By</p>
                          <p className="text-[12px] font-medium text-[#222224]">
                            <span>{orderItem.soldBy || 'Fair'}</span>
                          </p>
                        </div>
                      </div>
                      <div>
                        <hr className="my-2" />
                        <p className="text-[11px]">
                          Interest free credit to unlock
                        </p>
                        <div className="flex space-x-3 items-center">
                          <p className="text-[#E3185C] font-semibold text-sm">
                            N20,000.00
                          </p>
                          <a
                            href="#"
                            className="text-[11px] text-[#222224] underline"
                          >
                            Read our t&c
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr />
                    <div className="h-ful w-ful rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] py-1 px-3">
                      <div className="flex space-x-3">
                        <div>
                          <p className="text-[11px] text-[#222224]">
                            Next due payment
                          </p>
                          <p className="text-[12px] text-[#222224]">
                            Jan 24, 2025
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-[#222224]">
                            Payment status
                          </p>
                          <div className="text-[12px] text-[#222224] flex items-center space-x-1">
                            <p>
                              <span>
                                {formatCurrency(orders?.downPaymentAmount)} paid
                                of{' '}
                              </span>
                              {formatCurrency(Number(orders?.totalAmount))}
                            </p>
                            <img src="/images/time-half-past.svg" alt="clock" />
                          </div>
                        </div>
                      </div>{' '}
                      <div>
                        <p className="text-[11px] text-[#222224]">
                          Payment type
                        </p>
                        <p className="text-[12px] text-[#222224]">
                          <span className="text-base font-medium">
                            {orders?.paymentType
                              ?.toLowerCase()
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid lg:hidden ">
                  <div className="flex lg:space-x-6 justify-between md:justify-start md:space-x-4 my-3">
                    <div>
                      <p className="text-[11px] text-[#222224]">Order ID</p>
                      <p className="text-[12px] text-[#222224]">
                        <span>{orderItem?.orderID}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#222224]">Order Date</p>
                      <p className="text-[12px] font-medium text-[#222224]">
                        <span>{singleOrders?.createdAt}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#222224]">Sold By</p>
                      <p className="text-[12px] font-medium text-[#222224]">
                        <span>{orderItem.soldBy || 'Fair'}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end lg:hidden">
                      <CircularProgress />
                      <p className="text-[11px]">Payment Cycle </p>
                    </div>
                  </div>
                  <hr className="hidden lg:block" />
                  <div className=" w-fit rounded-lg object-cover bg-[#F6F6F6] py-1 px-3 ">
                    <div className="flex space-x-3">
                      <div>
                        <p className="text-[11px] text-[#222224]">
                          Next due payment
                        </p>
                        <p className="text-[12px] font-medium text-[#222224]">
                          {singleOrders?.nextDueDate || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#222224]">
                          Payment status
                        </p>
                        <p className="text-[12px] font-medium text-[#222224] flex items-start space-x-1">
                          <span>
                            {formatCurrency(orders.downPaymentAmount)}
                          </span>
                          <span>paid of</span>
                          <span>
                            {formatCurrency(Number(orders.totalAmount))}
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
            )}
            {expandedIndex !== index && (
              <div className=" gap-4 lg:grid">
                <div className="hidden lg:flex flex-col gap-3 items-center">
                  <CircularProgress />
                  <p className="text-[11px]">Payment Cycle </p>
                </div>

                <p
                  className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer mt-2 lg:mt-0"
                  onClick={() => handleToggle(index)}
                >
                  <button className="underline">View Order</button>
                  <span>
                    <ChevronRight size={12} />
                  </span>
                </p>
              </div>
            )}
          </div>

          {expandedIndex === index && (
            <div className="mb-10">
              <SingleOngoingPurchaseProgress
                product={orderItem}
                toggleExpand={handleToggle}
                expandedIndex={expandedIndex}
                index={index}
              />
            </div>
          )}
        </section>
      ))}
      <hr />
    </article>
  );
});
