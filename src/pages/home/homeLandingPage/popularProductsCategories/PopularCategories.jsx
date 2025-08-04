// import { useQuery } from '@tanstack/react-query';
import { Electronics } from './Electronics';
import { Food } from './Food';
import { Lifestyle } from './Lifestyle';
import { RealEstate } from './RealEstate';

export const shopByPopularCategories = [
  {
    title: 'Electronics',
    desc: 'TV, Cell phone, Laptops',
    color: 'bg-[#F5F5F7]',
    image: '/images/smallsmall-electronics.svg',
    link: '/electronics',
    width: '400px',
    height: '223.5',
  },
  {
    title: 'Food & Drink',
    desc: 'Grocery, Confectionery, Beverages',
    color: 'bg-[#F5F5F7]',
    image: '/images/smallsmall-grocery.svg',
    link: '/food-drink',
    width: '250px',
    height: '250px',
  },
  {
    title: 'Lifestyle & Consumer goods',
    desc: 'Beauty, Fashion, Household Essentials',
    color: 'bg-[#F5F5F7]',
    image: '/images/smallsmall-lifestyle.svg',
    link: '/lifestyle-consumer-goods',
  },
  {
    title: 'Real estate',
    desc: 'Rent, Buy, Short-let, Commercials',
    color: 'bg-[#FFDE11]',
    image:
      '/images/vecteezy_cozy-living-room-setup-featuring-a-light-sofa-with_55925717 1.svg',
    link: '/real-estate',
  },
];

export default function PopularCategories() {
  return (
    <section className="px- py-8 lg:mx-10">
      <h3 className="text-lg font-semibold mb-4 px-8 lg:px-5">
        Explore popular categories
      </h3>
      <div className="grid lg:grid-cols-[58%_40%] space-y-8 lg:space-y-0 lg:space-x-4 mb-8 lg:mb-4">
        <Electronics />
        <Food />
      </div>
      <div className="hidden lg:grid lg:grid-cols-[40%_58%] space-y-4 lg:space-y-0 lg:space-x-4">
        <Lifestyle />
        <RealEstate />
      </div>
      <div className="grid lg:hidden lg:grid-cols-[40%_60%] space-y-8 lg:space-y-0 lg:space-x-4">
        <RealEstate />
        <Lifestyle />
      </div>
    </section>
  );
}
