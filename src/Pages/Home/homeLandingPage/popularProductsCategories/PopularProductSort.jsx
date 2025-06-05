import { NavLink } from 'react-router-dom';
import { popularProductsSort } from '../../../../utils/data';

export const PopularProductSort = () => (
  <div className="mt-12 mb-4">
    <div className="flex flex-wrap gap-4 justify-between 2xl:grid 2xl:grid-flow-col">
      {popularProductsSort.map((product) => (
        <SinglePopularProduct key={product.id} product={product} />
      ))}
    </div>
  </div>
);

const SinglePopularProduct = ({ product }) => (
  <div className="flex flex-col justify-center md:w-[634px] h-[426px] rounded-[10px] ">
    <img
      src={product.image}
      alt={product.name}
      className="relative h-full w-full object-cover  rounded-[10px] mb-4 md:mb-0"
      loading="lazy"
    />
    <div className="absolute flex-col px-6">
      <p className="text-sm font-semibold mb-2">{product.name}</p>
      <div className="flex flex-col ">
        <p className="text-[28px] font-semibold">{product.category}</p>
        <NavLink to={product.link}>
          <div className="group relative inline-flex items-center overflow-hidden rounded-full bg-[#FFDE11]  border-2 border-[#FFDE11] px-4 md:px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 hover:text-black">
            <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-[#FFDE11]"></span>

            <span className="relative transform duration-700 group-hover:-translate-x-1">
              Shop now
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  </div>
);
