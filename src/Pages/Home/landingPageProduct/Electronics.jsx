import { NavLink } from "react-router-dom";

import { products } from "../../../utils/data";
import { Button } from "../../../utils/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "../../../utils/ProductCard";

export const Electronics = ({ onScrollProduct, item_width, containerRef }) => {
  return (
    <section>
      <div className="flex justify-between mt-12 mb-4">
        <h2 className="font-bold text-2xl">Electronics</h2>
        <NavLink to={`/category/electronics`} className="underline">
          View all
        </NavLink>
      </div>

      <div className="grid grid-flow-col space-x-4 md:space-x-10 mb-8">
        <div className="overflow-x-auto ">
          <div
            className="flex  space-x-4 w-full overflow-x-auto scrollbar-hide scroll-smooth"
            ref={containerRef}
          >
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-baseline space-x-2">
            <div className="border-2 bg-[#F2F2F2] w-full mt-8 rounded-md relative">
              <div className="absolute top-0 left-0 h-full bg-black rounded-md"></div>
            </div>

            <div className="flex space-x-4">
              <Button
                role="button"
                aria-label="Previous item"
                tabIndex="0"
                onClick={() => onScrollProduct(-item_width)}
                className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-[-1px] focus:ring-2 focus:ring-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={13} />
              </Button>

              <Button
                role="button"
                aria-label="Next item"
                tabIndex="0"
                onClick={() => onScrollProduct(item_width)}
                className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-1 focus:ring-2 focus:ring-black focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={13} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
