import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/FormatCurrency';
import { useEffect } from 'react';

export const CheckoutPaymentSuccessContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = location.state || {};
  const { orderId } = useParams();

  console.log('orderId', orderId);

  useEffect(() => {
    // If there's no amount (user came directly to URL), redirect away
    if (!amount) {
      navigate('/cart-items', { replace: true });
    }
  }, [amount, navigate]);

  return (
    <article className="">
      <section className="border rounded-md px-3 lg:px-7 pt-5 lg:w-[510px] font-[#96959F]">
        <div className="pt-3">
          <img src="/images/check 1.svg" alt="Company Logo" className="mb-2" />
          <h1 className="font-bold text-xl">Thank you for your payment</h1>
          <p className="text-[#96959F] pt-2">
            Your order was completed successfully.
          </p>
        </div>
        <hr className="my-4" />
        <div className="text-[#96959F]">
          <div className="flex justify-between mb-4">
            <ul className="leading-7 text-sm ">
              <li className="text-[#96959F]">Order number</li>
              <li className="text-[#96959F]">Order date</li>
              <li className="text-[#96959F]">Order paid</li>
            </ul>
            <ul className="font-inter text-black leading-7 text-sm font-medium flex flex-col items-end">
              <li className="font-medium">{orderId || 'N/A'}</li>
              <li className="font-medium">{new Date().toLocaleDateString()}</li>

              <li className="font-medium ">{formatCurrency(amount)}</li>
            </ul>
          </div>
          <p className=" mb-3">This is a confirmation of your order</p>
          <hr className="my-4" />

          <p className="text-sm font-normal mb-2">Whats next?</p>
          <ul className="text-sm text-[#96959F] flex flex-col leading-7 list-disc mx-5 min-w[413px]">
            <li>
              You will receive a confirmation email shortly with the details of
              your order.
            </li>
            <li>
              Your item(s) will be shipped to the address provided during
              checkout.
            </li>
            <li>You can track your order status through your account.</li>
          </ul>
        </div>

        <hr className="mb-4 mt-6" />

        <div className="text-[#96959F]">
          <p className="leading-7 text-sm font-medium">
            We appreciate your business and hope you enjoy your purchase! If you
            have any questions or need assistance, feel free to reach out to our
            customer support team at
            <span className="underline">
              <Link to="/">help@fairapp.ng</Link>
            </span>
          </p>
          <Link to="/" className="flex items-center space-x-1 mt-6 pb-3 mb-4">
            <p className="font-medium text-sm underline">Continue shopping </p>
            <span>
              <img src="/images/shopping-basket 1.svg" alt="shopping basket" />
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
};
