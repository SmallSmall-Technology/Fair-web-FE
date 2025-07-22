import { GardenOutdoor } from './homeLivingCategory/GardenOutdoor';
import { BedBath } from './homeLivingCategory/BedBath';
import { HomeImprovement } from './homeLivingCategory/HomeImprovement';
import { Kitchen } from './homeLivingCategory/Kitchen';
import { Furniture } from './homeLivingCategory/Furniture';
import { Decor } from './homeLivingCategory/Decor';

export const shopByHomeLivingCategories = [
  {
    title: 'Decor',
    color: 'bg-[#171649]',
    image: '/images/decor_sst.svg',
    link: '/home-living/decor',
    text: 'text-white',
  },
  {
    title: 'Furniture',
    color: 'bg-[#F5F5F7]',
    image: '/images/chair_sst.svg',
    link: '/home-living/furniture',
    width: '250px',
  },
  {
    title: 'Kitchen & Dining',
    color: 'bg-[#F5F5F7]',
    image: '/images/kitchen_sst.svg',
    link: '/home-living/kitchen-dining',
    width: '332px',
  },
  {
    title: 'Home Improvement',
    color: 'bg-[#F5F5F7]',
    image: '/images/home_improvement_sst.svg',
    link: '/home-living/home-improvement',
  },
  {
    title: 'Bed & Bath',
    color: 'bg-[#F5F5F7]',
    image: '/images/bed_sst.svg',
    link: '/home-living/bed-bath',
  },
  {
    title: 'Garden & Outdoor',
    color: 'bg-[#F5F5F7]',
    image: '/images/garden_sst.svg',
    link: '/home-living/garden-outdoor',
  },
];

export const HomeLivingCategory = () => {
  return (
    <section className="lg:mx-5 py-8">
      <h3 className="text-3xl font-semibold px-5">Home & Living</h3>
      <p className="mb-4 mx-5 font-outfit">Shop by category</p>
      <div className="hidden md:grid grid-cols-2 gap-6 lg:hidden">
        <Decor />
        <Furniture />
        <Kitchen />
        <HomeImprovement />
        <BedBath />
        <GardenOutdoor />
      </div>
      <div className="w-full grid gap-8  md:hidden lg:flex lg:space-x-4 mb-8">
        <Decor />
        <Furniture />
        <Kitchen />
      </div>
      <div className="w-full grid gap-8 md:hidden lg:flex lg:space-x-4">
        <HomeImprovement />
        <BedBath />
        <GardenOutdoor />
      </div>
    </section>
  );
};
