import { useState } from 'react';
import { Pagination } from './Pagination';
import { products } from '../../utils/data';
import ProductCard from '../../utils/ProductCard';
import { ArrowUpDown, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import SubCategoryFilterForm from './filterForms/SubCategoryFilterForm';
import {
  ProductCategoriesShortcut,
  departments,
} from './ProductCategoriesShortcut';
// import { useQuery } from '@tanstack/react-query';
// import { fetchAllProducts } from '../../services/api.js';
import Header from '../../ui/components/header/Header';

const SubCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryName, subcategory } = useParams();
  // const { allData, error, isLoading } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchAllProducts,
  // });

  const data = products.filter(
    (product) =>
      product?.subcategory?.toLowerCase() === subcategory?.toLowerCase()
  );

  // const [sortedGroupedProducts, setSortedGroupedProducts] = useState(data);

  // const handleSortProducts = () => {
  //   const sorted = products
  //     .slice()
  //     .sort((a, b) => a.name.localeCompare(b.name))
  //     .reduce((acc, product) => {
  //       const key = product.name;
  //       acc[key] = acc[key] || [];
  //       acc[key].push(product);
  //       return acc;
  //     }, {});
  //   setSortedGroupedProducts(sorted);
  // };

  const getCategory = departments.find(
    (department) =>
      department.name.toLowerCase() === categoryName?.toLowerCase()
  );
  const categories = getCategory.subcategories;

  // const productsToDisplay =
  //   Object.keys(sortedGroupedProducts).length > 0
  //     ? Object.values(sortedGroupedProducts).flat()
  //     : data;

  return (
    <>
      <Header />
      <main className=" lg:mx-[60px] mb-20">
        <div className="flex px-0 overflow-x-a">
          <ProductCategoriesShortcut categories={categories} />
        </div>
        {/* <div className="flex md:hidden overflow-x-auto scrollbar-hide"></div> */}

        <section className="px-5 lg:mx-6">
          <div className="flex space-x-1 items-center mt-4">
            <p className="text-[#222224] text-sm" onClick={() => navigate(-2)}>
              Smallsmall
            </p>
            <ChevronRight size={11} className="text-[#6B6B6B]" />
            <p
              className="text-[#222224] text-sm cursor-pointer"
              onClick={() => navigate(-1)}
            >
              {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
            </p>
            <ChevronRight size={11} className="text-[#6B6B6B]" />
            <p className="text-[#6B6B6B] text-sm">
              {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
            </p>
          </div>
          <div className="flex justify-between items-baseline">
            <header className="mt-8 mb-5 flex items-baseline space-x-2">
              <h1 className="font-bold text-2xl capitalize">{subcategory}</h1>
              <p className="text-xs text-[#6B6B6B]">
                ({data.length}) {data.length === 1 ? 'result' : 'results'}
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
          {data.length > 0 ? (
            <section className="flex justify-between flex-wrap">
              {data.map((product) => (
                <div key={product.id} className="mb-6">
                  <ProductCard product={product} />
                </div>
              ))}
            </section>
          ) : (
            <p>No product found under this subcategory</p>
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
