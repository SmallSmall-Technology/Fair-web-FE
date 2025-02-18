import { HeroCards } from "./HeroCards";
import { HeroText } from "./HeroText";
import { ProductAds } from "./ProductAds";
import { MiniProductCategories } from "./MiniProductCategories";

const Hero = () => {
  return (
    <section className="mx-6 md:mx-[76px]">
      <MiniProductCategories />
      <ProductAds />
      <HeroText />
      <HeroCards />
    </section>
  );
};

export default Hero;
