import { Button } from "../../utils/Button";

export const handleRemoveItem = () => {
  if (item) dispatch(removeItem(item.id));
};
export const DeleteItem = () => {
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
