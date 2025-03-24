import { useDispatch } from "react-redux";
import { Button } from "../../utils/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

export const UpdateItemQuantity = ({ id, currentQuantity }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center space-x-2 lg:space-x-5">
        <Button onClick={() => dispatch(decreaseItemQuantity(id))}>-</Button>
        <p className="bg-[#ECEDF1] px-4 py-2 rounded-xl">{currentQuantity}</p>
        <Button onClick={() => dispatch(increaseItemQuantity(id))}>+</Button>
      </div>
    </>
  );
};
