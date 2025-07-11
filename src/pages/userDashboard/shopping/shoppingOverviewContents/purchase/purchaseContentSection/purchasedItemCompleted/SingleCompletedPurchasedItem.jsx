import { ChevronRight, CircleCheck } from 'lucide-react';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import { useState } from 'react';
import SingleCompletedPurchaseItemProgress from './SingleCompletedPurchaseItemProgress';

export const SingleCompletedPurchasedItem = ({ item }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const products = item.items;

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <article>
      {products.map((product, index) => (
        <>
          {expandedIndex !== index && (
            <>
              <div
                key={index}
                className="flex items-start py-3 lg:px-2 justify-between text-balance"
              >
                <div className="grid gap-4 lg:flex items-ceter justify-between lg:space-x-3">
                  <div className="flex space-x-4">
                    <div className="min-w-[51px] max-w-[51px] h-[51px] lg:h-24 lg:min-w-24 lg:max-w-24">
                      <img
                        src={product.image || '/placeholder-image.jpg'}
                        className="min-h-full min-w-full rounded-lg object-cover border bg-[#FAFAFA] border-[#E8EBEA] p-1"
                        alt={`${product.name.slice(0, 20) + '...'}`}
                      />
                    </div>
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
                            <strong>{`${item.id.slice(0, 7) + '...'}`}</strong>
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-[#222224]">
                            Order Date
                          </p>
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
                </div>
              </div>
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
            </>
          )}
          {expandedIndex === index && (
            <div className="my-6">
              <SingleCompletedPurchaseItemProgress
                product={product}
                onToggleExpand={toggleExpand}
                expandedIndex={expandedIndex}
                index={index}
                item={item}
              />
            </div>
          )}
        </>
      ))}
      {expandedIndex === null && <hr className="mt-8" />}
    </article>
  );
};
