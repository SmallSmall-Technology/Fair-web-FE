import { Link, NavLink } from 'react-router-dom';
import { singleProductCategories } from '../../utils/data';

const SingleProductCategory = ({ product }) => {
  return (
    <li className="flex flex-col items-center hover:cursor-pointer hover:shadow-[0px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 transition-all duration-300 ease-in-out">
      <NavLink to={product.link}>
        <p className="text-sm font-medium text-nowrap">{product.productName}</p>
      </NavLink>
    </li>
  );
};

export const ProductCategoriesShortcut = () => {
  return (
    <section className="flex justify-start gap-5  lg:space-x-4 items-center md:justify-start xl:justify-start lg:py-4">
      <p className="flex p-2 rounded-[20px] font-medium text-xs border px-5">
        <img
          src="/public/images/category-alt.svg"
          alt="category icon"
          width={15}
        />

        <select>
          <option>Department</option>
          <option>Electonics</option>
        </select>
      </p>
      {/* <ul className="border flex space-x-6 justify-center md:justify-start items-center overflow-x-auto lg:py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"> */}
      <ul className="flex space-x-6 overflow-x-auto">
        {singleProductCategories.map((product) => (
          <SingleProductCategory product={product} key={product.id} />
        ))}
      </ul>
      <Link className="hidden lg:flex font-medium text-[#DB1C5E] text-sm">
        Sales & Offers
      </Link>
    </section>
  );
};
