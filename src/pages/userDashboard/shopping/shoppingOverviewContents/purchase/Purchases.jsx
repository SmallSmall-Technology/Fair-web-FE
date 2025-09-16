import { Search } from 'lucide-react';
import { useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import PurchaseCancelled from './purchaseContentSection/purchaseItemCancelled/PurchaseCancelled';
import PurchaseCompleted from './purchaseContentSection/purchasedItemCompleted/PurchaseCompleted';
import PurchaseItemsOngoing from './purchaseContentSection/purchasedItemsOngoing/PurchaseItemsOngoing';
import { useQuery } from '@tanstack/react-query';
import { useOrders } from './useOrders';
import { PurchasePending } from './purchaseContentSection/purchasePending/PurchasePending';

const Purchases = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [formIsActive, setFormIsActive] = useState(false);

  const {
    allOrders,
    onGoingOrders,
    completedOrders,
    cancelledOrders,
    pendingOrders,
    isFetching,
    refetchOrders,
  } = useOrders();

  // console.log('allOrders', allOrders);
  // console.log('onGoingOrders', onGoingOrders);
  // console.log('completedOrders', completedOrders);
  // console.log('cancelledOrders', cancelledOrders);
  // console.log('pending orders', pendingOrders);

  // Mobile search form
  const {
    register: registerMobile,
    handleSubmit: handleSubmitMobile,
    reset: resetMobile,
  } = useForm({
    defaultValues: { search: '' },
  });

  // Desktop search form
  const {
    register: registerDesktop,
    handleSubmit: handleSubmitDesktop,
    reset: resetDesktop,
  } = useForm({
    defaultValues: { search: '' },
  });

  const handleSearchQuery = (data, reset) => {
    const searchTerm = data.search.trim().toLowerCase();
    if (searchTerm) {
      const filteredOrders = allOrders.filter((order, i) => {
        console.log(order);
        return order.orderNumber?.toLowerCase().includes(searchTerm);
      });
      console.log(filteredOrders);
    }
    reset();
    setFormIsActive(false);
  };

  return (
    <div className="lg:mx-[30p] xl:mx-[60p] py-8 md:py-0 font-inter">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl mb-4 font-outfit">Purchases</h1>
          <div className="flex lg:hidden">
            <form
              onSubmit={handleSubmitMobile((data) =>
                handleSearchQuery(data, resetMobile)
              )}
            >
              {formIsActive ? (
                <div className="flex items-center space-x-1 relative">
                  <input
                    type="text"
                    {...registerMobile('search')}
                    placeholder="Search by order ID"
                    className="rounded-md p-2 border pl-2 text-sm w-40"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 flex items-center text-xs py-1 px-2 bg-[var(--yellow-primary)] rounded border-[#737376]"
                  >
                    <Search size={12} /> Search
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="flex items-center border-[#737376] p-2 bg-[var(--yellow-primary)] rounded"
                  onClick={() => setFormIsActive(true)}
                >
                  <Search size={15} /> Search
                </button>
              )}
            </form>
          </div>
        </div>

        {allOrders?.length < 1 ? (
          <p className="flex justify-center items-center font-medium bg-[#F6F6F6]  rounded-[10px] h-[141px]">
            No orders were found
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="flex justify-between md:justify-start md:space-x-4 w-full lg:justify-start lg:space-x-3">
                <button
                  className={`p-2 rounded-[30px] text-sm lg:text-base border ${
                    activeTab === 'pending'
                      ? 'border-black text-black font-medium'
                      : 'border-[#737376] text-[#737376]'
                  }`}
                  onClick={() => setActiveTab('pending')}
                  aria-label="View pending orders"
                >
                  Pending <span>({pendingOrders?.length || 0})</span>
                </button>
                <button
                  className={`p-2 rounded-[30px] text-sm lg:text-base border ${
                    activeTab === 'ongoing'
                      ? 'border-black text-black font-medium'
                      : 'border-[#737376] text-[#737376]'
                  }`}
                  onClick={() => setActiveTab('ongoing')}
                  aria-label="View ongoing orders"
                >
                  Ongoing <span>({onGoingOrders.length})</span>
                </button>
                <button
                  className={`p-2 rounded-[30px] text-sm lg:text-base border ${
                    activeTab === 'completed'
                      ? 'border-black text-black font-medium'
                      : 'border-[#737376] text-[#737376]'
                  }`}
                  onClick={() => setActiveTab('completed')}
                  aria-label="View completed orders"
                >
                  Completed <span>({completedOrders?.length})</span>
                </button>
                <button
                  className={`p-2 rounded-[30px] text-sm lg:text-base border ${
                    activeTab === 'cancelled'
                      ? 'border-black text-black font-medium'
                      : 'border-[#737376] text-[#737376]'
                  }`}
                  onClick={() => setActiveTab('cancelled')}
                  aria-label="View cancelled orders"
                >
                  Cancelled <span>({cancelledOrders?.length})</span>
                </button>
              </div>

              <div className="hidden lg:block">
                <form
                  onSubmit={handleSubmitDesktop((data) =>
                    handleSearchQuery(data, resetDesktop)
                  )}
                >
                  {activeTab === 'pending' && (
                    <p className="w-full flex justify-end items-center">
                      <span className="text-[#96959F] text-sm mr-1">
                        Pending{' '}
                      </span>
                      {pendingOrders.length}
                    </p>
                  )}

                  {activeTab === 'completed' && (
                    <p className="w-full flex justify-end items-center">
                      <span className="text-[#96959F] text-sm mr-1">
                        Completed{' '}
                      </span>
                      {completedOrders.length}
                    </p>
                  )}

                  {activeTab === 'ongoing' && (
                    <p className="w-full flex justify-end items-center">
                      <span className="text-[#96959F] text-sm mr-1">
                        Ongoing{' '}
                      </span>
                      {onGoingOrders.length}
                    </p>
                  )}

                  {activeTab === 'cancelled' && (
                    <p className="w-full flex justify-end items-center">
                      <span className="text-[#96959F] text-sm mr-1">
                        Cancelled{' '}
                      </span>
                      {cancelledOrders.length}
                    </p>
                  )}
                  <div className="flex space-x-1">
                    <div className="flex space-x-1">
                      <input
                        type="text"
                        {...registerDesktop('search')}
                        placeholder="Search by order ID"
                        className="rounded-md p-2 border text-sm"
                      />

                      <button
                        type="submit"
                        className="flex items-center border-[#737376] p-2 bg-[var(--yellow-primary)] rounded"
                      >
                        <Search size={15} /> Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <hr className="my-4" />

            {activeTab === 'ongoing' && (
              <PurchaseItemsOngoing
                onGoingOrders={onGoingOrders}
                isFetching={isFetching}
                refetchOrders={refetchOrders}
              />
            )}
            {activeTab === 'completed' && (
              <PurchaseCompleted
                completedOrders={completedOrders}
                isFetching={isFetching}
                refetchOrders={refetchOrders}
              />
            )}
            {activeTab === 'pending' && (
              <PurchasePending
                pendingOrders={pendingOrders}
                isFetching={isFetching}
                refetchOrders={refetchOrders}
              />
            )}
            {activeTab === 'cancelled' && (
              <PurchaseCancelled
                cancelledOrders={cancelledOrders}
                isFetching={isFetching}
                refetchOrders={refetchOrders}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default memo(Purchases);
