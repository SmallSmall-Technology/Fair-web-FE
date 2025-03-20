import { YellowButton } from "../../../utils/Button.jsx";
import { Field, Form, Formik } from "formik";
import { formatCurrency } from "../../../utils/FormatCurrency.jsx";

export const CheckoutPaymentMethod = () => {
  const handleSubmitPaymentMethod = (values, { resetForm }) => {
    resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={{ picked: "" }}
        resetForm=""
        onSubmit={handleSubmitPaymentMethod}
      >
        {({ values }) => (
          <Form className="px-8 lg:px-0">
            <h1 className="lg:hidden text-lg font-bold mt-6 mb-3">
              Payment method
            </h1>

            <div
              role="group"
              aria-labelledby="my-radio-group"
              className="rounded-md lg:border lg:border-[#E5E5E5] mb-10"
            >
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
                <label htmlFor="Interest Free Credit" className="text-sm">
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
            <div className="hidden lg:block">
              <YellowButton>Pay now</YellowButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
