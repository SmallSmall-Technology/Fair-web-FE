import { ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// import { SingleProductStickyHeader } from '../../ui/components/header/SingleProductStickyHeader';
import { ProductCategoriesShortcut } from './productCategoriesShortcut/ProductCategoriesShortcut.jsx';

import { SingleProductDetails } from './productDetails/SingleProductDetails';
import { useQuery } from '@tanstack/react-query';
import { useIsInView } from '../../hooks/useIsInView';
import { fetchSingleProduct } from '../../api/product-api';

const SingleProductPage = () => {
  const { category, sub_category, productID } = useParams();

  const navigate = useNavigate();
  const [targetRef, isInView] = useIsInView();

  const { data: product } = useQuery({
    queryKey: ['product-details', productID],
    queryFn: () => fetchSingleProduct(productID),
    enabled: !!productID,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      <main className="px-6 lg:px-10 mb-5 lg:block w-full">
        <div className="" ref={targetRef}>
          <ProductCategoriesShortcut />
        </div>
        <div className="flex md:hidden overflow-x-auto scrollbar-hide"></div>
        <div className="flex lg:hidden">
          {/* {!isInView && <SingleProductStickyHeader product={product} />} */}
        </div>
        <section className="hidden lg:flex lg:px-6">
          <div className="font-inter text-sm flex space-x-1 items-center mt-4">
            <p className="text-[#222224] ">Smallsmall</p>
            <ChevronRight size={11} className="text-[#6B6B6B]" />
            <p className="text-[#222224]  cursor-pointer">
              {category &&
                category?.charAt(0).toUpperCase() + category?.slice(1)}
            </p>
            <ChevronRight size={11} className="text-[#6B6B6B]" />
            <p
              className="text-[#222224]  cursor-pointer"
              onClick={() => navigate(-1)}
            >
              {sub_category &&
                sub_category?.charAt(0).toUpperCase() + sub_category?.slice(1)}
            </p>
            <ChevronRight size={11} className="text-[#6B6B6B]" />

            <p className="text-[#6B6B6B] ">{product?.productName}</p>
          </div>
        </section>
        {/* <p>{product?.productName}</p> */}
      </main>
      <section className="mt-8 lg:mx-[40px] mb-12">
        <SingleProductDetails
          product={product}
          category={category}
          subcategory={sub_category}
        />
      </section>
    </>
  );
};

export default SingleProductPage;
