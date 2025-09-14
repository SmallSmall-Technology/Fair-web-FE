import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';
import { PaymentHistory } from './PaymentHistory';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import { completedPurchaseProgressData } from '../../../../../userDashboardData';
import { selectLatestDeliveryAddress } from '../../../../../../../features/order/deliveryAddressSlice';

const SingleCompletedPurchaseItemProgress = React.memo(
  ({ order, onToggleExpand, index, orders }) => {
    const payments = completedPurchaseProgressData?.payments;

    return (
      <>
        <div className="max-w-4x mx-auto bg-white  rounded-lg md:p-6 space-y-6 text-gray-800 md:border">
          <div className="flex items-start gap-6">
            {/* <div className="bg-[#FAFAFA] h-[104px] w-[104px] border border-[#E8EBEA] rounded-[7px] flex justify-center items-center">
              {
                <img
                  src={order?.coverImage || '/placeholder-image.jpg'}
                  alt="Freezer"
                  className="w-[76px] h-[76px] object-cover "
                  loading="lazy"
                />
              }
            </div> */}
            {orders?.items.map((order, orderIndex) => (
              <div key={orderIndex} className="mb-6">
                {/* Order Container */}
                <div className="flex flex-wrap gap-3">
                  {orders.items?.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-[#FAFAFA] h-[104px] w-[104px] border border-[#E8EBEA] rounded-[7px] flex justify-center items-center"
                    >
                      <img
                        src={order?.coverImage || '/placeholder-image.jpg'}
                        alt={item?.productName || 'Product'}
                        className="w-[76px] h-[76px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex-1 space-y-1">
              <p className="text-[13px]">
                Order number:{' '}
                <span className="font-medium text-lg">{order?.orderID}</span>
              </p>
              <div>
                <p className="font-semibold text-[11px]">Item(s)</p>
                {orders?.items?.map((item, idx) => (
                  <p key={idx} className="text-[14px] font-normal">
                    {item?.productName}
                  </p>
                ))}
              </div>
              {/* <h2 className="font-semibold lg:text-lg">{orders?.orderID}</h2> */}
              {/* <div className="hidden lg:flex lg:space-x-11">
                <p className="text-[13px]">
                  Order number:{' '}
                  <span className="font-medium text-lg">{order?.orderID}</span>
                </p>
                <p className="text-[13px]">
                  Order date:{' '}
                  <span className="font-medium">{order?.deliveryDate}</span>
                </p>
              </div> */}
              {/* <p className="hidden lg:flex text-[11px]">
                Sold by <span className="font-semibold">{order?.soldBy}</span>
              </p> */}
              {/* <p className="hidden lg:flex text-[11px] md:flex">
                Qty - x{order?.quantity}
              </p> */}
            </div>
            <div className="hidden lg:flex flex-col gap-3 items-end ">
              <div className="bg-[#3DB54A] text-sm rounded-full h-11 w-11 flex items-center justify-center text-white outline-image">
                3/3
              </div>
              <p className="text-[11px]">Cycle completed</p>
              <p
                className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer mt-2 lg:mt-0"
                onClick={() => onToggleExpand(index)}
              >
                <button className="underline">Hide Order</button>
                <span>
                  <ChevronRight size={12} />
                </span>
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-start lg:hidden ">
              <p className="text-[13px]">
                Order id: <span className="font-medium">{order?.orderID}</span>
              </p>
              <p className="text-[13px]">
                Order date:{' '}
                <span className="font-medium">{order?.deliveryDate}</span>
              </p>
            </div>
            <p className="flex lg:hidden text-[11px]">
              Sold by <span className="font-semibold">{order?.soldBy}</span>
            </p>
            <p className="flex lg:hidden text-[11px] md:flex">
              Qty - x{order?.quantity}
            </p>
          </div>
          <hr className="my-3" />
          <div className="lg:space-y-2 md:pl-8">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-[11px]">PAYMENT DETAILS</h3>

              <div className="md:hidden flex flex-col gap-3 items-end ">
                <p className="text-[11px]">Cycle completed</p>
                <div className="bg-[#3DB54A] text-sm rounded-full h-11 w-11 flex items-center justify-center text-white outline-image">
                  3/3
                </div>
              </div>
            </div>
            <div className="hidden lg:grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5  text-sm">
              <div className="text-[11px]">
                <span>Item price</span>
                <br />
                <span className="text-base font-medium">
                  {formatCurrency(orders?.totalAmount)}
                </span>
              </div>

              <div>
                {orders.paymentType === 'direct debit' ? (
                  <div className="text-[11px]">
                    <span>Installment duration</span>
                    <br />
                    <span className="text-base font-medium">
                      {order?.paymentPlanDetails?.months} months
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px]">
                    <span>Installment duration</span>
                    <br />
                    <span className="text-base font-medium">Paid Once</span>
                  </div>
                )}
              </div>

              <div className="text-[11px]">
                <span>Total amount paid</span>
                <br />
                <span className="text-base font-medium">
                  {formatCurrency(orders?.totalAmount)}
                </span>
              </div>

              <div className="text-[11px]">
                <div className="relative w-[125px]">
                  <span>Late payment charges</span>
                  <img
                    src="/images/infoIcon.svg"
                    alt="icon"
                    className="absolute top-0 right-0"
                  />
                </div>

                <span className="text-base font-medium text-[#F81313]">
                  N200.00
                </span>
              </div>

              <div className="hidden lg:block text-[11px]">
                <p className="">Please leave a review for this item</p>
                <Link className="text-xs font-semibold bg-[var(--yellow-primary)] p-2 flex justify-center rounded-[6px]">
                  Leave a review
                </Link>
              </div>

              <div className="text-[11px]">
                Payment option
                <br />
                <span className="text-base font-medium">
                  {orders?.paymentType
                    ?.toLowerCase()
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </span>
              </div>

              <div className="lg:col-span-">
                <span className="text-[11px]">Late payments</span>
                <br />
                <span className="text-base font-medium">2</span>
              </div>

              <div className="text-[11px] w-fit">
                <div className="relative w-[88px]">
                  <span>Payment rating</span>
                  <img
                    src="/images/infoIcon.svg"
                    alt="icon"
                    className="absolute top-0 right-0"
                  />
                </div>

                <span className="text-base font-medium">C</span>
              </div>
            </div>
            <div className="grid lg:hidden gap-3 grid-cols-2  text-sm">
              <div className="text-[11px]">
                <span>Item price</span>
                <br />
                <span className="text-base font-medium">
                  {formatCurrency(order?.totalAmount)}
                </span>
              </div>

              <div>
                {order.paymentPlan !== 'full' ? (
                  <div className="text-[11px]">
                    <span>Installment duration</span>
                    <br />
                    <span className="text-base font-medium">
                      {order.paymentPlanDetails?.months} months
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px]">
                    <span>Installment duration</span>
                    <br />
                    <span className="text-base font-medium">Paid Once</span>
                  </div>
                )}
              </div>

              <div className="text-[11px]">
                <span>Total amount paid</span>
                <br />
                <span className="text-base font-medium">
                  {formatCurrency(order.price)}
                </span>
              </div>

              <div className="lg:col-span-">
                <span className="text-[11px]">Late payments</span>
                <br />
                <span className="text-base font-medium">2</span>
              </div>

              <div className="text-[11px] w-fit">
                <div className="relative w-[88px]">
                  <span>Payment rating</span>
                  <img
                    src="/images/infoIcon.svg"
                    alt="icon"
                    className="absolute top-0 right-0"
                  />
                </div>

                <span className="text-base font-medium">C</span>
              </div>

              <div className="text-[11px]">
                <div className="relative w-[125px]">
                  <span>Late payment charges</span>
                  <img
                    src="/images/infoIcon.svg"
                    alt="icon"
                    className="absolute top-0 right-0"
                  />
                </div>

                <span className="text-base font-medium text-[#F81313]">
                  N200.00
                </span>
              </div>

              <div className="hidden lg:block text-[11px]">
                <p className="">Please leave a review for this item</p>
                <Link
                  to=""
                  className="text-xs font-semibold bg-[var(--yellow-primary)] p-2 flex justify-center rounded-[6px]"
                >
                  Leave a review
                </Link>
              </div>

              <div className="text-[11px]">
                Payment option
                <br />
                <span className="text-base font-medium">Direct debit</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F6F6F6] border px-8 py-4 rounded-[10px]">
            <h3 className="font-semibold text-[11px] mb-2">PAYMENT HISTORY</h3>
            {/* <div className="overflow-x-auto"> */}
            <PaymentHistory payments={payments} />
            {/* </div> */}
          </div>
          <hr className="my-8 lg:my-4" />
          <div className="md:flex items-start justify-between md:w-2/3">
            <div className="grid gap-2">
              <p className="text-[11px] font-semibold">SHIPPED ADDRESS</p>
              <p className="text-[13px] font-normal">
                {orders?.deliveryFullAddress}
              </p>
            </div>
            <div className="hidden lg:grid gap-2">
              <p className="text-[11px] font-semibold">REFUND</p>
              <p className="flex items-center text-[13px] font-normal">
                {' '}
                <span className="mr-1">
                  <img src="/images/restock.svg" alt="icon" />
                </span>
                Eligible for refund in 7 days
              </p>
              <div className="flex space-x-3 text-[13px] font-medium underline">
                <Link to="" className="underlin">
                  Request for a refund
                </Link>
                <Link to="" className="underlin">
                  Return policy
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden my-5 bg-[#E5E5E5] h-[6px]"></div>
        <div className=" lg:hidden text-[11px]">
          <p className=" flex justify-center mb-1">
            Please leave a review for this item
          </p>
          <Link
            to=""
            className="text-xs font-semibold bg-[var(--yellow-primary)] p-2 flex justify-center rounded-[40px]"
          >
            Leave a review
          </Link>
        </div>
      </>
    );
  }
);

export default SingleCompletedPurchaseItemProgress;
