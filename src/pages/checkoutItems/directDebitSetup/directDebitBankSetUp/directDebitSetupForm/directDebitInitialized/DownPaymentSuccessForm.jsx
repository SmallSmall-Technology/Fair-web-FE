import { useSelector } from 'react-redux';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import { Link } from 'react-router-dom';

export const DownPaymentSuccessForm = ({ orderDetails }) => {
  const mandateData = useSelector((state) => state.mandate.data);

  const order = orderDetails?.data || {};
  const items = orderDetails?.data?.items || [];
  return (
    <section className=" w-full border rounded-[7px] px-3 lg:px-7 pt-5  text-[#96959F] bg-white">
      <div className="pt-3">
        <img src="/images/check 1.svg" alt="Company Logo" className="mb-2" />
        <h1 className="font-bold text-[23px] text-black">
          Order Placed Successfully!
        </h1>
        <p className="py-2">Thank you for your order.</p>
        <p>
          Your down payment has been received for your order, and the direct
          debit mandate has been successfully set up which authorizes us to
          debit your monthly installments.
        </p>
      </div>

      {/* Styled horizontal line */}
      <hr className="my-4 border-t border-gray-300" />

      <div>
        <p className="text-sm font-normal mb-2">Whats next?</p>
        <ul className="text-sm flex flex-col leading-7 list-disc mx-5 md:min-w-[413px]">
          <li>
            You'll receive a confirmation email shortly with your order details,
            including the direct debit mandate details.
          </li>
          <li>
            Your order will be prepared and delivered based on the delivery
            option you selected. We’ll keep you updated on the progress of your
            order.
          </li>
        </ul>
      </div>

      <hr className="mb-4 mt-6 border-t border-gray-300" />

      <p className="leading-7 text-sm font-medium mb-3 hidden md:block">
        If you have any questions or need assistance, feel free to reach out to
        our customer support team at{' '}
        <span className="underline">
          <Link to="/">help@fairapp.ng</Link>
        </span>
      </p>
      {/* <hr className="mb-4 mt-6 border-t border-gray-300" /> */}
      <div className="md:hidden  mt-6 pb-4">
        <p className="text-black text-sm font-semibold font-outfit text-start px-2 pb-4 lg:px-6">
          SUMMARY OF YOUR PLACED ORDER!
        </p>
        <div className="rounded-xl border py-8 shadow-sm flex flex-col justify-start items-start bg-white border-[#DEDEDE] text-black">
          <div className="flex justify-between items-start px-4 lg:px-6">
            <div>
              <p className="text-[13px] font-medium font-inter">ITEMS</p>
              {items?.map((product, index) => (
                <div key={index} className="mb-2">
                  <p className="text-[15px]">{product?.productName}</p>
                  <p className="text-xs font-inter text-gray-600">
                    {product.aboutProduct?.length > 50
                      ? product.aboutProduct.slice(0, 50) + '...'
                      : product.aboutProduct}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <span className="text-xs font-inter underline">
                Order id - {order.orderNumber}
              </span>
            </div>
          </div>

          <div className="text-[11px] flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
            <p>DELIVERY ({items?.[0]?.deliveryType?.toUpperCase()})</p>
            {/* <p>{items?.deliveryType.price}</p> */}
          </div>

          <div className=" text-[11px] flex justify-between items-center w-full mt-4 mb-2 px-4 lg:px-6">
            <p>DOWNPAYMENT</p>
            <p className="font-semibold font-outfit">
              {formatCurrency(order?.totalAmount)}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium mb-3">
            If you have any questions or need assistance, feel free to reach out
            to our customer support team at{' '}
            <span className="underline">
              <Link to="/">support@smallsmall.com</Link>
            </span>
          </p>
          <div className="flex  md:hidden items-center space-x-2 mt-6">
            <Link
              to="/user-dashboard/shopping-overview/purchases"
              className="flex items-center space-x-1  text-[#96959F]"
            >
              <p className="font-medium text-sm underline">See order details</p>
            </Link>{' '}
            <span>or</span>
            <Link
              to="/"
              className="flex items-center space-x-1   text-[#96959F]"
            >
              <p className="font-medium text-sm underline">
                Continue shopping{' '}
              </p>
              <span>
                <img
                  src="/images/shopping-basket 1.svg"
                  alt="shopping basket"
                />
              </span>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2 mt-6 ml-6">
          <Link
            to="/user-dashboard/shopping-overview/purchases"
            className="flex items-center space-x-1  text-[#96959F]"
          >
            <p className="font-medium text-sm underline">see order details</p>
          </Link>{' '}
          <span>or</span>
          <Link to="/" className="flex items-center space-x-1   text-[#96959F]">
            <p className="font-medium text-sm underline">Continue shopping </p>
            <span>
              <img src="/images/shopping-basket 1.svg" alt="shopping basket" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
