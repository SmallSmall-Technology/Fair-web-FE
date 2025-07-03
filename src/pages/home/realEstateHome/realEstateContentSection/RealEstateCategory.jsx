import { BuySmallsmall } from './BuySmallsmall';
import { RentSmallsmall } from './RentSmallsmall';
import { StaySmallsmall } from './StaySmallsmall';

export const categories = [
  {
    title: 'RentSmallsmall',
    color: 'bg-[#007DC1F9]',
    image: '/images/rentsofa.svg',
    link: '/shop/electronics',
    text: 'text-white',
  },
  {
    title: 'BuySmallsmall',
    color: 'bg-[#F5F5F7]',
    image: '/images/buysofa.svg',
    link: '/shop/food-drink',
    width: '250px',
  },
  {
    title: 'Staysmallsmall',
    color: 'bg-[#F5F5F7]',
    image: '/images/beverages.svg',
    link: '/shop/lifestyle',
  },
];

export const RealEstateCategory = () => {
  return (
    <section className=" pt-8">
      <h3 className="text-3xl font-semibold">Real Estate</h3>
      <p className="mb-4">Shop by category</p>

      <div className="w-full  lg:flex lg:space-x-4 mb-4">
        <RentSmallsmall />
        <BuySmallsmall />
        <StaySmallsmall />
      </div>
    </section>
  );
};
