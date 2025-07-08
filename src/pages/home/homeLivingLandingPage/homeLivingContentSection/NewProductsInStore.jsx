import { NavLink } from 'react-router-dom';
import { Button } from '../../../../utils/Button';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../../../../utils/ProductCard';
import { products } from '../../../../utils/data';
import { fetchAllProducts } from '../../../../services/api';
// import { products } from '../../utils/data';

const NewProductsInStore = ({ onScrollProduct, item_width, containerRef }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });
  return (
    <>
      <div className="flex justify-between mt-12 ">
        <h2 className="font-bold text-2xl">New in store</h2>

        <NavLink
          to={'new-products-in-store'}
          className="underline"
          aria-label="View all New Products in Store"
        >
          View all
          <span className="sr-only">View all New products in store</span>
        </NavLink>
      </div>

      <div className="grid grid-flow-col lg:space-x-4 md:space-x-10 mb-8 ">
        <div className="hidden px-1 md:px-4 bg-[#FFDE11] w-[129px] h-[146px] md:w-[195px] md:h-[218px] rounded-[4px] lg:flex flex-col justify-end pb-4">
          <div className="grid grid-cols-1 space-y-1 pl-3">
            <span className="text-lg md:text-2xl font-semibold">
              New in store
            </span>
            <NavLink to="/new-products-in-store" className="hover:underline">
              <span className="text-sm">See all newly listed items</span>
              <div className="mt-2 flex justify-end">
                <img
                  src="/images/arrow-circle-right.svg"
                  alt="arrow right icon"
                  className="w-6 h-6"
                />
              </div>
            </NavLink>
          </div>
        </div>
        <div className="overflow-x-scroll scrollbar-hide">
          <div
            className="grid grid-flow-col space-x-4 w-full overflow-x-scroll scrollbar-hide scroll-smooth "
            ref={containerRef}
          >
            {products?.map((product) => (
              <div className="" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-baseline space-x-2 ">
            <div className="border-2 bg-[#F2F2F2] w-full mt-8 rounded-md"></div>

            <div className="flex space-x-4">
              <Button
                role="button"
                aria-label="Previous item"
                tabIndex="0"
                onClick={() => onScrollProduct(-item_width)}
                className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-[-1px] focus:ring-2 focus:ring-black focus:outline-none"
              >
                <ChevronLeft size={13} />
              </Button>

              <Button
                role="button"
                aria-label="Next item"
                tabIndex="0"
                onClick={() => onScrollProduct(item_width)}
                className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-1 focus:ring-2 focus:ring-black focus:outline-none"
              >
                <ChevronRight size={13} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProductsInStore;
