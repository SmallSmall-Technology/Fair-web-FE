import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { YellowButton } from "../../../utils/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { formatCurrency } from "../../../utils/FormatCurrency.jsx";
import {
  getTotalCartPrice,
  clearCart,
} from "../../../features/cart/cartSlice.js";
import {
  createOrder,
  makePayment,
} from "../../../features/order/orderSlice.js";
import userSlice, {
  getDeliveryAddress,
} from "../../../features/user/userSlice.js";

const API_URL = "http://localhost:3000";

export const CheckoutPaymentMethod = ({ onSubmitPaymentMethod }) => {
  const onDeliveryAddress = useSelector(getDeliveryAddress);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const cartItems = useSelector((state) => state.cart.cart);

  const VAT = (7.5 / 100) * totalCartPrice;
  const shippingFee = 1200;
  const subTotal = totalCartPrice;
  const total = totalCartPrice + VAT + shippingFee;

  const validationSchema = Yup.object({
    picked: Yup.string().required("Please select a payment option"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (onDeliveryAddress.length === 0) {
      toast.dismiss();
      toast.error("Please input your delivery address", {
        className:
          "bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0",
        bodyClassName: "m-0 p-0",
        closeButton: false,
      });
      return;
    }

    if (userSlice) setSubmitting(true);
    try {
      // Fetch full product details for each cart item
      const enrichedCartItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await axios.get(
            `${API_URL}/products/${item.productId}`
          );
          return {
            ...item,
            name: product.data.name,
            image: product.data.image,
            soldBy: product.data.brand,
          };
        })
      );

      if (values.picked === "interest-free-credit") {
        // const initialPayment = totalCartPrice * 0.1;
        const initialPayment = totalCartPrice;

        const order = await dispatch(
          createOrder({ cartItems: enrichedCartItems, initialPayment })
        ).unwrap();

        toast.info(
          `Payment plan started with ₦${initialPayment.toFixed(
            2
          )} initial payment!`,
          {
            className:
              "bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0",
            bodyClassName: "m-0 p-0",
            closeButton: false,
          }
        );

        navigate("/user-dashboard/shopping-overview/purchases");
      } else {
        const order = await dispatch(
          createOrder({
            cartItems: enrichedCartItems,
            initialPayment: totalCartPrice,
          })
        ).unwrap();
        setTimeout(async () => {
          await dispatch(
            makePayment({ orderId: order.id, amount: 0 })
          ).unwrap();
          await dispatch(clearCart()).unwrap();
          toast.success(
            `Payment of ₦${totalCartPrice} successful via ${values.picked}!`,
            {
              className:
                "bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0",
              bodyClassName: "m-0 p-0",
              closeButton: false,
            }
          );

          navigate("/user-dashboard/shopping-overview/purchases");
        }, 2000);
      }
      resetForm();
    } catch (error) {
      toast.dismiss();
      toast.error("Payment failed. Please try again.", {
        className:
          "bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0",
        bodyClassName: "m-0 p-0",
        closeButton: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ picked: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="px-8 lg:px-0">
            <h1 className="lg:hidden text-lg font-bold mt-6 mb-3">
              Payment method
            </h1>
            {/* <p className="mb-4">Total: {formatCurrency(total)}</p> */}
            {totalCartPrice > 100000 ? (
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className="rounded-md lg:border lg:border-[#E5E5E5] mb-10"
              >
                <span id="payment-options-label" className="sr-only">
                  Payment Options
                </span>

                <div className="lg:px-4 py-1 lg:py-2">
                  <label htmlFor="wallet" className="text-sm">
                    <Field
                      type="radio"
                      id="wallet"
                      name="picked"
                      value="wallet"
                      className="px-4 py-10 mr-2"
                    />
                    Wallet{" "}
                    <span className="text-[#96959F] text-xs">
                      (Balance: {formatCurrency(45000)})
                    </span>
                  </label>
                </div>

                <hr className="hidden lg:block" />
                <div className="lg:px-4 py-1 lg:py-2">
                  <label htmlFor="debit-card" className="text-sm">
                    <Field
                      type="radio"
                      id="debit-card"
                      name="picked"
                      value="debit card"
                      className="px-4 py-10 mr-2"
                    />
                    Debit card{" "}
                  </label>
                </div>
                <hr className="hidden lg:block" />

                <div className="lg:px-4 py-1 lg:py-2">
                  <label htmlFor="interest-free-credit" className="text-sm">
                    <Field
                      type="radio"
                      id="interest-free-credit"
                      name="picked"
                      value="interest-free-credit"
                      className="px-4 py-10 mr-2"
                    />
                    Smallsmall Interest Free Credit{" "}
                    <span className="text-[#96959F] text-xs">
                      (Balance: {formatCurrency(0)})
                    </span>
                  </label>
                </div>
              </div>
            ) : (
              <div
                role="group"
                aria-labelledby="my-radio-group"
                className="rounded-md lg:border lg:border-[#E5E5E5] mb-10"
              >
                <span id="payment-options-label" className="sr-only">
                  Payment Options
                </span>
                <div className="lg:px-4 py-1 lg:py-2">
                  <label
                    htmlFor="direct-debit"
                    className="text-sm flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Field
                        type="radio"
                        id="direct-debit"
                        name="picked"
                        value="direct debit"
                        className="px-4 py-10 mr-2"
                      />
                      Direct debit
                      <span className="text-xs rounded-[2px] bg-[#FFDE11] py-1 px-2">
                        Recommended
                      </span>
                    </div>
                    <img src="/images/MonoLogo.svg" alt="Mono Logo" />
                  </label>
                </div>

                <hr className="hidden lg:block" />

                <div className="lg:px-4 py-1 lg:py-2">
                  <label htmlFor="interest-free-credit" className="text-sm">
                    <Field
                      type="radio"
                      id="interest-free-credit"
                      name="picked"
                      value="interest-free-credit"
                      className="px-4 py-10 mr-2"
                    />
                    Smallsmall Interest Free Credit{" "}
                    <span className="text-[#96959F] text-xs">
                      (Balance: {formatCurrency(0)})
                    </span>
                  </label>
                </div>
              </div>
            )}
            <ErrorMessage
              name="picked"
              component="div"
              className="text-red-500 text-xs mt-3"
            />
            <div className="hidden lg:block">
              <YellowButton
                type="submit"
                disabled={isSubmitting}
                onClick={onSubmitPaymentMethod}
              >
                {isSubmitting ? "Processing..." : "Pay now"}
              </YellowButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
