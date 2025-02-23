import { useParams } from "react-router";

const CartItems = () => {
  const { id, slug } = useParams();
  return <p>CartItems{id}</p>;
};

export default CartItems;
