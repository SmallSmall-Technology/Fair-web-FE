import { useState } from "react";
import { Search } from "lucide-react";
import { Field, Form, Formik } from "formik";
import { PurchaseOngoing } from "./purchaseContentSection/PurchaseOngoing";
import { PurchaseCompleted } from "./purchaseContentSection/PurchaseCompleted";
import { PurchaseCancelled } from "./purchaseContentSection/PurchaseCancelled";

export const Purchases = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [formIsActive, setFormIsActive] = useState(false);

  const initialValues = {
    search: "",
  };

  const handleSearchQuery = (values, { resetForm }) => {
    // console.log(values);
    resetForm();
    setFormIsActive();
  };

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl mb-3"> Purchases</h1>
        <div className="flex lg:hidden">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSearchQuery}
            onReset=""
          >
            <Form>
              {formIsActive ? (
                <>
                  {/* <label></label> */}
                  <div className="flex items-center space-x-1 relative">
                    <Field
                      type="text"
                      name="search"
                      placeholder="Search by order id"
                      className=" rounded-md p-2 border pl-2"
                    />
                    <button
                      type="submit"
                      className="absolute flex right-[2px] text-xs items-center border-[#737376] py-[10px] px-1 bg-[#FFDE11] rounded"
                    >
                      {" "}
                      <Search size={12} /> Search
                    </button>
                  </div>
                </>
              ) : (
                <button
                  type="submit"
                  className=" flex items-center border-[#737376] p-2 bg-[#FFDE11] rounded"
                  onClick={() => setFormIsActive(true)}
                >
                  {" "}
                  <Search size={15} /> Search
                </button>
              )}
            </Form>
          </Formik>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex justify-between w-full lg:justify-start lg:space-x-3">
          <button
            className={`p-2 rounded-[30px] text-sm lg:text-base border 
            ${
              activeTab === "ongoing"
                ? "border-black text-black font-medium"
                : "border-[#737376] text-[#737376]"
            }`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing <span>(2)</span>
          </button>
          <button
            className={`p-2 rounded-[30px] text-sm lg:text-base border 
              ${
                activeTab === "completed"
                  ? "border-black text-black font-medium"
                  : "border-[#737376] text-[#737376]"
              }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed <span>(1)</span>
          </button>{" "}
          <button
            className={`p-2 rounded-[30px] text-sm lg:text-base border 
              ${
                activeTab === "cancelled"
                  ? "border-black text-black font-medium"
                  : "border-[#737376] text-[#737376]"
              }`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled <span>(1)</span>
          </button>
        </div>

        <div className="hidden lg:block">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSearchQuery}
            onReset=""
          >
            <Form>
              {/* <label></label> */}
              <div className="flex space-x-1">
                <Field
                  type="text"
                  name="search"
                  placeholder="Search by order id"
                  className="rounded-md p-2 border"
                />
                <button
                  type="submit"
                  className=" flex items-center border-[#737376] p-2 bg-[#FFDE11] rounded"
                >
                  {" "}
                  <Search size={15} /> Search
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>

      <hr className="my-4" />

      {activeTab === "ongoing" && <PurchaseOngoing />}
      {activeTab === "completed" && <PurchaseCompleted />}
      {activeTab === "cancelled" && <PurchaseCancelled />}
    </section>
  );
};
