import { useDispatch } from "react-redux";
import { Button } from "../../utils/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

export const UpdateItemQuantity = ({ id, currentQuantity }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex space-x-5">
        <Button onClick={() => dispatch(decreaseItemQuantity(id))}>-</Button>
        <p>{currentQuantity}</p>
        <Button onClick={() => dispatch(increaseItemQuantity(id))}>+</Button>
      </div>
    </>
  );
};
