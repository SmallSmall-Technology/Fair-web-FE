import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="mt-4 mx-6 lg:mx-[60px]">
      <NavLink to="/">
        <img src="/images/fair-logo.svg" alt="Fair Logo" />
      </NavLink>
    </header>
  );
};

export default Header;
