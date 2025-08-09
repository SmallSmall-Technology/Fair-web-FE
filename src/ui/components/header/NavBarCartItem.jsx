import { getDisplayedPrice } from '../../../utils/GetDisplayedPrice';
import { DeleteItemFromCart } from '../../../features/cart/DeleteItem';
import { UpdateItemQuantity } from '../../../features/cart/UpdateItemQuantity';

export const NavBarCartItem = ({ item }) => {
  const displayedPrice = getDisplayedPrice({
    paymentPlan: item?.paymentPlan || item?.selectedPaymentPlan,
    paymentOptionsBreakdown: item?.paymentOptionsBreakdown,
    fairAppPrice: item?.fairAppPrice,
    quantity: item.quantity || 1,
  });

  return (
    <>
      <li className="grid grid-cols-1 py-4 lg:px-5">
        <div className="flex items-baseline mb-4 space-x-2">
          <img src="/images/fair-logo.svg" alt="" width={48} />
          <p className="pb-0">Fair</p>
        </div>
        <div className="flex space-x-2">
          <div className="w-[40%] h-[100px] p-2 flex justify-center items-center border border-[#DADADA] rounded-[12px]">
            <img
              src={item?.image || item?.coverImage}
              alt={item?.name || item?.productName}
              className="w-[100%] h-full object-cover rounded-[8px]"
            />
          </div>

          <div className="flex flex-col space-y- justify-between w-full">
            <p>{item?.name}</p>
            <div className="flex justify-between w-full">
              <div className="flex space-x-4">
                <div>
                  <div className="text-[#222224] font-medium text-sm flex items-center space-x-2">
                    <UpdateItemQuantity
                      productID={item?.productID}
                      currentQuantity={item?.quantity}
                    />
                  </div>
                </div>
                <DeleteItemFromCart productID={item?.productID} />
              </div>
              <p className="text-[#222224]">{displayedPrice}</p>
            </div>
          </div>
        </div>
      </li>
      <div className="h-[6px] bg-[#F6F6F6] w-full my-2"></div>
    </>
  );
};
