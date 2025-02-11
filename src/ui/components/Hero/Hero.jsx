import { HeroText } from "./HeroText";
import { ProductAds } from "./ProductAds";
import { ProductCategories } from "./ProductCategories";

const Hero = () => {
  return (
    <section>
      <ProductCategories />
      <ProductAds />
      <HeroText />
    </section>
  );
};

export default Hero;
