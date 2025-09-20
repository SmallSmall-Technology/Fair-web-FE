import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { PaymentHistory } from './PaymentHistory';
import { OrderImagesCarousel } from '../../orderImagesCarousel';
import { formatCurrency } from '../../../../../../../utils/FormatCurrency';
import { completedPurchaseProgressData } from '../../../../../userDashboardData';
import ReviewModal from '../../../../../../productCategories/productDetails/UserReview/ReviewModal';
import { CustomButton } from '../../../../../../../utils/Button';

const SingleCompletedPurchaseItemProgress = React.memo(
  ({ order, onToggleExpand, orders }) => {
    const payments = completedPurchaseProgressData?.payments;
    const [isOpen, setIsOpen] = useState(false);
    const [orderId, setOrderId] = useState(orders?.orderNumber);

    const handleModalOpen = () => {
      setOrderId(order?.orderNumber);
      setIsOpen(true);
    };

    return (
      <div className="md:max-w-4x mx-auto bg-white rounded-lg md:p-6 space-y-6 text-gray-800 md:border">
        {/* Header */}
        <div className="flex items-start gap-6">
          <OrderImagesCarousel orders={order} />
          <div className="flex-1 space-y-1">
            <p className="text-[13px]">
              Order number:{' '}
              <span className="font-medium text-lg">{order?.orderNumber}</span>
            </p>
            <div>
              <p className="font-semibold text-[11px]">Item(s)</p>
              {order?.items?.map((item, idx) => (
                <p key={idx} className="text-[14px] font-normal">
                  {item?.productName}
                </p>
              ))}
            </div>
          </div>

          {/* Hide button for large screens */}
          <div className="hidden lg:flex flex-col gap-3 items-end">
            <div className="bg-[#3DB54A] text-sm rounded-full h-11 w-11 flex items-center justify-center text-white outline-image">
              3/3
            </div>
            <p className="text-[11px]">Cycle completed</p>
            <button
              type="button"
              className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer mt-2 lg:mt-0 underline"
              onClick={onToggleExpand} // ✅ no need for index
            >
              Hide Order
              <ChevronRight size={12} />
            </button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="lg:space-y-2 md:pl-8">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-[11px]">PAYMENT DETAILS</h3>
          </div>

          {/* Desktop grid */}
          <div className="hidden lg:grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 text-sm">
            <div className="text-[11px]">
              <span>Item price</span>
              <br />
              <span className="text-base font-medium">
                {formatCurrency(order?.totalAmount)}
              </span>
            </div>

            <div className="text-[11px]">
              <span>Installment duration</span>
              <br />
              <span className="text-base font-medium">
                {order?.paymentType === 'direct debit'
                  ? `${order?.paymentPlanDetails?.months} months`
                  : 'Paid Once'}
              </span>
            </div>

            <div className="text-[11px]">
              <span>Total amount paid</span>
              <br />
              <span className="text-base font-medium">
                {formatCurrency(order?.totalAmount)}
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

            <div className="text-[11px]">
              <p className="">Please leave a review for this item</p>
              <button
                onClick={handleModalOpen}
                className="text-xs font-semibold bg-[var(--yellow-primary)] p-2 rounded-[6px]"
              >
                Leave a review
              </button>
              {isOpen && (
                <ReviewModal
                  onClose={() => setIsOpen(false)}
                  orderId={orderId}
                />
              )}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-[#F6F6F6] border px-8 py-4 rounded-[10px]">
          <h3 className="font-semibold text-[11px] mb-2">PAYMENT HISTORY</h3>
          <PaymentHistory payments={payments} />
        </div>
        <hr className="w-full bg-[#E5E5E5] rounded-lg lg:hidden" />
        {/* Shipped Address */}
        <div className="md:flex items-start justify-between md:w-2/3">
          <div className="grid gap-2">
            <p className="text-[11px] font-semibold">SHIPPED ADDRESS</p>
            <p className="text-[13px] font-normal">
              {order?.deliveryFullAddress}
            </p>
          </div>

          <div className="hidden lg:grid gap-2">
            <p className="text-[11px] font-semibold">REFUND</p>
            <p className="flex items-center text-[13px] font-normal">
              <img src="/images/restock.svg" alt="icon" className="mr-1" />
              Eligible for refund in 7 days
            </p>
            <div className="flex space-x-3 text-[13px] font-medium underline">
              <Link to="">Request for a refund</Link>
              <Link to="">Return policy</Link>
            </div>
          </div>
        </div>

        <div className="lg:hidden h-2 w-full bg-[#E5E5E5] rounded-[2px]"></div>
        <div className="text-[11px] lg:hidden space-y-2 w-full flex flex-col justify-center items-center">
          <p className="">Please leave a review for this item</p>
          <CustomButton
            text={'Leave a review'}
            type="button"
            onClick={handleModalOpen}
          />
          {isOpen && (
            <ReviewModal onClose={() => setIsOpen(false)} orderId={orderId} />
          )}
        </div>
      </div>
    );
  }
);

export default SingleCompletedPurchaseItemProgress;
