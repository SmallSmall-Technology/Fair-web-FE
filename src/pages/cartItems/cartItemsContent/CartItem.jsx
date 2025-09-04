import { SunDim } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PaymentPlan } from './PaymentPlan';
import {
  DeleteItem,
  DeleteItemFromCart,
} from '../../../features/cart/DeleteItem';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { getDisplayedPrice } from '../../../utils/GetDisplayedPrice';
import { SaveItemForLater } from '../../../features/cart/SaveItemForLater';
import { UpdateItemQuantity } from '../../../features/cart/UpdateItemQuantity';

export const CartItem = ({ item, onTogglePlan, isLoading }) => {
  if (isLoading) {
    return <CartItemSkeleton />;
  }
  const displayedPrice = getDisplayedPrice({
    paymentPlan: item?.paymentPlan || item?.selectedPaymentPlan,
    paymentOptionsBreakdown: item?.paymentOptionsBreakdown,
    fairAppPrice: item?.fairAppPrice || item?.price,
    quantity: item?.quantity,
  });

  return (
    <article
      key={item?.productID}
      className="md:border-[1px] pb-4 md:border-[#E5E5E5] rounded-[10px] w-full h-fit"
    >
      <div className="">
        <section className="md:p-4">
          <div className="flex justify-between mb-3">
            {!item?.venddorBrandName ? (
              <div className="flex space-x-1 items-center mb-1 2xl:px-10">
                <img
                  src="/images/sold-by-fair.svg"
                  alt="Fair company logo"
                  className="w-6 h-6"
                />
                <p className="underline">Fair</p>
              </div>
            ) : (
              <div className="flex space-x-1 items-center mb-1 2xl:px-10">
                <img
                  src={item?.venddorBrandLogo || '/images/sold-by-fair.svg'}
                  alt={item?.venddorBrandName || 'Fair company logo'}
                  className="w-6 h-6"
                />
                <p className="underline">{item?.venddorBrandName || 'Fair'}</p>
              </div>
            )}
            {/* <button
              type="submit"
              onClick={() => onTogglePlan(item?.id)}
              className="group relative inline-flex items-center overflow-hidden h-[22px] px-5 bg-[var(--yellow-primary)] text-xs rounded-2xl text-black hover:bg-gray-50 hover:text-black hover:underline"
            >
              <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>
              <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-xs">
                Change Plan
              </span>
            </button> */}
          </div>
          <div className="grid md:grid-flow-col items-center justify-between 2xl:px-10">
            <div className="flex items-start gap-4">
              <div className="product-image">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h2 className="text-[#222224] font-medium text-sm text-balance mb-3">
                  {item.name}
                </h2>
                <div className="text-[#222224] font-medium text-sm flex items-center space-x-2">
                  <p>Qty: </p>
                  <UpdateItemQuantity
                    productID={item?.productID}
                    currentQuantity={item?.quantity}
                  />
                </div>
                <p className="text-xl font-semibold mb-6 md:hidden mt-4">
                  {displayedPrice}
                </p>
              </div>
            </div>

            <div className="font-inter hidden md:grid">
              <div className="flex">
                <div className="flex flex-col items-end">
                  <p className="text-xl font-semibold mb-6">{displayedPrice}</p>
                  <p className="text-[11px] font-normal max-w-[317px] mb-1">
                    COMPLETE YOUR INSTALMENT WITHOUT DEFAULT YOU ARE ELIGIBLE TO
                    UNLOCK INTEREST FREE CREDIT OF:
                  </p>
                  <div className="flex gap-2 items-center mb-4">
                    <Link
                      to=""
                      className="text-sm font-normal flex items-center space-x-1"
                    >
                      <span>
                        <SunDim fill="black" />
                      </span>
                      How to use interest free credit
                    </Link>
                    <p className="text-[#DB1C5E]">
                      {formatCurrency(item?.interest || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 items-center mb-2 justify-end">
                <button
                  className="underline text-sm font-normal"
                  aria-label="Save for later"
                >
                  Save for later
                </button>
                <hr className="border-l border-gray-300 h-4" />
                <DeleteItem productID={item.productID} />
              </div>

              <p className="text-sm font-normal flex justify-end">
                Shipping: Arrives by{' '}
                <span className="font-medium">
                  {item?.deliveryDate || 'Jan, 20 2025'}
                </span>
              </p>
            </div>
          </div>
        </section>

        <div className="hidden md:flex items-center mx-4">
          <hr className="flex-grow border-[#E5E5E5]" />
          <p className="font-inter px-4 py-2 text-xs font-semibold text-gray-700 bg-[#F6F6F6] rounded-[20px]">
            Payment Plan
          </p>
          <hr className="flex-grow border-[#E5E5E5]" />
        </div>

        <PaymentPlan item={item} togglePlan={onTogglePlan} />

        <div className="flex justify-between mt-4 md:hidden">
          <p className="text-xs font-semibold">
            Shipping: Arrives by
            <br />
            <span className="font-medium">
              {item?.deliveryDate || 'Jan, 20 2025'}
            </span>
          </p>

          <div className="flex space-x-2 items-center mb-2">
            <SaveItemForLater />
            <DeleteItemFromCart productID={item.productID} />
          </div>
        </div>
      </div>
    </article>
  );
};

export const CartItemSkeleton = () => {
  return (
    <article className="md:border-[1px] pb-4 md:border-[#E5E5E5] rounded-[10px] w-full h-fit animate-pulse">
      <div className="">
        <section className="p-4">
          <div className="flex space-x-1 items-center mb-1 2xl:px-10">
            <div className="w-6 h-6 bg-gray-200 rounded-full" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>

          <div className="grid md:grid-flow-col items-center justify-between 2xl:px-10">
            <div className="flex items-start gap-4">
              <div className="product-image">
                <div className="w-20 h-20 bg-gray-200 rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-10 bg-gray-200 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-6 w-20 bg-gray-200 rounded md:hidden" />
              </div>
            </div>

            <div className="hidden md:grid space-y-3">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-28 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
              <div className="flex space-x-2 items-center">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-4 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </section>

        <div className="hidden md:flex items-center">
          <hr className="flex-grow border-[#E5E5E5]" />
          <div className="px-4 py-2 h-6 w-24 bg-gray-200 rounded-[20px]" />
          <hr className="flex-grow border-[#E5E5E5]" />
        </div>

        <div className="p-4">
          <div className="h-20 w-full bg-gray-200 rounded" />
        </div>

        <div className="flex justify-between mt-4 md:hidden p-4">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </article>
  );
};
