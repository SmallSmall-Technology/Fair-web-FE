import Header from '../../../ui/components/header/Header';
import { RealEstateCategory } from './realEstateContentSection/RealEstateCategory';
// import { ProductCategoriesShortcut } from '../../productCategories/ProductCategoriesShortcut';
import { RealEstateHeroTextSection } from './realEstateContentSection/RealEstateHeroTextSection';
import { RealEstateHomeHeroBanner } from './realEstateContentSection/realEstateBanner/RealEstateHomeHeroBanner';
import RentOut from './realEstateContentSection/RentOut';
import RealEstateNewProperties from './realEstateContentSection/realEstateBanner/realEstateProperties/RealEstateNewProperties';
import { TodaysRealEstateDeal } from './realEstateContentSection/realEstateBanner/realEstateProperties/TodaysRealEstateDeal';
import { ProductCategoriesShortcut } from '../../productCategories/productCategoriesShortcut/ProductCategoriesShortcut';

const RealEstateHome = () => {
  // const categories = [
  //   { name: 'RentSmallsmall', link: '/real-estate-rentsmallsmall' },
  //   { name: 'StaySmallsmall', link: '/real-estate-staysmallsmall' },
  //   { name: 'BuySmallsmall', link: '/real-estate-buysmallsmall' },
  // ];
  return (
    <>
      <ProductCategoriesShortcut />
      <div className="mx-5">
        <RealEstateHomeHeroBanner />
        <RealEstateHeroTextSection />
        <RealEstateCategory />
        <RealEstateNewProperties />
        <TodaysRealEstateDeal />
        {/* <TodaysDeal /> */}
        <RentOut />
      </div>
    </>
  );
};

export default RealEstateHome;
