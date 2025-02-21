import FilterForm from "../FilterForm";
import ProductList from "./ProductList";
import { useParams } from "react-router";
import { ChevronRight } from "lucide-react";
import { products } from "../../../utils/data";
import { useEffect, useMemo, useState } from "react";
import { ProductCategoriesShortcut } from "../ProductCategoriesShortcut";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter products by category
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
        // Display only 5 products from each subcategory
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
        // Include all products in each subcategory
        grouped[subcategory].push(product);
        return grouped;
      }, {}),
    [categoryProducts]
  );

  // Handle filtering
  const handleFilter = (values) => {
    const { type, brand, price } = values;
    let filtered = categoryProducts;

    if (type) {
      filtered = filtered.filter((product) => product.subcategory === type);
    }

    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    if (price) {
      const [min, max] = price.split("-").map(Number);
      filtered = filtered.filter((product) => {
        const productPrice = product.price;
        if (max) {
          return productPrice >= min && productPrice <= max;
        } else {
          return productPrice >= min;
        }
      });
    }
    setFilteredProducts(filtered);
  };

  // Focus on results section for screen readers
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
            ({categoryProducts.length}){" "}
            {categoryProducts.length === 1 ? "result" : "results"}
          </p>
        </header>
        <hr />
        <div className="flex items-center flex-wrap space-x-4">
          <div className="flex items-baseline space-x-3 mt-2 mb-4">
            <p className="w-fit">Filter</p>
            <>
              <FilterForm
                handleFilter={handleFilter}
                categoryProducts={categoryProducts}
              />
            </>
          </div>
        </div>
        <hr className="w-full mb-4" />
        <ProductList
          categoryName={categoryName}
          groupedProductsAll={groupedProductsAll}
          groupedProductsWithLimit={groupedProductsWithLimit}
        />
      </section>
    </main>
  );
};

export default CategoryPage;
