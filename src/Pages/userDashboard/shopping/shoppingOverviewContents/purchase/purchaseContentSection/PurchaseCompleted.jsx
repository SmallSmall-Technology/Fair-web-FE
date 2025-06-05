import { useSelector } from 'react-redux';
import { ChevronRight, CircleCheck } from 'lucide-react';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import { getCompletedOrders } from '../../../../../../features/order/orderSlice';
import { useState } from 'react';

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

export const PurchasedItem = ({ item }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const products = item.items;

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
    console.log('click');
  };

  return (
    <article>
      {products.map((product, index) => (
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
                    alt={product.name || 'Product image'}
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
          {expandedIndex === index && (
            <div className="my-6">
              <SinglePurchaseProgress product={product} />
            </div>
          )}
        </>
      ))}
      <hr className="mt-8" />
    </article>
  );
};

export const SinglePurchaseProgress = ({ product }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6 text-gray-800">
      {/* Product Header */}
      <div className="flex items-start gap-6">
        <img
          src="/freezer.png"
          alt="Freezer"
          className="w-24 h-24 object-contain"
        />
        <div className="flex-1">
          <h2 className="font-semibold text-lg">
            Haier Thermocool 219 Liters Inverter Chest Freezer (Silver)
          </h2>
          <p>{product.quantity}</p>
        </div>
        <div className="text-center">
          <div className="rounded-full border-4 border-green-500 text-green-600 font-bold w-12 h-12 flex items-center justify-center mx-auto">
            1/3
          </div>
          <p className="text-sm">Payment cycle</p>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-2">
        <h3 className="font-semibold text-md">PAYMENT DETAILS</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
          <div>
            Item price
            <br />
            <strong>N420,000.00</strong>
          </div>
          <div>
            Installment duration
            <br />
            <strong>4 months</strong>
          </div>
          <div>
            Total amount paid
            <br />
            <strong>N220,000.00</strong>
          </div>
          <div>
            Next due date
            <br />
            <strong>Feb 12, 2025</strong>
          </div>
          <div>
            Next due payment
            <br />
            <strong>N220,000.00</strong>
          </div>
          <div>
            Payment type
            <br />
            <strong>Direct debit</strong>
          </div>
          <div className="col-span-3 text-red-600">
            Late payment charges
            <br />
            <strong>N0.00</strong>
          </div>
        </div>
      </div>

      {/* Installment Tracker */}
      <div>
        <h3 className="font-semibold text-md mb-2">
          INSTALLMENT PAYMENT STATUS
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div className="text-green-600">
            Downpayment - done
            <br />
            <span className="text-xs text-gray-600">
              Feb 12, 2025 - N320,000
            </span>
          </div>
          <div className="text-yellow-500">
            Next payment
            <br />
            <span className="text-xs text-gray-600">
              Feb 12, 2025 - N220,000
            </span>
          </div>
          <div className="text-gray-400">
            Next payment
            <br />
            <span className="text-xs text-gray-500">
              Mar 12, 2025 - N220,000
            </span>
          </div>
          <div className="text-gray-400">
            Final payment
            <br />
            <span className="text-xs text-gray-500">
              Apr 12, 2025 - N220,000
            </span>
          </div>
        </div>
      </div>

      {/* Delivery Status */}
      <div>
        <h3 className="font-semibold text-md mb-2">DELIVERY STATUS</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="text-green-600">
            Order received
            <br />
            <span className="text-xs text-gray-600">Feb 12, 2025</span>
          </div>
          <div className="text-green-600">
            Installment payment
            <br />
            <span className="text-xs text-gray-600">First payment done</span>
          </div>
          <div className="text-gray-400">
            Shipping Status
            <br />
            <span className="text-xs">Delivered</span>
          </div>
          <div className="text-gray-400">
            Item Status
            <br />
            <span className="text-xs">Item received</span>
          </div>
        </div>
        <p className="text-xs mt-2 text-gray-500">
          Estimated delivery date <strong>12 December 2024</strong>
        </p>
      </div>

      {/* Item Details */}
      <div>
        <h3 className="font-semibold text-md">ITEM DETAILS</h3>
        <p className="text-sm">
          Order id: <strong>160345</strong>
        </p>
        <p className="text-sm">
          Haier Thermocool 219 Liters Inverter Chest Freezer (Silver)
        </p>
        <p className="text-sm">50" TV Crystal UHD</p>
        <p className="text-sm">Model: A6X | SKU: H36E8LI5JUTNAFAMZ</p>
        <p className="text-sm">
          Sold by <strong>Fair</strong>
        </p>
      </div>
    </div>
  );
};
