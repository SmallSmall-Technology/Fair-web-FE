import Header from '../../../ui/components/header/Header';
import { RealEstateCategory } from './realEstateContentSection/RealEstateCategory';
import TodaysDeal from '../homeLivingLandingPage/homeLivingContentSection/TodaysDeal';
import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import { RealEstateHeroTextSection } from './realEstateContentSection/RealEstateHeroTextSection';
import { RealEstateHomeHeroBanner } from './realEstateContentSection/realEstateBanner/RealEstateHomeHeroBanner';
import RentOut from './realEstateContentSection/RentOut';
import RealEstateNewProperties from './realEstateContentSection/realEstateBanner/realEstateProperties/RealEstateNewProperties';

const RealEstateHome = () => {
  const categories = [
    { name: 'RentSmallsmall', link: '/real-estate-rentsmallsmall' },
    { name: 'StaySmallsmall', link: '/real-estate-staysmallsmall' },
    { name: 'BuySmallsmall', link: '/real-estate-buysmallsmall' },
  ];
  return (
    <>
      <ProductCategoriesShortcut categories={categories} />
      <div className="mx-5">
        <RealEstateHomeHeroBanner />
        <RealEstateHeroTextSection />
        <RealEstateCategory />
        <RealEstateNewProperties />
        <TodaysDeal />
        <RentOut />
      </div>
    </>
  );
};

export default RealEstateHome;
