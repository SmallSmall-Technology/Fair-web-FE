import { TV } from './TV';
import { Phones } from './Phones';
import { Gadgets } from './Gadgets';
import { Computers } from './Computers';
import { VideoGames } from './VideoGames';
import { Accessories } from './Accessories';
import { HomeAppliances } from './HomeAppliances';
import { HomeAudioTheater } from './HomeAudioTheater';

export const shopByElectronicsCategories = [
  {
    title: 'Phones',
    color: 'bg-[#922A8E]',
    image: '/images/iPhone11.svg',
    link: '/electronics/phones',
    text: 'text-white',
  },
  {
    title: 'Computers',
    color: 'bg-[#F5F5F7]',
    image: '/images/macbook.svg',
    link: '/electronics/computers',
  },
  {
    title: 'TV',
    color: 'bg-[#F5F5F7]',
    image: '/images/smarttv_sst.svg',
    link: '/electronics/tv',
  },
  {
    title: 'Home Appliances',
    color: 'bg-[#F5F5F7]',
    image: '/images/appliances_sst.svg',
    link: '/electronics/home-appliances',
  },
  {
    title: 'Home Audio & Theater',
    color: 'bg-[#F5F5F7]',
    image: '/images/audio_sst.svg',
    link: '/electronics/home-audio-theater',
  },
  {
    title: 'Gadgets',
    color: 'bg-[#F5F5F7]',
    image: '/images/gadgets_sst.svg',
    link: '/electronics/gadgets',
  },
  {
    title: 'Video Games',
    color: 'bg-[#F5F5F7]',
    image: '/images/videogames_sst.svg',
    link: '/electronics/video-games',
  },
  {
    title: 'Accessories',
    color: 'bg-[#F5F5F7]',
    image: '/images/accessories_sst.svg',
    link: '/electronics/accessories',
  },
];

export const ElectronicsCategory = () => {
  return (
    <section className=" py-8 md:mx-5">
      <h3 className="text-3xl font-semibold mx-5">Electronics</h3>
      <p className="mb-4 mx-5 font-outfit">Shop by category</p>

      <div className="hidden md:grid grid-cols-2 gap-4 lg:hidden">
        <Phones />
        <Computers />
        <TV />
        <HomeAudioTheater />
        <Gadgets />
        <Accessories />
        <HomeAppliances />
        <VideoGames />
      </div>

      <div className="w-full md:hidden lg:flex grid gap-8 lg:gap-4 mb-8 lg:mb-4">
        <Phones />
        <Computers />
        <TV />
      </div>
      <div className="w-full md:hidden lg:flex lg:gap-4 grid gap-8 mb-8 lg:mb-4">
        <HomeAppliances />
        <HomeAudioTheater />
        <Gadgets />
      </div>
      <div className="w-full md:hidden lg:flex lg:gap-4 grid gap-8">
        <VideoGames />
        <Accessories />
      </div>
    </section>
  );
};
