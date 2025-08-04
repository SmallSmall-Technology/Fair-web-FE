import { ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { RentSmallsmall } from './realEstateContentSection/realEstateSubcategories/RentSmallsmall';
import { ProductCategoriesShortcut } from '../../productCategories/productCategoriesShortcut/ProductCategoriesShortcut';

export const RealEstateSubCategory = () => {
  const { category, sub_category } = useParams();

  return (
    <>
      <div className="lg:px-14">
        <ProductCategoriesShortcut />
      </div>
      <main className="px-5 lg:px-20">
        <div className="font-inter flex space-x-1 items-center mt-4 mb-10">
          <p
            className=" text-[#222224] text-sm cursor-pointer"
            onClick={() => navigate('/')}
          >
            Smallsmall
          </p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p
            className="text-[#222224] text-sm cursor-pointer"
            onClick={() => navigate(-1)}
          >
            {category?.charAt(0).toUpperCase() + category?.slice(1)}
          </p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p className="text-[#6B6B6B] text-sm">
            {sub_category?.charAt(0).toUpperCase() + sub_category?.slice(1)}
          </p>
        </div>
        {sub_category === 'rent' && <RentSmallsmall />}
      </main>
    </>
  );
};
