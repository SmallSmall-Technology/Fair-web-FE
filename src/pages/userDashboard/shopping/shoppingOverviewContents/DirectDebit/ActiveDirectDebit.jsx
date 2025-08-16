import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SingleActiveDirectDebit } from './SingleActiveDirectDebit';
import { getOngoingOrders } from '../../../../../features/order/orderSlice';

export const ActiveDirectDebit = () => {
  // const ongoingOrders = useSelector(getOngoingOrders);
  const linkedAccounts = 2;
  return (
    <div className="mb-6 lg:mb-0 font-inter ">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4 font-outfit">
          {' '}
          Direct debit
        </h1>
        <Link
          to="/user-dashboard/shopping-overview/purchased"
          className="underline font-medium text-[#737376] text-sm"
        ></Link>
      </div>

      <section className="grid grid-cols-1 gap-4  w-full rounded-[6px]">
        {linkedAccounts === 0 ? (
          <p className="flex justify-center items-center font-medium bg-[#F6F6F6]  rounded-[10px] h-[141px]">
            No linked account
          </p>
        ) : (
          <div className="mt-4">
            <button className="cursor-pointer w-fit font-outfit border border-[#222224] bg-[#F7F7F7] rounded-[30px] p-2 px-4">
              Linked account
            </button>
            <hr className="mt-6 mb-4" />

            <p className="text-[#737376] text-sm">Linked acount</p>
          </div>
        )}
      </section>
    </div>
  );
};
