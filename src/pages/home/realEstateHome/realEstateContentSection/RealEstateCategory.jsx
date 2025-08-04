import { BuySmallsmall } from './BuySmallsmall';
import { RentSmallSmallCard } from './RentSmallSmallCard';
import { StaySmallsmall } from './StaySmallsmall';

export const categories = [
  {
    title: 'RentSmallsmall',
    color: 'bg-[#007DC1F9]',
    image: '/images/rentsofa.svg',
    link: '/real-estate/rentsmallsmall',
    text: 'text-white',
  },
  {
    title: 'BuySmallsmall',
    color: 'bg-[#F5F5F7]',
    image: '/images/buysofa.svg',
    link: '/real-estate/buysmallsmall',
    width: '250px',
  },
  {
    title: 'Staysmallsmall',
    color: 'bg-[#F5F5F7]',
    image: '/images/beverages.svg',
    link: '/real-estate/staysmallsmall',
  },
];

export const RealEstateCategory = () => {
  return (
    <section className=" pt-8">
      <h3 className="text-3xl font-semibold">Real Estate</h3>
      <p className="mb-4 mx-5 font-outfit">Shop by category</p>

      <div className="w-full  lg:flex lg:space-x-4 mb-4">
        <RentSmallSmallCard />
        <BuySmallsmall />
        <StaySmallsmall />
      </div>
    </section>
  );
};
