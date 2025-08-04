import { useSelector } from 'react-redux';
import { getCurrentQuantityById } from '../../../features/cart/cartSlice';
import { UpdateItemQuantity } from '../../../features/cart/UpdateItemQuantity';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { DeleteItemFromCart } from '../../../features/cart/DeleteItem';

export const NavBarCartItem = ({ item }) => {
  const currentQuantity = useSelector(getCurrentQuantityById(item.productID));
  // const dispatch = useDispatch();
  //   useEffect(() => {
  //     dispatch(fetchCart());
  //   }, [dispatch]);

  //   const { cart: cartItems, loading } = useSelector((state) => state.cart);

  const getDisplayedPrice = () => {
    const { paymentPlan, paymentPlanDetails, price } = item;
    switch (paymentPlan) {
      case 'full':
        return formatCurrency(
          (paymentPlanDetails?.amount || price) * currentQuantity
        );
      case 'monthly':
        return `${formatCurrency(paymentPlanDetails?.monthlyPayment * currentQuantity || 0)} `;
      case 'weekly':
        return `${formatCurrency(paymentPlanDetails?.weeklyPayment * currentQuantity || 0)}`;
      case 'daily':
        return `${formatCurrency(paymentPlanDetails?.dailyPayment * currentQuantity || 0)} `;
      default:
        return formatCurrency(price * currentQuantity);
    }
  };

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
              src={item.image}
              alt={item.name}
              className="w-[100%] h-full object-cover rounded-[8px]"
            />
          </div>

          <div className="flex flex-col space-y- justify-between w-full">
            <p>{item.name}</p>
            <div className="flex justify-between w-full">
              <div className="flex space-x-4">
                <div>
                  <div className="text-[#222224] font-medium text-sm flex items-center space-x-2">
                    <UpdateItemQuantity
                      productID={item.productID}
                      currentQuantity={currentQuantity}
                    />
                  </div>
                </div>
                <DeleteItemFromCart productID={item.productID} />
              </div>
              <p className="text-[#222224]">{getDisplayedPrice()}</p>
            </div>
          </div>
        </div>
      </li>
      <div className="h-[6px] bg-[#F6F6F6] w-full my-2"></div>
    </>
  );
};
