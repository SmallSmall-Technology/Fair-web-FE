import { NavLink } from "react-router";

export const SingleProductDetails = ({ product }) => {
  return (
    <>
      <div className="flex flex-wrap w-full justify-between">
        <main>{product.name}</main>
        <aside>{product.subcategory}</aside>
      </div>
      <div className="mt-8 flex justify-between">
        <p>You may also like</p>
        <NavLink>See more</NavLink>
      </div>
    </>
  );
};
