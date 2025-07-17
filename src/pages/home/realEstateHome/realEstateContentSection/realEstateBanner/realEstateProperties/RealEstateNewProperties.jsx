import { NavLink } from 'react-router-dom';
import { PropertyCard } from './PropertyCard';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../../../../../utils/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAllProducts } from '../../../../../../services/api';

export const properties = [
  {
    name: '2 bedroom at Cardinal Heritage Estate VGC',
    images: [
      '/images/olivia.svg',
      '/images/american-man.svg',
      '/images/Cardinal.svg',
    ],
    noOfBedroom: '1',
    noOfBathroom: '2',
    location: 'Lekki',
    price: 207000,
    discountedPrice: 225000,
  },
  {
    name: '2 bedroom at Cardinal Heritage Estate VGC',
    images: [
      '/images/american-man.svg',
      '/images/olivia.svg',
      '/images/Cardinal.svg',
    ],
    noOfBedroom: '1',
    noOfBathroom: '2',
    location: 'Lekki',
    price: 207000,
    discountedPrice: 225000,
  },
  {
    name: '2 bedroom at Cardinal Heritage Estate VGC',
    images: [
      '/images/american-man.svg',
      '/images/Cardinal.svg',
      '/images/olivia.svg',
    ],
    noOfBedroom: '1',
    noOfBathroom: '2',
    location: 'Ajah',
    price: 207000,
    discountedPrice: 225000,
  },
  {
    name: '2 bedroom at Cardinal Heritage Estate VGC',
    images: [
      '/images/american-man.svg',
      '/images/olivia.svg',
      '/images/Cardinal.svg',
    ],
    noOfBedroom: '3',
    noOfBathroom: '2',
    location: 'Ikota',
    price: 207000,
    discountedPrice: 225000,
  },
  {
    name: '2 bedroom at Cardinal Heritage Estate VGC',
    images: [
      '/images/olivia.svg',
      '/images/Cardinal.svg',
      '/images/american-man.svg',
    ],
    noOfBedroom: '1',
    noOfBathroom: '2',
    location: 'Chevron',
    price: 207000,
    discountedPrice: 225000,
  },
  {
    name: '2 bedroom at Cardinal Heritage Estate VGC',
    images: [
      '/images/olivia.svg',
      '/images/american-man.svg',
      '/images/Cardinal.svg',
    ],
    noOfBedroom: '1',
    noOfBathroom: '2',
    location: 'Lekki',
    price: 207000,
    discountedPrice: 225000,
  },
  {
    name: '2 bedroom at Cardinal Heritage Estate VGC',
    images: [
      '/images/olivia.svg',
      '/images/american-man.svg',
      '/images/Cardinal.svg',
    ],
    noOfBedroom: '1',
    noOfBathroom: '2',
    location: 'Lekki',
    price: 207000,
    discountedPrice: 225000,
  },
];

const RealEstateNewProperties = ({
  onScrollProduct,
  item_width,
  containerRef,
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });
  return (
    <>
      <div className="flex justify-between mt-12 ">
        <h2 className="font-bold text-2xl mb-5">Newly listed units</h2>

        <NavLink
          to={'new-products-in-store'}
          className="underline"
          aria-label="View all New Properties in Store"
        >
          View all
          <span className="sr-only">See all newly listed homes</span>
        </NavLink>
      </div>

      <div className="grid grid-flow-col lg:space-x-4 md:space-x-10 mb-8 ">
        <div className="hidden px-1 md:px-4 bg-[var(--yellow-primary)] w-[129px] h-[146px] md:w-[195px] md:h-[218px] rounded-[4px] lg:flex flex-col justify-end pb-4">
          <div className="grid grid-cols-1 space-y-1 pl-3">
            <span className="text-lg md:text-2xl font-semibold">
              New for rent
            </span>
            <NavLink to="/new-products-in-store" className="hover:underline">
              <span className="text-sm">See all newly listed homes</span>
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
                onClick={() => onScrollProduct(-item_width)}
                className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-[-1px] focus:ring-2 focus:ring-black focus:outline-none"
              >
                <span className="sr-only">See more property to the left</span>
                <ChevronLeft size={13} />
              </Button>

              <Button
                role="button"
                aria-label="Next item"
                tabIndex="0"
                onClick={() => onScrollProduct(item_width)}
                className="border border-[#E5E5E5] rounded-full shadow-custom w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300 ease-in-out hover:translate-x-1 focus:ring-2 focus:ring-black focus:outline-none"
              >
                <span className="sr-only">See more property to the right</span>
                <ChevronRight size={13} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RealEstateNewProperties;
