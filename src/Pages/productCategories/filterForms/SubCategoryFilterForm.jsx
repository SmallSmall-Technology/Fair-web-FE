import { CircleX } from "lucide-react";
import { Formik, Form, Field } from "formik";

const SubCategoryFilterForm = ({
  categoryProducts,
  handleFilter,
  products,
}) => {
  const getUniqueOptions = (products, key) => {
    return [...new Set(products.map((product) => product[key]))];
  };

  return (
    <Formik
      initialValues={{ type: "", brand: "", price: "" }}
      onSubmit={handleFilter}
    >
      {({ values, handleChange, resetForm }) => {
        const filterCount = Object.values(values).filter(Boolean).length;

        const handleResetFilter = () => {
          resetForm();
        };

        return (
          <Form className="grid gap-4">
            {/* Filter Controls */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {/* Size Select */}
              <div className="flex-1 min-w-[120px]">
                <label htmlFor="size" className="sr-only">
                  Size of product
                </label>
                <Field
                  as="select"
                  id="size"
                  name="size"
                  value={values?.size}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
                >
                  <option value="" disabled>
                    Size
                  </option>

                  {getUniqueOptions(categoryProducts || products, "Size").map(
                    (size, index) => (
                      <option key={index} value={size}>
                        {size || "Size"}
                      </option>
                    )
                  )}
                </Field>
              </div>

              {/* Brand Select */}
              <div className="flex-1 min-w-[120px]">
                <label htmlFor="brand" className="sr-only">
                  Select Brand
                </label>
                <Field
                  as="select"
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
                >
                  <option value="" disabled>
                    Brand
                  </option>
                  {getUniqueOptions(categoryProducts || products, "brand").map(
                    (brand, index) => (
                      <option key={index} value={brand}>
                        {brand}
                      </option>
                    )
                  )}
                </Field>
              </div>

              {/* Price Range Select */}
              <div className="flex-1 min-w-[120px]">
                <label htmlFor="price" className="sr-only">
                  Select Price Range
                </label>
                <Field
                  as="select"
                  id="price"
                  name="price"
                  value={values?.price && 0}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
                >
                  <option value="" disabled>
                    Price
                  </option>
                  <option value="0-50000">₦0 - ₦50,000</option>
                  <option value="50000-200000">₦50,000 - ₦200,000</option>
                  <option value="200000-500000">₦200,000 - ₦500,000</option>
                  <option value="500000+">₦500,000+</option>
                </Field>
              </div>

              {/* Sales Select */}

              <div className="flex-1 min-w-[120px]">
                <label htmlFor="brand" className="sr-only">
                  Sales
                </label>
                <Field
                  as="select"
                  id="sales"
                  name="sales"
                  value={values?.sales && 0}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
                >
                  <option value="" disabled>
                    Sales
                  </option>
                  {getUniqueOptions(categoryProducts || products, "sales").map(
                    (sales, index) => (
                      <option key={index} value={sales && 0}>
                        {sales || "Sales"}
                      </option>
                    )
                  )}
                </Field>
              </div>

              {/* <hr className="mb- w-full flex md:hidden" /> */}

              {/* Divider */}
              <div className="flex items-center">
                <hr className="w-full my-4 md:w-0.5 md:h-8 bg-gray-300 mr-4" />

                {/* Applied Filters Count (Desktop) */}
                <div
                  className="hidden rounded-2xl border-2 bg-[#F7F7F7] text-xs md:flex items-center px-3 py-2"
                  role="status"
                  aria-live="polite"
                >
                  <span>
                    {filterCount === 0
                      ? "No filter(s) applied"
                      : filterCount > 1
                      ? `${filterCount} filters applied`
                      : `${filterCount} filter applied`}
                  </span>
                  <button
                    type="submit"
                    onClick={handleResetFilter}
                    className="ml-2"
                    title="Clear all filters"
                    aria-label="Clear filters"
                  >
                    <CircleX
                      size={12}
                      fill="black"
                      color="white"
                      className="cursor-pointer"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Applied Filters Count (Mobile) */}
            <div className="flex md:hidden">
              <div
                className="rounded-2xl border-2 bg-[#F7F7F7] text-xs flex items-center px-3 py-2"
                role="status"
                aria-live="polite"
              >
                <span>
                  {filterCount === 0
                    ? "No filter(s) applied"
                    : filterCount > 1
                    ? `${filterCount} filters applied`
                    : `${filterCount} filter applied`}
                </span>
                <button
                  type="submit"
                  onClick={handleResetFilter}
                  className="ml-2"
                  title="Clear all filters"
                  aria-label="Clear filters"
                >
                  <CircleX
                    size={12}
                    fill="black"
                    color="white"
                    className="cursor-pointer"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SubCategoryFilterForm;
