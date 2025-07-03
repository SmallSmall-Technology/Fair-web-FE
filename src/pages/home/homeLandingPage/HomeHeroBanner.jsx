import HeroBanner from '../HeroBanner';

const slides = [
  {
    image: '',
    content: (
      <>
        <h1 className="text-3xl font-bold">Slide One</h1>
        <p className="text-sm mt-2">Enjoy deals on home products</p>
      </>
    ),
  },
  {
    image: '',
    content: (
      <>
        <h1 className="text-3xl font-bold">Slide Two</h1>
        <p className="text-sm mt-2">Explore electronics & more</p>
      </>
    ),
  },
];

export const HomeHeroBanner = () => {
  return <HeroBanner slides={slides} autoSlideInterval={3000} height={360} />;
};
