import { HeroCards } from "./HeroCard";
import { HeroText } from "./HeroText";
import { ProductAds } from "./ProductAds";
import { ProductCategories } from "./ProductCategories";

const Hero = () => {
  return (
    <section className="">
      <ProductCategories />
      <ProductAds />
      <HeroText />
      <HeroCards />
    </section>
  );
};

export default Hero;
