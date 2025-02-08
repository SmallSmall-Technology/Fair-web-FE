import { NavLink } from "react-router";

const Header = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="cart-items">Cart Items</NavLink>
    </>
  );
};

export default Header;
