import { PersonalCare } from './PersonalCare';
import { Beauty } from './Beauty';
import { Fashion } from './Fashion';
import { Health } from './Health';
import { BabyMotherCare } from './BabyMotherCare';
import { Household } from './Household';
import { Toys } from './Toys';
import { Entertainment } from './Entertainment';
import { Books } from './Books';

export const categories = [
  {
    title: 'Personal care',
    color: 'bg-[#9ADBF9F9]',
    image: '/images/personalcare_sst.svg',
    link: '/shop/phones',
    text: 'text-white',
  },
  {
    title: 'Beauty',
    color: 'bg-[#F5F5F7]',
    image: '/images/makeup_sst.svg',
    link: '/shop/computers',
  },
  {
    title: 'Fashion',
    color: 'bg-[#F5F5F7]',
    image: '/images/fashion_sst.svg',
    link: '/shop/tv',
  },
  {
    title: 'Health & Wellness',
    color: 'bg-[#F5F5F7]',
    image: '/images/wellness_sst.svg',
    link: '/shop/home-appliances',
  },
  {
    title: 'Baby & Mother care',
    color: 'bg-[#F5F5F7]',
    image: '/images/baby_sst.svg',
    link: '/shop/audio-theater',
  },
  {
    title: 'Household essentials',
    color: 'bg-[#F5F5F7]',
    image: '/images/household_sst.svg',
    link: '/shop/gadgets',
  },
  {
    title: 'Toys',
    color: 'bg-[#F5F5F7]',
    image: '/images/toys_sst.svg',
    link: '/shop/video-games',
  },
  {
    title: 'Entertainment',
    color: 'bg-[#F5F5F7]',
    image: '/images/chess_sst.svg',
    link: '/shop/accessories',
  },
  {
    title: 'Books',
    color: 'bg-[#F5F5F7]',
    image: '/images/books_sst.svg',
    link: '/shop/accessories',
  },
];

export const ConsumerGoodsCategory = () => {
  return (
    <section className=" py-8 lg:mx-5">
      <h3 className="text-3xl font-semibold mx-5">
        Lifestyle & Consumer goods
      </h3>
      <p className="mb-4 mx-5">Shop by category</p>

      <div className="hidden md:grid grid-cols-2 gap-4 lg:hidden">
        <PersonalCare />
        <Beauty />
        <Fashion />
        <Health />
        <BabyMotherCare />
        <Household />
        <Toys />
        <Entertainment />
        <Books />
      </div>

      <div className="w-full md:hidden lg:flex grid gap-8 lg:gap-4 mb-8 lg:mb-4">
        <PersonalCare />
        <Beauty />
        <Fashion />
      </div>
      <div className="w-full md:hidden lg:flex lg:gap-4 grid gap-8 mb-8 lg:mb-4">
        <Health />
        <BabyMotherCare />
        <Household />
      </div>
      <div className="w-full md:hidden lg:flex lg:gap-4 grid gap-8">
        <Toys />
        <Entertainment />
        <Books />
      </div>
    </section>
  );
};
