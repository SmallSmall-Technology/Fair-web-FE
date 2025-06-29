import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/FormatCurrency';
import { getTotalCartPrice } from '../../features/cart/cartSlice';

export const CheckoutPaymentSuccessContent = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const currentPlan = cartItems.find((item) => item.paymentPlan === 'upfront');
  const orderNumber = 'I7xAA6b';

  const total = useSelector(getTotalCartPrice);
  return (
    <article className="">
      {!currentPlan ? (
        <section className="border rounded-md px-3 lg:px-7 pt-5 lg:w-[510px] ">
          <div className="pt-3">
            <img
              src="/images/check 1.svg"
              alt="Company Logo"
              className="mb-2"
            />
            <h1 className="font-bold text-xl">Thank you for your payment</h1>
            <p className="text-[#96959F font-normal">
              Your order was completed successfully.
            </p>
          </div>
          <hr className="my-4" />
          <div>
            <div className="flex justify-between mb-4">
              <ul className="leading-7 ">
                <li className="text-[#96959F]">Order number</li>
                <li className="text-[#96959F]">Order date</li>
                <li className="text-[#96959F]">Order paid</li>
              </ul>
              <ul className="leading-7">
                <li className="font-medium">{orderNumber}</li>
                <li className="font-medium">12, Dec, 2020</li>
                <li className="font-medium">{formatCurrency(total)}</li>
              </ul>
            </div>
            <p className="text-[#96959F]">
              This is a confirmation of your order!
            </p>
          </div>

          <hr className="my-4" />
          <div className="text-[#96959F]">
            <p className="font-medium mb-4">Whats next?</p>
            <ul className="leading-7 list-disc px-4">
              <li>
                You will receive a confirmation email shortly with the details
                of your order.
              </li>
              <li>
                Your item(s) will be shipped to the address provided during
                checkout.
              </li>
              <li>You can track your order status through your account.</li>
            </ul>
          </div>
          <hr className="my-4" />
          <div className="text-[#96959F]">
            <p className="leading-7 ">
              We appreciate your business and hope you enjoy your purchase! If
              you have any questions or need assistance, feel free to reach out
              to our customer support team at{' '}
              <span className="underline">
                <Link to="/">help@fairapp.ng</Link>
              </span>
            </p>
            <Link to="/" className="flex items-center space-x-1 mt-6 pb-3 mb-4">
              <p className="font-medium underline">Continue shopping </p>
              <span>
                <img
                  src="/images/shopping-basket 1.svg"
                  alt="shopping basket"
                />
              </span>
            </Link>
          </div>
        </section>
      ) : (
        <section className="border rounded-md px-3 lg:px-7 pt-5 lg:w-[510px] font-[#96959F]">
          <div className="pt-3">
            <img
              src="/images/check 1.svg"
              alt="Company Logo"
              className="mb-2"
            />
            <h1 className="font-bold text-xl">Thank you for your payment</h1>
            <p className="text-[#96959F] pt-2">
              Your order was completed successfully.
            </p>
          </div>
          <hr className="my-4" />
          <div className="text-[#96959F]">
            <p className="font-semibold mb-3">
              Setup & activate direct debit to complete your order!
            </p>
            <p className="text-sm font-normal mb-2">Whats next?</p>
            <ul className="text-sm text-[#96959F] flex flex-col leading-7 list-disc mx-5 min-w[413px]">
              <li>
                To set up your direct debit payment, please keep an eye on your
                email inbox. You will receive an email shortly with detailed
                instructions on how to complete the setup process.
              </li>
              <li>
                You will receive a confirmation email shortly with the details
                of your order after direct debit is active.
              </li>
              <li>
                Your item(s) will be shipped to the address provided during
                checkout.
              </li>
              <li>You can track your order status through your account.</li>
              <li>
                You will receive an email confirmation for each scheduled
                instalment payment processed.
              </li>
            </ul>
            <p className="text-sm font-normal pt-6">Important</p>
            <ul className="text-sm leading-7 list-disc mx-5 min-w[413px]">
              <li>
                If you do not see the email within the next few minutes, please
                check your spam or junk folder.
              </li>
              <li>
                Ensure that the email address you provided during sign up is
                correct to avoid any delays.
              </li>
            </ul>
          </div>

          <hr className="my-4" />

          <div>
            <div className="flex justify-between mb-4">
              <ul className="leading-7 text-sm ">
                <li className="text-[#96959F]">Order number</li>
                <li className="text-[#96959F]">Order date</li>
                <li className="text-[#96959F]">Order paid</li>
              </ul>
              <ul className="leading-7 text-sm font-medium flex flex-col items-end">
                <li className="font-medium">{orderNumber}</li>
                <li className="font-medium">12, Dec, 2020</li>
                <li className="font-medium">{formatCurrency(total)}</li>
              </ul>
            </div>
          </div>

          <hr className="mb-4 mt-6" />

          <div className="text-[#96959F]">
            <p className="leading-7 text-sm font-medium">
              If you have any questions or need assistance, feel free to reach
              out to our customer support team at
              <span className="underline">
                <Link to="/">help@fairapp.ng</Link>
              </span>
            </p>
            <Link to="/" className="flex items-center space-x-1 mt-6 pb-3 mb-4">
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
        </section>
      )}
    </article>
  );
};
