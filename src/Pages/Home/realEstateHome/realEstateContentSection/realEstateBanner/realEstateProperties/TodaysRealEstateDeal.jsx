import { NavLink } from 'react-router-dom';
import { PropertyCard } from './PropertyCard';
import { properties } from './RealEstateNewProperties';
import { Button } from '../../../../../../utils/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const TodaysRealEstateDeal = ({
  onScrollProduct,
  item_width,
  containerRef,
}) => {
  return (
    <>
      <div className="flex justify-between mt-12 mb-4">
        <h2 className="font-bold text-2xl">Today's Deal</h2>

        <NavLink
          to={'new-products-in-store'}
          className="underline"
          aria-label="View all Today's deal"
        >
          View all
          <span className="sr-only">View all Today's deal</span>
        </NavLink>
      </div>
      <div className="overflow-x-scroll scrollbar-hide">
        <div
          className="grid grid-flow-col space-x-4 w-full overflow-x-scroll scrollbar-hide scroll-smooth "
          //   ref={containerRef}
        >
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index}>
              <PropertyCard property={properties?.[index]} />
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
              //   onClick={() => onScrollProduct(-item_width)}
              className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-[-1px] focus:ring-2 focus:ring-black focus:outline-none"
            >
              <span className="sr-only">See more property to the left</span>
              <ChevronLeft size={13} />
            </Button>

            <Button
              role="button"
              aria-label="Next item"
              tabIndex="0"
              //   onClick={() => onScrollProduct(item_width)}
              className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-1 focus:ring-2 focus:ring-black focus:outline-none"
            >
              <span className="sr-only">See more property to the right</span>
              <ChevronRight size={13} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
