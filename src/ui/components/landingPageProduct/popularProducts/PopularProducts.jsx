import { NavLink } from "react-router";
import { popularProducts } from "../../../../utils/data";
import { PopularProductSort } from "./PopularProductSort";

export const PopularProducts = () => (
  <div className="mt-12 mb-4">
    <h2 className="font-bold text-2xl">Explore popular categories</h2>
    <div className="flex gap-4 justify-between overflow-x-scroll scrollbar-hide 2xl:justify-start 2xl:gap-10 mt-2">
      {popularProducts.map((product) => (
        <SinglePopularProduct key={product.id} product={product} />
      ))}
    </div>
    <PopularProductSort />
  </div>
);

const SinglePopularProduct = ({ product }) => (
  <div className="flex flex-col justify-center i bg-[#FFF8CF] w-[276px] h-[241px] md:w-[410px] md:h-[357px] rounded-xl shrink-0">
    <img
      src={product.image}
      alt={product.name}
      className="w-1/2 md:w-fit h-fit rounded-t-xl mx-auto mt-auto"
    />
    <div className="flex-col px-6 mt-auto mb-4">
      <p className="text-lg font-medium mt-2">{product.name}</p>
      <div className="flex flex-col md:flex-row justify-between items-baseline">
        <p className="text-[28px] font-semibold">{product.category}</p>
        <NavLink to={product.link} className="hover:underline">
          <div className=" flex items-center space-x-2">
            <span className="text-sm">See more</span>
            <img
              src="/images/arrow-circle-right.svg"
              alt="arrow right icon"
              className="w-6 h-6 object-cover"
            />
          </div>
        </NavLink>
      </div>
    </div>
  </div>
);
