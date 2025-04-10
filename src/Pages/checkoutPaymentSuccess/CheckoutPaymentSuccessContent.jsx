import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/FormatCurrency";
import { getTotalCartPrice } from "../../features/cart/cartSlice";

export const CheckoutPaymentSuccessContent = () => {
  const orderNumber = "I7xAA6b";
  const total = useSelector(getTotalCartPrice);
  return (
    <article className="">
      <section className="border rounded-md px-3 lg:px-7 pt-5 lg:w-[510px] ">
        <div className="pt-3">
          <img src="/images/check 1.svg" alt="Company Logo" className="mb-2" />
          <h1 className="font-bold text-xl">Thank you for your payment</h1>
          <p className="text-[#96959F]">
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
        <hr className="my-4" />
        <div className="text-[#96959F]">
          <p className="leading-7 ">
            We appreciate your business and hope you enjoy your purchase! If you
            have any questions or need assistance, feel free to reach out to our
            customer support team at{" "}
            <span className="underline">
              <Link to="/">help@fairapp.ng</Link>
            </span>
          </p>
          <Link to="/" className="flex items-center space-x-1 mt-6 pb-3 mb-4">
            <p className="font-medium underline">Continue shopping </p>
            <span>
              <img src="/images/shopping-basket 1.svg" alt="shopping basket" />
            </span>
          </Link>
        </div>
      </section>
    </article>
  );
};
