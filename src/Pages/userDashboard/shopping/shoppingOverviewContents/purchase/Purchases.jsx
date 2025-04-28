import { useState, memo } from 'react';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PurchaseCompleted from './purchaseContentSection/PurchaseCompleted';
import PurchaseCancelled from './purchaseContentSection/PurchaseCancelled';
import {
  getOngoingOrders,
  getCompletedOrders,
  getCancelledOrders,
} from '/src/features/order/orderSlice.js';
import PurchaseItemsOngoing from './purchaseContentSection/PurchaseItemsOngoing';

const Purchases = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [formIsActive, setFormIsActive] = useState(false);

  // Get orders from Redux store
  const onGoingOrders = useSelector(getOngoingOrders);
  const completedOrders = useSelector(getCompletedOrders);
  const cancelledOrders = useSelector(getCancelledOrders);
  const allOrders = useSelector((state) => state.order.orders);

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
      const filteredOrders = allOrders.filter((order) =>
        order.id.toLowerCase().includes(searchTerm)
      );
      // Note: filteredOrders is computed but not used; consider dispatching to Redux or updating state
    }
    reset();
    setFormIsActive(false);
  };

  return (
    <div className="lg:mx-[60px] py-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-2xl">Purchases</h1>
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
                    className="absolute right-1 flex items-center text-xs py-1 px-2 bg-[#FFDE11] rounded border-[#737376]"
                  >
                    <Search size={12} /> Search
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="flex items-center border-[#737376] p-2 bg-[#FFDE11] rounded"
                  onClick={() => setFormIsActive(true)}
                >
                  <Search size={15} /> Search
                </button>
              )}
            </form>
          </div>
        </div>

        {allOrders?.length < 1 ? (
          <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
            No orders were found
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="flex justify-between w-full lg:justify-start lg:space-x-3">
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
                  <div className="flex space-x-1">
                    <input
                      type="text"
                      {...registerDesktop('search')}
                      placeholder="Search by order ID"
                      className="rounded-md p-2 border text-sm"
                    />
                    <button
                      type="submit"
                      className="flex items-center border-[#737376] p-2 bg-[#FFDE11] rounded"
                    >
                      <Search size={15} /> Search
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <hr className="my-4" />

            {activeTab === 'ongoing' && <PurchaseItemsOngoing />}
            {activeTab === 'completed' && <PurchaseCompleted />}
            {activeTab === 'cancelled' && <PurchaseCancelled />}
          </>
        )}
      </section>
    </div>
  );
};

export default memo(Purchases);
