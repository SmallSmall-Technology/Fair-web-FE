import * as Yup from "yup";
import { states } from "../../../utils/data";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CheckoutDeliveryAddressButton } from "../../../utils/Button";

export const CheckoutDeliveryAddressForm = ({
  deliveryAddress,
  isSubmitted,
  handleEditedDeliveryAddress,
  handleSubmitDeliveryAddress,
  handleOpenCheckoutDeliveryAddressForm,
  inputRef,
}) => {
  const validationSchema = Yup.object({
    state: Yup.string().required("State is required"),
    address: Yup.string()
      .min(5, "Must be at least 5 characters")
      .required("Address is required"),
  });

  return (
    <Formik
      initialValues={{ state: "", address: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, action) => {
        if (deliveryAddress.length > 0) {
          handleEditedDeliveryAddress(values, action);
        } else {
          handleSubmitDeliveryAddress(values, action);
        }
      }}
    >
      {(formik) => (
        <Form className="mx-8 mt-10">
          <h1 className="font-medium text-[21px] mb-3 hidden lg:block">
            Delivery Form
          </h1>
          <h1 className="font-medium text-[21px] mb-3 lg:hidden">
            Shipping Form
          </h1>

          {/* State Dropdown */}
          <div>
            <label htmlFor="state" className="sr-only">
              Select state
            </label>
            <Field
              as="select"
              name="state"
              id="state"
              innerRef={inputRef}
              className="border border-[#DEDEDE] rounded-[5px] px-3 py-2 font-medium w-full hidden lg:block"
            >
              <option value="" disabled className="hidden">
                State
              </option>
              {states.map((state, index) => (
                <option value={state.name} key={index}>
                  {state.name}
                </option>
              ))}
            </Field>
            <Field
              as="select"
              name="state"
              id="state"
              innerRef={inputRef}
              className="border border-[#DEDEDE] rounded-[5px] px-3 py-2 font-medium w-full block lg:hidden"
            >
              <option value="" disabled>
                Choose State
              </option>
              {states.map((state, index) => (
                <option value={state.name} key={index}>
                  {state.name}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="state"
              component="div"
              className="text-red-600 mb-2 text-xs"
            />
          </div>
          {/* Address Dropdown */}
          <div className="my-4">
            <label htmlFor="address" className="sr-only">
              Select address
            </label>
            <Field
              as="textarea"
              name="address"
              id="address"
              placeholder="Street address"
              className="border border-[#DEDEDE] rounded-[5px] px-3 py-2 font-medium w-full hidden lg:block"
            ></Field>
            <Field
              as="textarea"
              name="address"
              id="address"
              placeholder="Enter delivery address"
              className="border border-[#DEDEDE] rounded-[5px] px-3 py-2 font-medium w-full lg:hidden "
            ></Field>
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-600 mb-2 text-xs"
            />
          </div>

          <CheckoutDeliveryAddressButton
            type="submit"
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg w-[30%]"
            // onClick={handleCloseForm}
          >
            {isSubmitted ? "Edit delivery address" : "Save delivery address"}
          </CheckoutDeliveryAddressButton>
        </Form>
      )}
    </Formik>
  );
};
