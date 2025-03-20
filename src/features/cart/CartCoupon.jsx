import { Formik, Form, Field } from "formik";

export const CartCoupon = () => {
  const initialValues = {
    coupon: "",
  };

  const handleSubmit = (values, actions) => {
    // console.log(values);
    actions.resetForm();
  };

  return (
    <div className="mt-8">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <div className="grid gap-2 lg:w-[70%]">
                <label htmlFor="coupon" className="flex items-center">
                  <span>
                    <img
                      src="../../../public/images/label.svg"
                      alt="label logo"
                    />
                  </span>
                  Apply a coupon code
                </label>
                <div className=" relative">
                  <Field
                    name="coupon"
                    type="text"
                    placeholder="Enter code"
                    className="border border-[#737376] w-full rounded-md py-2 px-4"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2  px-4 py-2 rounded"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? "Applying..." : "Apply"}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
