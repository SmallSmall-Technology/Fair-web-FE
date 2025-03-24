import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { UpdateItemQuantity } from "../../../features/cart/UpdateItemQuantity";

export const CheckoutItem = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <ul className="grid grid-cols-1 lg:px-8 gap-4 pt-20 lg:pt-10">
      {cart.map((item) => (
        <article className="checkout-item" key={item.id}>
          <li
            className="flex flex-col lg:flex-row justify-between items-start"
            key={item.id}
          >
            <div className="flex space-x-2  px-8 lg:px-0">
              <div className="w-[69px] h-[69px] md:w-[135px] md:h-[135px]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[#222224] font-medium text-sm text-balance mb-3">
                  {item.name}
                </h2>
                <div className="hidden text-[#96959F] font-medium text-sm lg:flex items-center">
                  <X size={17} />
                  {item.quantity}
                </div>
                <div className="lg:hidden text-[#222224] font-medium text-sm">
                  <div className="flex items-center space-x-2">
                    <p>Qty: </p>
                    <UpdateItemQuantity
                      id={item.id}
                      currentQuantity={item.quantity}
                    />
                  </div>
                  <p className=" font-semibold mb-3">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <p className="text-xs">Delivery</p>
                  <p className="text-xs font-medium">
                    Est. delivery: by{" "}
                    <span>{item.deliveryDate || "Jan, 20, 2025"}</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="hidden lg:block font-semibold">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </li>
          <hr className="lg:hidden my-4" />
        </article>
      ))}
    </ul>
  );
};
