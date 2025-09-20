import { X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../../utils/FormatCurrency';
import UpdateItemQuantity from '../../../features/cart/UpdateItemQuantity';

export const CheckoutItem = () => {
  const cart = useSelector((state) => state?.cart.cart);

  return (
    <ul className="grid grid-cols-1 lg:px-8 gap-4 pt-20 lg:pt-10 font-inter">
      {cart.map((item, index) => (
        <article className="checkout-item" key={item?.productID}>
          <li
            className="flex flex-col lg:flex-row justify-between items-start"
            key={item.id}
          >
            <div className="flex space-x-2  px-8 lg:px-0">
              <div className="w-[69px] h-[69px] ">
                <img
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-[#222224] font-medium text-sm text-balance mb-3">
                  {item?.name}
                </h2>
                <div className="hidden text-[#96959F] font-medium text-sm lg:flex items-center">
                  <X size={17} />
                  {item?.quantity}
                </div>
                <div className="lg:hidden text-[#222224] font-medium text-sm">
                  {/* <div className="flex items-center space-x-2">
                    <p>Qty: </p>
                    <UpdateItemQuantity
                      productID={item?.productID}
                      currentQuantity={item?.quantity}
                    />
                  </div> */}
                  <div className="flex text-[#96959F] font-medium text-sm mb-2 lg:flex items-center">
                    <X size={17} />
                    <span>{item?.quantity}</span>
                  </div>
                  <p className="font-semibold mb-3">
                    {formatCurrency(item.price)}
                  </p>
                  <p className="text-xs">Delivery</p>
                  <p className="text-xs font-medium">
                    Est. delivery: by <span>{item?.deliveryDate || 'N/A'}</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="hidden lg:block font-semibold font-inter text-sm">
              {formatCurrency(item?.price)}
            </p>
          </li>
          {index !== cart.length - 1 && <hr className="lg:hidden my-4" />}
        </article>
      ))}
    </ul>
  );
};
