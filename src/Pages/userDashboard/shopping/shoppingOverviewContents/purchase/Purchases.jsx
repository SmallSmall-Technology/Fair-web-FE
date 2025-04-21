import { useState } from 'react';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
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

  const initialValues = {
    search: '',
  };

  const handleSearchQuery = (values, { resetForm }) => {
    const searchTerm = values.search.trim().toLowerCase();
    if (searchTerm) {
      // Filter orders by order ID (or extend to product name, etc.)
      const filteredOrders = allOrders.filter((order) =>
        order.id.toLowerCase().includes(searchTerm)
      );
    }
    resetForm();
    setFormIsActive(false);
  };

  return (
    <div className="lg:mx-[60px] py-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-2xl">Purchases</h1>
          {/* Mobile Search Toggle */}
          <div className="flex lg:hidden">
            <Formik initialValues={initialValues} onSubmit={handleSearchQuery}>
              <Form>
                {formIsActive ? (
                  <div className="flex items-center space-x-1 relative">
                    <Field
                      type="text"
                      name="search"
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
              </Form>
            </Formik>
          </div>
        </div>

        {allOrders?.length < 1 ? (
          <p className="w-full py-20 rounded-md bg-[#F6F6F6] text-center text-gray-500">
            No orders were found
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center">
              {/* Tabs */}
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

              {/* Desktop Search */}
              <div className="hidden lg:block">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSearchQuery}
                >
                  <Form className="flex space-x-1">
                    <Field
                      type="text"
                      name="search"
                      placeholder="Search by order ID"
                      className="rounded-md p-2 border text-sm"
                    />
                    <button
                      type="submit"
                      className="flex items-center border-[#737376] p-2 bg-[#FFDE11] rounded"
                    >
                      <Search size={15} /> Search
                    </button>
                  </Form>
                </Formik>
              </div>
            </div>

            <hr className="my-4" />

            {/* Tab Content */}
            {activeTab === 'ongoing' && <PurchaseItemsOngoing />}
            {activeTab === 'completed' && <PurchaseCompleted />}
            {activeTab === 'cancelled' && <PurchaseCancelled />}
          </>
        )}
      </section>
    </div>
  );
};

export default Purchases;
