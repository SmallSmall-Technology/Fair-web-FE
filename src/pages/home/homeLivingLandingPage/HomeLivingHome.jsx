import { HeroTextSection } from '../HeroTextSection';
import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import { HomeLivingCategory } from './homeLivingContentSection/HomeLivingCategory';
import NewProductsInStore from './homeLivingContentSection/NewProductsInStore';
import TodaysDeal from './homeLivingContentSection/TodaysDeal';
import HomeLivingHeroBanner from './homeLivingContentSection/homeLivingCategory/HomeLivingHeroBanner';

const HomeLivingHome = () => {
  const categories = [
    { name: 'Decor', link: '/home-living-decor' },
    { name: 'Furniture', link: '/home-living-furniture' },
    { name: 'Kitchen & Dining', link: '/home-living-kitchen-dining' },
    { name: 'Bed & Bath', link: '/home-living-bed-bath' },
    { name: 'Garden & Outdoor', link: '/home-living-garden-outdoor' },
    { name: 'Home Improvement', link: '/home-living-home-improvement' },
  ];
  return (
    <>
      <ProductCategoriesShortcut categories={categories} />
      <div className="mx-5">
        <HomeLivingHeroBanner />
        <HeroTextSection />
      </div>
      <HomeLivingCategory />
      <div className="mx-5">
        <NewProductsInStore />
        <TodaysDeal />
      </div>
    </>
  );
};

export default HomeLivingHome;
