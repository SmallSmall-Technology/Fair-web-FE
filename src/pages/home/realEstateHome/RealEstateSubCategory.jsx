import { ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageNotFound from '../../pageNotFound/PageNotFound';
import { getAllCategories } from '../../../api/product-api';
import { RentSmallsmall } from './realEstateContentSection/realEstateSubcategories/RentSmallsmall';
import { ProductCategoriesShortcut } from '../../productCategories/productCategoriesShortcut/ProductCategoriesShortcut';

export const RealEstateSubCategory = () => {
  const { category, sub_category } = useParams();

  const { data: allCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  // Check if the subcategory is valid
  // This is used to ensure that the subcategory exists in the categories data
  // If not, we will show a PageNotFound component
  const categories = Array.isArray(allCategories?.data?.categories)
    ? allCategories.data.categories
    : [];

  const isValidSubcategory = categories?.some((cat) => {
    return (
      cat.slug.toLowerCase() === category?.toLowerCase() &&
      cat.subcategories?.some(
        (sub) => sub.slug.toLowerCase() === sub_category?.toLowerCase()
      )
    );
  });

  if (!isValidSubcategory) {
    return <PageNotFound />;
  }

  return (
    <>
      <div className="lg:px-14">
        <ProductCategoriesShortcut />
      </div>
      <main className="px-5 lg:px-20">
        <div className="font-inter flex space-x-1 items-center mt-2 mb-10">
          <p
            className=" text-[#222224] text-sm cursor-pointer"
            onClick={() => navigate('/')}
          >
            Smallsmall
          </p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p
            className="text-[#6B6B6B] text-sm cursor-pointer"
            onClick={() => navigate(-1)}
          >
            {category
              ?.replace(/-/g, ' ')
              ?.replace(/\b\w/g, (char) => char.toUpperCase())}
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
