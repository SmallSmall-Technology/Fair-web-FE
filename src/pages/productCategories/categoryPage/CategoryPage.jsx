import ProductList from './ProductList';
import { useParams } from 'react-router-dom';
import { products } from '../../../utils/data';
import { useEffect, useMemo, useState } from 'react';
import { ArrowUpDown, ChevronRight } from 'lucide-react';
import CategoryFilterForm from '../filterForms/CategoryFilterForm';
import { ProductCategoriesShortcut } from '../productCategoriesShortcut/ProductCategoriesShortcut';
// import { MiniProductCategories } from '../../home/hero/MiniProductCategories';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortedGroupedProducts, setSortedGroupedProducts] = useState({});

  const categoryProducts = useMemo(
    () =>
      filteredProducts.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      ),
    [filteredProducts, categoryName]
  );

  // Group products by subcategory, displaying only 5 products per subcategory
  const groupedProductsWithLimit = useMemo(
    () =>
      categoryProducts.reduce((grouped, product) => {
        const { subcategory } = product;
        grouped[subcategory] = grouped[subcategory] || [];
        if (grouped[subcategory].length < 5) {
          grouped[subcategory].push(product);
        }
        return grouped;
      }, {}),
    [categoryProducts]
  );

  // Group products by subcategory, including all products
  const groupedProductsAll = useMemo(
    () =>
      categoryProducts.reduce((grouped, product) => {
        const { subcategory } = product;
        grouped[subcategory] = grouped[subcategory] || [];
        grouped[subcategory].push(product);
        return grouped;
      }, {}),
    [categoryProducts]
  );

  //Handle sorting products subcategory alphabetically
  const handleSortProducts = () => {
    const sorted = Object.keys(groupedProductsAll)
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, key) => {
        acc[key] = groupedProductsAll[key];
        return acc;
      }, {});

    setSortedGroupedProducts(sorted);
  };

  // Determine which grouped products to use
  const productsToDisplay =
    Object.keys(sortedGroupedProducts).length > 0
      ? sortedGroupedProducts
      : groupedProductsWithLimit;

  // Focus on results section for screen readers
  useEffect(() => {
    const resultsSection = document.getElementById('results');
    if (resultsSection) resultsSection.focus();
  }, [filteredProducts]);

  return (
    <main className="mx-6 lg:mx-[60px]">
      <div className="hidden md:flex">
        <ProductCategoriesShortcut />
      </div>
      <div className="flex md:hidden overflow-x-auto scrollbar-hide">
        {/* <MiniProductCategories /> */}
      </div>
      <section className="lg:mx-16">
        <div className="flex space-x-2 items-center mt-4">
          <p className="text-[#222224] text-sm">Fair</p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p className="text-[#6B6B6B] text-sm">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <header className="mt-8 mb-5 flex items-baseline space-x-2">
            <h1 className="font-bold text-2xl capitalize">{categoryName}</h1>
            <p className="text-xs text-[#6B6B6B]">
              ({categoryProducts.length}){' '}
              {categoryProducts.length === 1 ? 'result' : 'results'}
            </p>
          </header>
          <div
            className="flex md:hidden items-center cursor-pointer hover:cursor-pointer hover:shadow-[0px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 transition-all duration-300 ease-in-out"
            onClick={handleSortProducts}
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
          <div className="flex items-baseline space-x-3 mt-2 mb-4">
            <p className="w-fit">Filter</p>
            <CategoryFilterForm categoryProducts={categoryProducts} />
          </div>
        </div>
        <hr className="w-full mb-4" />
        <ProductList
          categoryName={categoryName}
          groupedProductsAll={groupedProductsAll}
          groupedProductsWithLimit={productsToDisplay}
        />
      </section>
    </main>
  );
};

export default CategoryPage;
