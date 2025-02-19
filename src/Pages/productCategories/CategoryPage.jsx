import { useEffect, useMemo, useState } from "react";
import { products } from "../../utils/data";
import { ChevronRight } from "lucide-react";
import { NavLink, useParams } from "react-router";
import { ProductCategoriesShortcut } from "./ProductCategoriesShortcut";
import { ProductCard } from "../../ui/components/landingPageProduct/ProductCard";

const CategoryPage = () => {
  const [filterByType, setFilterByType] = useState(0);
  const [filterByBrand, setFilterByBrand] = useState(0);
  const [filterByPrice, setFilterByPrice] = useState(0);

  const { categoryName } = useParams();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.category.toLowerCase() === categoryName.toLowerCase()
      ),
    [products, categoryName]
  );

  const groupBySubcategory = useMemo(
    () =>
      filteredProducts.reduce((acc, product) => {
        acc[product.subcategory] = acc[product.subcategory] || [];
        acc[product.subcategory].push(product);
        return acc;
      }, {}),
    [filteredProducts]
  );

  //helper function
  const getUniqueOptions = (products, key) => {
    return [...new Set(products.map((product) => product[key]))];
  };

  //screen readers
  useEffect(() => {
    const resultsSection = document.getElementById("results");
    if (resultsSection) resultsSection.focus();
  }, [filteredProducts]);

  return (
    <main className="mx-6 lg:mx-[76px]">
      <ProductCategoriesShortcut />
      <section className="lg:mx-16">
        <div className="flex space-x-2 items-center mt-4">
          <p className="text-[#222224] text-sm">Fair</p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p className="text-[#6B6B6B] text-sm">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </p>
        </div>
        <header className="mt-8 mb-5 flex items-baseline space-x-2">
          <h1 className="font-bold text-2xl capitalize">{categoryName}</h1>
          <p className="text-xs text-[#6B6B6B]">
            ({filteredProducts.length}){" "}
            {filteredProducts.length === 1 ? "result" : "results"}
          </p>
        </header>
        <hr className="mb-2" />
        <div className="mb-3 flex items-center flex-wrap space-x-4">
          <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
            <p>Filter</p>
            <label htmlFor="typeSelect" className="sr-only">
              Type of {categoryName}
            </label>

            <select
              id="typeSelect"
              name="type"
              aria-label={`Select Type of ${categoryName}`}
              defaultValue=""
              className="rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
            >
              <option value="" disabled>
                Type of {categoryName}
              </option>

              {getUniqueOptions(filteredProducts, "subcategory").map(
                (subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                )
              )}
            </select>

            <label htmlFor="brandSelect" className="sr-only">
              Select Brand
            </label>
            <select
              id="brandSelect"
              name="brand"
              className="rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
              defaultValue=""
            >
              <option value="" disabled>
                Choose Brand
              </option>
              {getUniqueOptions(filteredProducts, "subcategory").map(
                (subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                )
              )}
            </select>

            <label htmlFor="priceRange" className="sr-only">
              Select Price Range
            </label>
            <select
              id="priceRange"
              name="price"
              className="rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
              defaultValue=""
            >
              <option value="" disabled>
                Price
              </option>
              <option value="0-50000">₦0 - ₦50,000</option>
              <option value="50000-200000">₦50,000 - ₦200,000</option>
              <option value="200000-500000">₦200,000 - ₦500,000</option>
              <option value="500000+">₦500,000+</option>
            </select>
          </div>

          <hr className="w-full my-4 md:w-0.5 md:h-8 bg-gray-300" />

          <label htmlFor="filteredBy" className="sr-only">
            {" "}
            Products are filtered
          </label>
          <select
            name="filters"
            id="filteredBy"
            className="rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
            defaultValue=""
          >
            <option value="" disabled>
              Filters applied
            </option>
            <option value="1">1 filter applied</option>
            <option value="2">2 filters applied</option>
            <option value="3">3 filters applied</option>
          </select>
        </div>

        <hr className="mb-4" />

        {categoryName.toLowerCase() === categoryName &&
          Object.entries(groupBySubcategory).map(([subcategory, items]) => (
            <div key={subcategory} className="mb-8">
              <h1 className="font-bold text-xl capitalize mb-4">
                {subcategory}{" "}
                <span className="text-[#222224] text-sm font-normal underline pl-3">
                  <NavLink to={subcategory}>See all</NavLink>
                </span>
              </h1>
              <div className="flex overflow-scroll md:grid md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-8 gap-6 scroll-smooth">
                {items.map((product) => (
                  <div key={product.id} className="mb-6">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>
    </main>
  );
};

export default CategoryPage;
