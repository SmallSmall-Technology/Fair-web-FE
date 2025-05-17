import { Accessories } from './Accessories';
import { Computers } from './Computers';
import { Gadgets } from './Gadgets';
import { HomeAppliances } from './HomeAppliances';
import { HomeAudioTheater } from './HomeAudioTheater';
import { Phones } from './Phones';
import { TV } from './TV';
import { VideoGames } from './VideoGames';

export const categories = [
  {
    title: 'Phones',
    color: 'bg-[#922A8E]',
    image: '/images/iPhone11.svg',
    link: '/shop/phones',
    text: 'text-white',
  },
  {
    title: 'Computers',
    color: 'bg-[#F5F5F7]',
    image: '/public/images/macbook.svg',
    link: '/shop/computers',
  },
  {
    title: 'TV',
    color: 'bg-[#F5F5F7]',
    image: '/public/images/smarttv_sst.svg',
    link: '/shop/tv',
  },
  {
    title: 'Home Appliances',
    color: 'bg-[#F5F5F7]',
    image: '/public/images/appliances_sst.svg',
    link: '/shop/home-appliances',
  },
  {
    title: 'Home Audio & Theater',
    color: 'bg-[#F5F5F7]',
    image: '/public/images/audio_sst.svg',
    link: '/shop/audio-theater',
  },
  {
    title: 'Gadgets',
    color: 'bg-[#F5F5F7]',
    image: '/public/images/gadgets_sst.svg',
    link: '/shop/gadgets',
  },
  {
    title: 'Video Games',
    color: 'bg-[#F5F5F7]',
    image: '/public/images/videogames_sst.svg',
    link: '/shop/video-games',
  },
  {
    title: 'Accessories',
    color: 'bg-[#F5F5F7]',
    image: '/public/images/accessories_sst.svg',
    link: '/shop/accessories',
  },
];

export const ElectronicsCategory = () => {
  return (
    <section className=" py-8">
      <h3 className="text-3xl font-semibold">Electronics</h3>
      <p className="mb-4">Shop by category</p>

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

      <div className="w-full md:hidden lg:flex gap-4 ">
        <Phones />
        <Computers />
        <TV />
      </div>
      <div className="w-full md:hidden lg:flex gap-4 ">
        <HomeAppliances />
        <HomeAudioTheater />
        <Gadgets />
      </div>
      <div className="w-full md:hidden lg:flex gap-4 ">
        <VideoGames />
        <Accessories />
      </div>
    </section>
  );
};
