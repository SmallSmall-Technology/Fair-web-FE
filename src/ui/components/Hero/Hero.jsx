import { HeroCards } from "./HeroCards";
import { HeroText } from "./HeroText";
import { ProductAds } from "./ProductAds";
import { ProductCategories } from "./ProductCategories";

const Hero = () => {
  return (
    <section className="mx-6 md:mx-[76px]">
      <ProductCategories />
      <ProductAds />
      <HeroText />
      <HeroCards />
    </section>
  );
};

export default Hero;
