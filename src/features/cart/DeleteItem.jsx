import { removeItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import { Button } from "../../utils/Button";

export const DeleteItem = ({ id }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    if (id) dispatch(removeItem(id));
  };

  return (
    <Button
      className="underline text-[#DB1C5E]"
      onClick={handleRemoveItem}
      aria-label="Remove item"
    >
      Remove
    </Button>
  );
};
