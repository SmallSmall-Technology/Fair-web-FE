import WalletBalance from './Wallet';
import { useSelector } from 'react-redux';
import { RecentlyViewedSummary } from './recentlyViewed/RecentlyViewedSummary';

import {
  getCancelledOrders,
  getCompletedOrders,
  getOngoingOrders,
} from '../../../../features/order/orderSlice';
import { ActiveDirectDebit } from './DirectDebit';
import { RecentlyPurchased } from './purchase/RecentlyPurchased';

const Summary = () => {
  const ongoingOrders = useSelector(getOngoingOrders);
  const onCompletedOrders = useSelector(getCompletedOrders);
  const onCancelledOrders = useSelector(getCancelledOrders);

  return (
    <section className="grid grid-cols-1 gap-6 ">
      <article>
        <h1 className="font-semibold text-2xl mb-3"> Purchases</h1>
        <div className="border rounded-[10px] pt-4 pb-8 px-5 w-full">
          <ul className="flex md:space-x-8 justify-between lg:justify-start">
            <li className="grid gap-2">
              <p className="text-[#737376] text-sm">Ongoing</p>
              <p className="flex items-center space-x-1">
                <span>
                  <img src="/images/time-half-past.svg" alt="clock" />
                </span>
                <span className="font-semibold text-3xl">
                  {ongoingOrders.length}
                </span>
              </p>
            </li>

            <li className="grid gap-2 ">
              <p className="text-[#737376] text-sm">Completed</p>
              <p className="flex space-x-1 items-center">
                <span>
                  <img src="/images/export-box.svg" alt="export box" />
                </span>
                <span className="font-semibold text-3xl">
                  {onCompletedOrders.length}
                </span>
              </p>
            </li>

            <li className="grid gap-2">
              <p className="text-[#737376] text-sm">Cancelled</p>
              <p className="flex space-x-1 items-center">
                <span>
                  <img src="/images/export-box.svg" alt="export box" />
                </span>
                <span className="font-semibold text-3xl">
                  {onCancelledOrders.length}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </article>

      {ongoingOrders ? (
        <div className="grid grid-cols-1  justify-between gap-4">
          <div className="lg:flex gap-2 w-full">
            <ActiveDirectDebit />
            <RecentlyPurchased />
          </div>
          <div className="lg:flex gap-2 w-full">
            <WalletBalance />
            <RecentlyViewedSummary />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1  justify-between gap-4">
          <div className="lg:flex gap-2 w-full">
            <RecentlyPurchased />
            <RecentlyViewedSummary />
          </div>
          <div className="lg:flex gap-2 w-full">
            <WalletBalance />
          </div>
        </div>
      )}
    </section>
  );
};

export default Summary;
