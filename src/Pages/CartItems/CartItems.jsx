import { useParams } from "react-router";
import { useSelector } from "react-redux";

const CartItems = () => {
  const { id, slug } = useParams();
  const totalCartQuantity = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  console.log(totalCartQuantity);
  return (
    <main className=" mx-6 lg:mx-[76px] my-5  ">
      <h1 className="font-semibold text-3xl">Your cart{id}</h1>
    </main>
  );
};

export default CartItems;

const CartItem = () => {
  return <article></article>;
};
