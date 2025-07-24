import { Pagination } from './Pagination';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../utils/ProductCard';
import Header from '../../ui/components/header/Header';
import { ArrowUpDown, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import PageNotFound from '../pageNotFound/PageNotFound.jsx';
import SubCategoryFilterForm from './filterForms/SubCategoryFilterForm';
import {
  fetchProductsByCategoryAndSubcategory,
  getAllCategories,
} from '../../api/product-api.js';
import ProductCardSkeleton from '../../ui/components/skeletons/ProductCardSkeleton.jsx';
import { ProductCategoriesShortcut } from './productCategoriesShortcut/ProductCategoriesShortcut.jsx';

const SubCategoryPage = () => {
  const navigate = useNavigate();
  const { category, sub_category } = useParams();
  console.log(sub_category);

  // Fetch products by category and subcategory
  // This will be used to display products under the selected subcategory
  const { data, isFetching } = useQuery({
    queryKey: ['products-by-category', category, sub_category],
    queryFn: () =>
      fetchProductsByCategoryAndSubcategory(category, sub_category),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const products = data?.data?.products || [];

  // Fetch all categories for the shortcut
  // This is used to validate the subcategory and display the shortcut
  const { data: allCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const categories = Array.isArray(allCategories?.data?.categories)
    ? allCategories.data.categories
    : [];

  // console.log(categories);

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
      <Header />
      <main className=" lg:mx-[60px] mb-20">
        <div className="flex px-0 ">
          <ProductCategoriesShortcut categories={categories} />
        </div>

        <section className="px-5 lg:mx-0">
          <div className="font-inter flex space-x-1 items-center mt-4">
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
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </p>
            <ChevronRight size={11} className="text-[#6B6B6B]" />
            <p className="text-[#6B6B6B] text-sm">
              {sub_category.charAt(0).toUpperCase() + sub_category.slice(1)}
            </p>
          </div>
          <div className="flex justify-between items-baseline">
            <header className="mt-8 mb-5 flex items-baseline space-x-2">
              <h1 className="text-[25px] capitalize">
                {sub_category.split('-').join(' ')}
              </h1>
              <p className="font-inter text-xs text-[#6B6B6B] flex items-center space-x-1">
                <span>({products?.length})</span>
                <span>{products?.length === 1 ? 'item' : 'items'}</span>
              </p>
            </header>
            <div
              className="flex md:hidden items-center cursor-pointer hover:cursor-pointer hover:shadow-[0px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 transition-all duration-300 ease-in-out"
              // onClick={handleSortProducts}
              role="button"
              aria-label="Sort products by subcategory"
            >
              <p className="font-semibold text-sm">Sort</p>
              <span>
                <ArrowUpDown size={18} />
              </span>
            </div>
          </div>
          <hr />
          <div className="flex items-center flex-wrap space-x-4">
            <div className="flex items-baseline space-x-3  mt-2 mb-4">
              <p className="w-fit">Filter</p>
              <>
                <SubCategoryFilterForm products={data} />
              </>
            </div>
          </div>
          <hr className="mb-6" />{' '}
          {isFetching && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          )}
          {products?.length > 0 && (
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <div key={product.id} className="mb-6">
                  <ProductCard product={product} />
                </div>
              ))}
            </section>
          )}
          {!products?.length && !isFetching && (
            <p className="text-center text-white font-outfit rounded-lg mt-10 bg-gray-400 w-full py-20 flex justify-center items-center">
              No products found in this subcategory.
            </p>
          )}
          <div className="flex justify-center md:justify-start">
            <Pagination />
          </div>
        </section>
      </main>
    </>
  );
};

export default SubCategoryPage;
