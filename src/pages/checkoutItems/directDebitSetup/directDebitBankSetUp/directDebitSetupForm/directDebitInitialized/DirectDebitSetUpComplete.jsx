import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getOrderDetails } from '../../../../../../api/orderAPI';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const DirectDebitSetupComplete = ({ orderDetails }) => {
  const order = orderDetails?.data || {};
  const items = orderDetails?.data?.items || [];

  const mandateData = useSelector((state) => state.mandate.data);

  return (
    <article className="hidden md:block w-full">
      <div className="rounded-[7px] border py-8 shadow-sm flex flex-col justify-start items-start bg-white border-[#DEDEDE]">
        <p className="text-sm font-semibold font-outfit text-start px-4 lg:px-6">
          SUMMARY OF YOUR PLACED ORDER!
        </p>

        <hr className=" border-t border-[#E5E5E5] my-4 px-6 w-[calc(100%-3rem)] flex mx-auto" />

        <div className="flex justify-between items-start px-4 lg:px-6 w-full">
          <div>
            <p className="text-[13px] font-medium font-inter mb-4">ITEMS</p>
            <div className="mb-4">
              {items?.map((product, index) => (
                <div key={index} className="mb-2">
                  <p className="text-[15px]">{product.productName}</p>
                  <p className="text-xs font-inter text-gray-600">
                    {product.aboutProduct?.length > 50
                      ? product.aboutProduct.slice(0, 50) + '...'
                      : product.aboutProduct}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-inter underline">
              Order id - {order.orderNumber}
            </p>
          </div>
        </div>

        <hr className="w-full border-t border-[#E5E5E5] my-2" />

        <div className="flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
          <p>DELIVERY ({items?.[0]?.deliveryType?.toUpperCase()})</p>
        </div>

        <hr className="w-full border-t border-[#E5E5E5] my-2" />

        <div className="flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
          <p>DOWNPAYMENT</p>
          <p className="font-semibold font-outfit">
            {formatCurrency(order?.totalAmount)}
          </p>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-2 mt-6 ml-6">
        <Link
          to="/user-dashboard/shopping-overview/purchases"
          className="flex items-center space-x-1  text-[#96959F]"
        >
          <p className="font-medium text-sm underline">See order details</p>
        </Link>{' '}
        <span>or</span>
        <Link to="/" className="flex items-center space-x-1   text-[#96959F]">
          <p className="font-medium text-sm underline">Continue shopping </p>
          <span>
            <img src="/images/shopping-basket 1.svg" alt="shopping basket" />
          </span>
        </Link>
      </div>
    </article>
  );
};
