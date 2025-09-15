import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../../../../utils/FormatCurrency';

export const SingleActiveDirectDebit = ({ orders }) => {
  // Flatten all items from all orders
  const allItems = orders.flatMap((order) => order.items || []);

  // Get only the first 3 items
  const recentItems = allItems.slice(0, 2);

  return (
    <li className="recentlyviewed-item grid grid-cols-1 gap-3">
      {recentItems.map((item, index) => (
        <div key={index}>
          <Link>
            <div className="flex lg:items-center py-3 justify-between text-balance">
              <div className="flex lg:items-center md:space-x-3 gap-1">
                <div className="h-[60px] w-[60px] border rounded-xl flex justify-center items-center">
                  <img
                    src={item?.coverImage || '/placeholder-image.jpg'}
                    className="h-[44px] w-[44px] rounded-lg object-cover"
                    alt={item?.productName}
                  />
                </div>
                <div>
                  <p className="mb-3 text-xs md:text-sm text-balance">
                    {item.productName?.length > 30
                      ? item.productName.slice(0, 30) + '...'
                      : item?.productName || 'Unnamed Product'}
                  </p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[#737376] text-xs font-normal">Next</p>
                      <p className="text-xs md:text-sm">
                        {item?.price
                          ? `${formatCurrency(item.price)}`
                          : 'Price not available'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#737376] text-xs font-normal">
                        Duration
                      </p>
                      <p className="text-xs md:text-sm">
                        {item?.paymentPlanDetails
                          ? `${item.paymentPlanDetails.duration}`
                          : '3 Months'}
                      </p>
                    </div>

                    <div>
                      <p className="text-[#737376] text-xs font-normal">
                        Start date
                      </p>
                      <p className="text-sm">
                        {item?.startDate
                          ? new Date(item.startDate).toLocaleDateString()
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
        </div>
      ))}
    </li>
  );
};
