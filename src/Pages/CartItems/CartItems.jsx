import { useSelector } from "react-redux";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
  removeItem,
} from "../../features/cart/cartSlice";
import { formatCurrency } from "../../utils/FormatCurrency";
import { FaBookJournalWhills } from "react-icons/fa6";

const CartItems = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <main className="mx-6 lg:mx-[76px] my-5">
      <h1 className="hidden md:flex font-semibold text-3xl">Your Cart</h1>
      <h1 className="flex md:hidden font-semibold text-3xl">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="mt-4 text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 w-full md:grid-cols-[70%_30%] gap-6 justify-between mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-10">
              {cart.map((item, index) => (
                <CartItem item={item} key={index} />
              ))}
            </div>
            {/* <hr className="my-8 md:hidden" /> */}
            <CartSummary />
          </div>
        </>
      )}
    </main>
  );
};

export default CartItems;

const CartSummary = () => {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  return (
    <div className="mt-6 font-semibold text-xl">
      Total ({totalCartQuantity} items): {formatCurrency(totalCartPrice)}
    </div>
  );
};

const CartItem = ({ item }) => {
  return (
    <article
      key={item.id}
      className="md:border-[1px] pb-4 md:border-[#E5E5E5]  rounded-[10px] w-full "
    >
      <div className="">
        {/* Product Details */}
        <section className="p-6">
          <div className="flex space-x-1 items-center mb-3">
            <img
              src="/public/images/sold-by-fair.svg"
              alt="Fair company logo"
              className="w-6 h-6"
            />
            <p className="underline">Fair</p>
          </div>

          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-start gap-4 ">
              <div className="w-[69px] h-[69px] md:w-[135px] md:h-[135px] ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h2 className="text-[#222224] font-medium text-sm max-w-[70%] mb-3">
                  {item.name}
                </h2>
                <p className="text-[#222224] font-medium text-sm">
                  Qty:{" "}
                  <select className="border px-2 py-1 rounded">
                    {Array.from({ length: item.quantity }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  {/* {item.quantity} */}
                </p>
                <p className="text-xl font-semibold mb-6 md:hidden mt-4">
                  {formatCurrency(item.price)}
                </p>
              </div>
            </div>

            <div className="hidden md:grid">
              <p className="text-xl font-semibold mb-6">
                {formatCurrency(item.price)}
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
                <button
                  className="underline text-[#DB1C5E]"
                  onClick={removeItem}
                  aria-label="Remove item"
                >
                  Remove
                </button>
              </div>

              <p>Shipping: Arrives by {item?.deliveryDate || "Jan, 20 2025"}</p>
            </div>
          </div>
        </section>

        {/* Payment Plan Header */}
        <div className="hidden md:flex items-center my-4">
          <hr className="flex-grow border-[#E5E5E5]" />
          <p className="px-4 py-2 text-xs font-semibold text-gray-700 bg-[#F6F6F6] rounded-[20px]">
            Payment Plan
          </p>
          <hr className="flex-grow border-[#E5E5E5]" />
        </div>

        <section>
          <div className="flex justify-center py-4 border md:border-0 rounded-[10px] ">
            <div className="flex justify-between md:space-x-6  ">
              <div className="grid md:flex gap-2 text-center items-center">
                <img
                  src="/public/images/half-circle.svg"
                  alt="A diameter of a circle"
                  className="mx-auto"
                />
                <div className="grid md:flex">
                  <p className="text-xs font-medium">N200.000</p>
                  <span className="text-[11px]">Pay now today</span>
                </div>
              </div>

              <div className="grid md:flex  gap-2 text-end items-center">
                <img
                  src="/public/images/one-quater-circle.svg"
                  alt="A diameter of a circle"
                  className="mx-auto"
                />
                <div className="grid flex-col items-end ">
                  <div className="grid md:flexflex space-x-2">
                    <p className="text-xs font-medium">N200.000</p>
                    <span className="text-[11px]">Next payment</span>
                  </div>
                  <span className="text-[11px]"> 24 Jun, 2024</span>
                </div>
              </div>

              <div className="grid md:flex gap-2 text-end items-center">
                <img
                  src="/public/images/full-circle.svg"
                  alt="A diameter of a circle"
                  className="mx-auto"
                />
                <div className="grid md:flex-col items-end ">
                  <div className="grid md:flex space-x-1">
                    <p className="text-xs font-medium">N200.000</p>
                    <span className="text-[11px]">Next payment</span>
                  </div>
                  <span className="text-[11px]"> 24 Jun, 2024</span>
                </div>
              </div>

              <div className="grid md:flex gap-2 text-end items-center">
                <img
                  src="/public/images/full-circle.svg"
                  alt="A diameter of a circle"
                  className="mx-auto"
                />
                <div className="grid md:flex-col items-end ">
                  <div className="grid md:flex space-x-1">
                    <p className="text-xs font-medium">N200.000</p>
                    <span className="text-[11px]">Fnal payment</span>
                  </div>
                  <span className="text-[11px]"> 24 Jun, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex justify-between mt-4 md:hidden">
          <p>
            Shipping <br /> Arrives by {item?.deliveryDate || "Jan, 20 2025"}
          </p>

          <div className="flex space-x-2 items-center mb-2">
            <button className="underline" aria-label="Save for later">
              Save for later
            </button>
            <button
              className="underline "
              onClick={removeItem}
              aria-label="Remove item"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      {/* Total Price */}
    </article>
  );
};
