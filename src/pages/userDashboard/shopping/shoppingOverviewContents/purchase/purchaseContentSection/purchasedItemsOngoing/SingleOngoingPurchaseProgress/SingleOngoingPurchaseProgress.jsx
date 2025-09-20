import { ChevronRight } from 'lucide-react';
import { PaymentProgress } from './PaymentProgress';
import { CircularProgress } from '../CircularProgress';
import { DeliveryProgress } from './DeliveryProgress';
import { progressData } from '../../../../../../userDashboardData';
import { formatCurrency } from '../../../../../../../../utils/FormatCurrency';
import React from 'react';
import { OrderImagesCarousel } from '../../../OrderImagesCarousel';

const SingleOngoingPurchaseProgress = React.memo(
  ({ orders, onToggleExpand, index }) => {
    const payments = progressData.payments;
    const deliveries = progressData.deliveries;

    const paidCount = orders?.paidInstallments || 1;
    const totalCount = orders?.installmentCount + 1;

    return (
      <div className="max-w-4x mx-auto bg-white md:shadow-lg rounded-lg md:p-6 space-y-6 text-gray-800 md:border">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start justify-start lg:justify-between space-x-3">
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
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <CircularProgress paid={paidCount} totalCount={totalCount} />

            <p className="text-[11px]">Payment Circle</p>
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

        <p
          className="lg:hidden font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer mt-2 lg:mt-0"
          onClick={() => onToggleExpand(index)}
        >
          <button className="underline">Hide Order</button>
          <span>
            <ChevronRight size={12} />
          </span>
        </p>
        <hr className="lg:hidden border border-[#E8EBEA] my-4" />
        <div className="lg:space-y-2 md:px-8">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-[11px]">PAYMENT DETAILS</h3>
            <div className="md:hidden flex flex-col items-end">
              <p className="text-[11px]">Payment Circle</p>
              <CircularProgress paid={paidCount} totalCount={totalCount} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 text-sm">
            <div className="text-[11px]">
              <span>Item price</span>
              <br />
              <span className="text-base font-medium">
                {formatCurrency(orders?.totalAmount)}
              </span>
            </div>

            <div>
              {orders?.paymentType === 'direct debit' ? (
                <div className="text-[11px]">
                  <span>Installment duration</span>
                  <br />
                  <span className="text-base font-medium">
                    {orders?.installmentCount} months
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
              <span>Next due date</span>
              <br />
              <span className="text-base font-medium">Feb 12, 2025</span>
            </div>

            <div className="text-[11px]">
              <span>Next due payment</span>
              <br />
              <span className="text-base font-medium">
                {formatCurrency(orders?.paymentPlanDetails?.monthlyPayment)}
              </span>
            </div>

            <div>
              Payment type
              <br />
              <span className="text-base font-medium">Direct debit</span>
            </div>

            <div className="lg:col-span-3">
              <span className="text-[11px]">Late payment charges</span>
              <br />
              <span className="text-base font-medium text-red-600">N0.00</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F6F6F6] border px-8 py-4 rounded-[10px]">
          <h3 className="font-semibold text-[11px] mb-2">
            INSTALLMENT PAYMENT STATUS
          </h3>
          <PaymentProgress payments={payments} />
        </div>
        <hr className="my-6" />
        <div className="bg-[#F6F6F6] border  py-4 rounded-[10px]">
          <h3 className="font-semibold text-[11px] mb-2 px-8">
            DELIVERY STATUS
          </h3>
          <DeliveryProgress deliveries={deliveries} />
          <div className="flex items-start gap-1 text-xs text-gray-500 my-4 px-4 md:px-8">
            <img src="/images/truck.svg" alt="an image of a delivery truck" />
            <p>
              Estimated delivery date <strong>12 December 2024</strong>
            </p>
          </div>
        </div>
        <hr />
        <div>
          <h3 className="font-semibold text-[11px]">ITEM DETAILS</h3>

          <section className="text-[13px]">
            {orders?.items?.map((item, idx) => (
              <div key={idx} className="my-2">
                <p className="text-[14px] font-medium">{item?.productName}</p>
                <div className="text-[11px]">
                  <p className="text-xs">{item?.description || 'N/A'}</p>
                  <p>
                    Model : <strong>{item?.model || 'N/A'}</strong>
                  </p>
                  <p>
                    SKU: <strong>{item?.sku || 'N/A'}</strong>
                  </p>
                </div>
                <p>
                  Sold by:{' '}
                  <strong className="font-bold">{item?.soldBy || 'N/A'}</strong>
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }
);

export default SingleOngoingPurchaseProgress;
