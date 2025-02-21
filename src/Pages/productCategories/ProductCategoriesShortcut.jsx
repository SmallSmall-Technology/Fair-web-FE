import { NavLink } from "react-router";
import { productCategories } from "../../utils/data";

const SingleProductCategory = ({ product }) => {
  return (
    <li className="flex flex-col items-center hover:cursor-pointer hover:shadow-[0px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 transition-all duration-300 ease-in-out">
      <NavLink to={product.link}>
        <p className="text-xs font-medium text-nowrap">{product.productName}</p>
      </NavLink>
    </li>
  );
};

export const ProductCategoriesShortcut = () => {
  return (
    <section className="flex space-x-4 items-center justify-center md:justify-start xl:justify-center">
      <p className="bg-[#FFDE11] p-1 w-fit px-2 rounded-[20px] font-medium text-xs">
        Sales
      </p>
      <ul className="flex space-x-6 justify-center md:justify-start items-center overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {productCategories.map((product) => (
          <SingleProductCategory product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
};
