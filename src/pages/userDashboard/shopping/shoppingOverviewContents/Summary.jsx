import CreditWalletSummary from './creditWallet/CreditWalletSummary';
import { useSelector } from 'react-redux';
import { RecentlyViewedSummary } from './recentlyViewed/RecentlyViewedSummary';

import {
  getCancelledOrders,
  getCompletedOrders,
  getOngoingOrders,
} from '../../../../features/order/orderSlice';
import { RecentlyPurchased } from './purchase/RecentlyPurchased';
import { SingleActiveDirectDebit } from './DirectDebit/SingleActiveDirectDebit';
import { CreditScoreCard } from '../shoppingOverview/CreditScoreCard';
import { useOrders } from './purchase/useOrders';

const Summary = () => {
  //  const OrdersPage = () => {
  const { isFetching, onGoingOrders, completedOrders, cancelledOrders } =
    useOrders();

  if (isFetching) return <p>Loading orders...</p>;

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
                  {onGoingOrders.length}
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
                  {completedOrders.length}
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
                  {cancelledOrders.length}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </article>

      {onGoingOrders ? (
        <div className="grid grid-cols-1  justify-between gap-4">
          <div className="lg:flex gap-2 w-full">
            {/* <ActiveDirectDebit /> */}
            <SingleActiveDirectDebit orders={onGoingOrders} />
            <RecentlyPurchased />
          </div>
          <div className="lg:flex gap-2 w-full">
            <CreditWalletSummary />
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
            <CreditWalletSummary />
          </div>
        </div>
      )}
      <div className="lg:hidden">
        <CreditScoreCard />
      </div>
    </section>
  );
};

export default Summary;
