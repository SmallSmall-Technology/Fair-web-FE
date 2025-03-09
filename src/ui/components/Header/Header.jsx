import { NavLink } from "react-router";

const Header = () => {
  return (
    <>
      <NavLink to="/">
        <img src="/images/fair-logo.svg" alt="Fair Logo" />
      </NavLink>
    </>
  );
};

export default Header;
