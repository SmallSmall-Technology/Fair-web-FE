import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCategoriesShortcut } from './ProductCategoriesShortcut';
import { SingleProductStickyHeader } from '../../ui/components/header/SingleProductStickyHeader';
import { SingleProductDetails } from './productDetails/SingleProductDetails';
// import { MiniProductCategories } from '../home/hero/MiniProductCategories';
// import { useQuery } from '@tanstack/react-query';
// import { fetchAllProducts } from '../../services/api';
import { products } from '../../utils/data';
import { useIsInView } from '../../hooks/useIsInView';

const SingleProductPage = () => {
  const { categoryName, subcategory, slug, id } = useParams();
  const navigate = useNavigate();
  const [targetRef, isInView] = useIsInView();

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchAllProducts,
  // });

  const product = products?.find((product) => product.id === id);

  return (
    <>
      <main className="px-6 lg:px-10 mb-5 lg:block w-full">
        <div className="" ref={targetRef}>
          <ProductCategoriesShortcut />
        </div>
        {/* <div className="flex md:hidden overflow-x-auto scrollbar-hide">
          <MiniProductCategories />
        </div> */}
        <div className="flex lg:hidden">
          {!isInView && <SingleProductStickyHeader product={product} />}
        </div>
        <section className="hidden lg:flex lg:px-6">
          <div className="flex space-x-1 items-center mt-4">
            <p className="text-[#222224] text-sm">Smallsmall</p>
            <ChevronRight size={11} className="text-[#6B6B6B]" />
            <p className="text-[#222224] text-sm cursor-pointer">
              {categoryName &&
                categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1)}
            </p>
            {categoryName && (
              <ChevronRight size={11} className="text-[#6B6B6B]" />
            )}
            <p
              className="text-[#222224] text-sm cursor-pointer"
              onClick={() => navigate(-1)}
            >
              {subcategory &&
                subcategory?.charAt(0).toUpperCase() + subcategory?.slice(1)}
            </p>
            {subcategory && (
              <ChevronRight size={11} className="text-[#6B6B6B]" />
            )}
            <p className="text-[#6B6B6B] text-sm">{product.name}</p>
          </div>
        </section>
      </main>
      <section className="mt-8 lg:mx-[40px] mb-12">
        <SingleProductDetails product={product} />
      </section>
    </>
  );
};

export default SingleProductPage;
