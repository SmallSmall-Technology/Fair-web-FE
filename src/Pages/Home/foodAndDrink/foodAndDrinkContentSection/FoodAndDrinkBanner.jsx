import HeroBanner from '../../HeroBanner';

const slides = [
  {
    image: '',
    content: (
      <>
        <h1 className="text-3xl font-bold">Slide One</h1>
        <p className="text-sm mt-2">Food and Drinks deals on home products</p>
      </>
    ),
  },
  {
    image: '',
    content: (
      <>
        <h1 className="text-3xl font-bold">Slide Two</h1>
        <p className="text-sm mt-2">Explore Comfortable Lifestyle</p>
      </>
    ),
  },
];

export const FoodAndDrinkBanner = () => {
  return <HeroBanner slides={slides} autoSlideInterval={3000} height={220} />;
};
