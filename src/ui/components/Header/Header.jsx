import { NavLink } from "react-router";

const Header = () => {
  return (
    <>
      <NavLink to="/">
        <img src="/images/Horizontal Logo Blue@100x-8 1.svg" />
      </NavLink>
      <NavLink to="cart-items">Cart Items</NavLink>
    </>
  );
};

export default Header;
