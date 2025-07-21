 ';
import { ChevronRight } from 'lucide-react';
import { PaymentProgress } from './PaymentProgress';
import { CircularProgress } from '../CircularProgress';
import { DeliveryProgress } from './DeliveryProgress';
import { progressData } from '../../../../../../userDashboardData';
import { formatCurrency } from '../../../../../../../../utils/FormatCurrency';

const SingleOngoingPurchaseProgress = React.memo(
  ({ product, toggleExpand, index }) => {
    const payments = progressData.payments;
    const deliveries = progressData.deliveries;
    return (
      <div className="max-w-4x mx-auto bg-white md:shadow-lg rounded-lg md:p-6 space-y-6 text-gray-800 md:border">
        <div className="flex items-start gap-6">
          <div className="bg-[#FAFAFA] h-[104px] w-[104px] border border-[#E8EBEA] rounded-[7px] flex justify-center items-center">
            <img
              src={product.image}
              alt="Freezer"
              className="w-[76px] h-[76px] object-cover "
              loading="lazy"
            />
          </div>
          <div className="flex-1 space-y-3">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-[11px] hidden md:flex">
              Qty - x{product.quantity}
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <CircularProgress />
            <p className="text-[11px]">Payment Circle</p>
            <p
              className="font-normal text-sm flex items-center justify-end space-x-1 cursor-pointer mt-2 lg:mt-0"
              onClick={() => toggleExpand(index)}
            >
              <button className="underline">Hide Order</button>
              <span>
                <ChevronRight size={12} />
              </span>
            </p>
          </div>
        </div>

        <div className="lg:space-y-2 md:px-8">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-[11px]">PAYMENT DETAILS</h3>
            <div className="md:hidden flex flex-col items-end">
              <p className="text-[11px]">Payment Circle</p>
              <CircularProgress />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 text-sm">
            <div className="text-[11px]">
              <span>Item price</span>
              <br />
              <span className="text-base font-medium">
                {formatCurrency(product.totalAmount)}
              </span>
            </div>

            <div>
              {product.paymentPlan !== 'upfront' && (
                <div className="text-[11px]">
                  <span>Installment duration</span>
                  <br />
                  <span className="text-base font-medium">
                    {product.paymentPlanDetails?.months} months
                  </span>
                </div>
              )}
            </div>

            <div className="text-[11px]">
              <span>Total amount paid</span>
              <br />
              <span className="text-base font-medium">
                {formatCurrency(product.price)}
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
                {formatCurrency(product.paymentPlanDetails.monthlyPayment)}
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
          <p className="text-[13px]">
            Order id: <strong>160345</strong>
          </p>
          <p className="text-sm">{product.name}</p>
          <p className="text-sm">50" TV Crystal UHD</p>
          <p className="text-sm">Model: A6X | SKU: H36E8LI5JUTNAFAMZ</p>
          <p className="text-sm">
            Sold by <strong>{product.soldBy}</strong>
          </p>
        </div>
      </div>
    );
  }
);

export default SingleOngoingPurchaseProgress;
