import { useSelector } from "react-redux";
import { PaymentPlan } from "./PaymentPlan";
import { DeleteItem } from "../../features/cart/DeleteItem";
import { formatCurrency } from "../../utils/FormatCurrency";
import { getCurrentQuantityById } from "../../features/cart/cartSlice";
import { SaveItemForLater } from "../../features/cart/SaveItemForLater";
import { UpdateItemQuantity } from "../../features/cart/UpdateItemQuantity";

export const CartItem = ({ item }) => {
  const currentQuantity = useSelector(getCurrentQuantityById(item.id));

  return (
    <article
      key={item.id}
      className="md:border-[1px] pb-4 md:border-[#E5E5E5]  rounded-[10px] w-full"
    >
      <div className="">
        {/* Product Details */}
        <section className="p-4">
          <div className="flex space-x-1 items-center mb-1 2xl:px-10">
            <img
              src="/public/images/sold-by-fair.svg"
              alt="Fair company logo"
              className="w-6 h-6"
            />
            <p className="underline">Fair</p>
          </div>

          <div className="grid md:grid-flow-col  items-center justify-between 2xl:px-10">
            <div className="flex items-start gap-4 ">
              <div className="w-[69px] h-[69px] md:w-[135px] md:h-[135px] ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h2 className="text-[#222224] font-medium text-sm text-balance mb-3">
                  {item.name}
                </h2>
                <div className="text-[#222224] font-medium text-sm">
                  <p>Qty: </p>
                  <UpdateItemQuantity
                    id={item.id}
                    currentQuantity={currentQuantity}
                  />
                </div>
                <p className="text-xl font-semibold mb-6 md:hidden mt-4">
                  {formatCurrency(item.price * currentQuantity)}
                </p>
              </div>
            </div>

            <div className="hidden md:grid">
              <p className="text-xl font-semibold mb-6">
                {formatCurrency(item.price * currentQuantity)}
              </p>
              <p className="text-xs">Interest-free credit</p>
              <p className="text-[#DB1C5E] mb-4">
                {formatCurrency(item?.interest || 20000)}
              </p>

              {/* Actions */}
              <div className="flex space-x-2 items-center mb-2">
                <button className="underline" aria-label="Save for later">
                  Save for later
                </button>
                <hr className="border-l border-gray-300 h-4" />
                <DeleteItem id={item.id} />
              </div>

              <p className="text-xs">
                Shipping: Arrives by{" "}
                <span className="font-medium">
                  {" "}
                  {item?.deliveryDate || "Jan, 20 2025"}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Payment Plan Header */}
        <div className="hidden md:flex items-center">
          <hr className="flex-grow border-[#E5E5E5]" />
          <p className="px-4 py-2 text-xs font-semibold text-gray-700 bg-[#F6F6F6] rounded-[20px]">
            Payment Plan
          </p>
          <hr className="flex-grow border-[#E5E5E5]" />
        </div>

        <PaymentPlan />
        <div className="flex justify-between mt-4 md:hidden ">
          <p className="text-xs">
            Shipping: Arrives by
            <br />
            <span className="font-medium">
              {" "}
              {item?.deliveryDate || "Jan, 20 2025"}
            </span>
          </p>

          <div className="flex space-x-2 items-center mb-2">
            <SaveItemForLater />
            <DeleteItem id={item.id} />
          </div>
        </div>
      </div>
    </article>
  );
};
