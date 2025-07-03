import { HeroTextSection } from '../HeroTextSection';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { ConsumerGoodsCategory } from './consumerGoodsContentSection/ConsumerGoodsCategory';
import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import { ConsumerGoodsHeroBanner } from './consumerGoodsContentSection/ConsumerGoodsHeroBanner';
import NewProductsInStore from '../homeLivingLandingPage/homeLivingContentSection/NewProductsInStore';

const ConsumerGoodsHome = () => {
  const categories = [
    { name: 'Personal Care', link: '/lifestyle-personal-care' },
    { name: 'Beauty', link: '/lifestyle-beauty' },
    { name: 'Fashion', link: '/lifestyle-fashion' },
    { name: 'Health & Wellness', link: '/lifestyle-health-wellness' },
    { name: 'Baby & Mother care', link: '/lifestyle-baby-mother' },
    { name: 'Household Essentials', link: '/lifestyle-household-essentials' },
    { name: 'Toys', link: '/lifestyle-toys' },
    { name: 'Entertainment', link: '/lifestyle-entertainment' },
    { name: 'Books', link: '/lifestyle-books' },
  ];
  return (
    <>
      <ProductCategoriesShortcut categories={categories} />
      <div className="mx-5">
        <ConsumerGoodsHeroBanner />
        <HeroTextSection />
      </div>

      <ConsumerGoodsCategory />
      <div className="mx-5">
        <NewProductsInStore />
        <TodaysDeal />
      </div>
    </>
  );
};

export default ConsumerGoodsHome;
