import React, { useCallback, useState } from 'react';
import { CircularProgress } from './CircularProgress';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import SingleOngoingPurchaseProgress from './SingleOngoingPurchaseProgress/SingleOngoingPurchaseProgress';
import { OrderImagesCarousel } from '../../OrderImagesCarousel';

export const PurchasedItemOngoing = React.memo(
  ({ orders, toggleExpand, expandedIndex, index }) => {
    const orderItems = orders?.items || [];

    const paidCount = orders?.paidInstallments || 1;
    const totalCount = orders?.installmentCount + 1;

    const isExpanded = expandedIndex === index;

    return (
      <article>
        <section>
          {!isExpanded && (
            <div
              key={orders?.orderNumber || index}
              className="lg:flex items-center py-3 px-2 justify-between text-balance w-full"
            >
              <div className="flex items-ceter justify-start lg:justify-between space-x-3">
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
                </div>

                <div className="flex lg:hidden flex-col gap-3 items-center">
                  <CircularProgress paid={paidCount} totalCount={totalCount} />
                </div>
                <div className="hidden lg:block lg:flex-1 ml-4">
                  <div className="flex justify-between space-x-5  ">
                    <hr />
                    <div className="space-y-2 ">
                      <div className=" border-l pl-3">
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
                                    {formatCurrency(orders?.downPaymentAmount)}{' '}
                                    paid of{' '}
                                  </span>
                                  {formatCurrency(Number(orders?.totalAmount))}
                                </p>
                                <img
                                  src="/images/time-half-past.svg"
                                  alt="clock"
                                />
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
                                  .replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                  )}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border-l border-transparent pl-3">
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
                  </div>
                </div>
              </div>
              <div className=" lg:hidden lg:flex-1 mt-2">
                <div className="flex justify-between ">
                  <div className="space-y-2 ">
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
                        </div>{' '}
                        <div>
                          <p className="text-[11px] text-[#222224]">
                            Payment type
                          </p>
                          <p className="text-[12px] text-[#222224]">
                            <span className="lg:text-base font-medium">
                              {orders?.paymentType
                                ?.toLowerCase()
                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
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
                      <p
                        className=" lg:hidden font-normal text-sm items-center justify-end  cursor-pointer mb-4 "
                        onClick={() => toggleExpand(index)}
                      >
                        <button className="underline">
                          {isExpanded ? 'Hide Order' : 'View Order'}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" gap-4 lg:grid">
                <div className="hidden lg:flex flex-col gap-3 items-center">
                  <CircularProgress paid={paidCount} totalCount={totalCount} />
                  <p className="text-[11px]">Payment Cycle </p>
                </div>

                <p
                  className="hidden lg:flex font-normal text-sm items-center justify-end space-x-1 cursor-pointer mt-6 mb-4 "
                  onClick={() => toggleExpand(index)}
                >
                  <button className="underline">
                    {isExpanded ? 'Hide Order' : 'View Order'}
                  </button>
                  {!isExpanded && <ChevronRight size={12} />}
                </p>
              </div>
            </div>
          )}

          {/* Expanded section */}
          {isExpanded && (
            <div className="my-6">
              <SingleOngoingPurchaseProgress
                orders={orders}
                onToggleExpand={() => toggleExpand(index)}
                // paidCount={paidCount}
                // totalCount={totalCount}
              />
            </div>
          )}

          {expandedIndex === null && <hr />}
        </section>
        <hr />
      </article>
    );
  }
);
