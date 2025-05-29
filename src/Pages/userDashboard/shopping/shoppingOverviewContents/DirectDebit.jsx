import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getOngoingOrders } from '../../../../features/order/orderSlice';
import { formatCurrency } from '../../../../utils/FormatCurrency';

const DirectDebit = () => {
  return (
    <>
      <section className="">
        <h1 className="font-semibold text-2xl mb-4"> Active direct debit</h1>
        <article className="border rounded-[10px] h-44 bg-[F6F6F6]"></article>
        <ActiveDirectDebit />
      </section>
    </>
  );
};

export default DirectDebit;

export const ActiveDirectDebit = () => {
  const ongoingOrders = useSelector(getOngoingOrders);
  return (
    <div className="mb-6 lg:mb-0 lg:w-1/2 ">
      <div className="flex justify-between items-baseline">
        <h1 className="font-semibold text-2xl mb-4"> Active direct debit</h1>
        <Link
          to="/user-dashboard/shopping-overview/purchased"
          className="underline font-medium text-[#737376] text-sm"
        >
          {/* {ongoingOrders < 1 ? '' : 'See all'} */}
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-4 border w-full rounded-[10px] p-2">
        {ongoingOrders.length === 0 ? (
          <p className="text-center text-gray-500">No expected direct debit</p>
        ) : (
          ongoingOrders.slice(0, 2).map((item, index) => (
            <ul key={index}>
              <SingleActiveDirectDebit item={item.items} key={item.id} />
            </ul>
          ))
        )}
      </section>
    </div>
  );
};

const SingleActiveDirectDebit = ({ item }) => {
  return (
    <li className="recentlyviewed-item grid grid-cols-1 gap-3">
      {item.map((product, index) => (
        <div key={index}>
          <Link>
            <div className="flex lg:items-center py-3 px- justify-between text-balance">
              <div className="flex lg:items-center md:space-x-3 gap-1">
                <div className="h-[60px] w-[60px]">
                  <img
                    src={product?.image || '/placeholder-image.jpg'}
                    className="h-full w-full rounded-lg object-cover"
                    alt={product?.name}
                  />
                </div>
                <div>
                  <p className="mb-3 text-xs md:text-sm text-balance">
                    {product.name.length > 30
                      ? product.name.slice(0, 30) + '...'
                      : product?.name || 'Unnamed Product'}
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[#737376] text-xs font-normal">Next</p>
                      <p className="text-xs md:text-sm">
                        {product?.price
                          ? `${formatCurrency(product.price)}`
                          : 'Price not available'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#737376] text-xs font-normal">
                        Duration
                      </p>
                      <p className="text-xs md:text-sm">
                        {product?.paymentPlanDetails
                          ? `${formatCurrency(product.price)}`
                          : '3 Months'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#737376] text-xs font-normal">
                        Start date
                      </p>
                      <p className="text-sm">
                        {product?.paymentPlanDetails
                          ? `${formatCurrency(product.price)}`
                          : 'Apr 4, 2025'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end ">
                <button className="mb-3">
                  <ChevronRight className="cursor-pointer" size={18} />
                </button>
              </div>
            </div>
          </Link>
          {/* <hr /> */}
        </div>
      ))}
    </li>
  );
};
