import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SingleActiveDirectDebit } from './SingleActiveDirectDebit';
import { getOngoingOrders } from '../../../../../features/order/orderSlice';

export const ActiveDirectDebit = () => {
  const ongoingOrders = useSelector(getOngoingOrders);
  return (
    <div className="mb-6 lg:mb-0 lg:w-1/2 ">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4"> Active direct debit</h1>
        <Link
          to="/user-dashboard/shopping-overview/purchased"
          className="underline font-medium text-[#737376] text-sm"
        ></Link>
      </div>

      <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px]">
        {ongoingOrders.length === 0 ? (
          <p className="text-[#A6A6A6] bg-[#F6F6F6] p-4 py-6 rounded-[10px]">
            No active direct debit
          </p>
        ) : (
          ongoingOrders.slice(0, 2).map((item, index) => (
            <div key={item.productID}>
              <ul className="recently-viewed p-2">
                <SingleActiveDirectDebit item={item} />
              </ul>
              {index === 0 && <hr className="border-t border-gray-200 mx-2" />}
            </div>
          ))
        )}
      </section>
    </div>
  );
};
