import RealEstateHeroBanner from './RealEstateHeroBanner';

const slides = [
  {
    image: '/images/young-woman-in-hoodie.svg',
    content: (
      <>
        <h1 className="text-xl lg:text-3xl font-bold">
          Simplify your life, <br className="hidden lg:flex" /> Pay rent your
          way
        </h1>
        <p className="text-sm mt-6">
          Find your space with affordable monthly & flexible plans.
        </p>
      </>
    ),
  },
  {
    image: '/images/young-woman-in-hoodie.svg',
    content: (
      <>
        <h1 className="text-xl lg:text-3xl font-bold">Slide Two</h1>
        <p className="text-sm mt-2">Explore electronics & more</p>
      </>
    ),
  },
];

export const RealEstateHomeHeroBanner = () => {
  return (
    <RealEstateHeroBanner
      slides={slides}
      autoSlideInterval={3000}
      height={220}
    />
  );
};
