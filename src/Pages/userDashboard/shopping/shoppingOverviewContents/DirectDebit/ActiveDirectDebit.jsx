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

      <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px] ">
        {ongoingOrders.length === 0 ? (
          <p className="text-cente text-gray-500 bg-[#F6F6F6] p-4 rounded-[10px]">
            No active direct debit
          </p>
        ) : (
          ongoingOrders.slice(0, 2).map((item, index) => (
            <ul key={index} className="p-2 overflow-clip">
              <SingleActiveDirectDebit item={item.items} key={item.id} />
            </ul>
          ))
        )}
      </section>
    </div>
  );
};
