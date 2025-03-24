import { useState } from "react";
import { Pagination } from "./Pagination";
import { products } from "../../utils/data";
import { ProductCard } from "../../utils/ProductCard";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import SubCategoryFilterForm from "./filterForms/SubCategoryFilterForm";
import { ProductCategoriesShortcut } from "./ProductCategoriesShortcut";
import { MiniProductCategories } from "../home/hero/MiniProductCategories";

const SubCategoryPage = () => {
  const navigate = useNavigate();
  const { subcategory, categoryName } = useParams();
  const data = products.filter(
    (product) =>
      product?.subcategory?.toLowerCase() === subcategory?.toLowerCase()
  );

  const [sortedGroupedProducts, setSortedGroupedProducts] = useState({ data });

  const handleSortProducts = () => {
    const sorted = products
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((acc, product) => {
        const key = product.name;
        acc[key] = acc[key] || [];
        acc[key].push(product);
        return acc;
      }, {});
    setSortedGroupedProducts(sorted);
  };

  const productsToDisplay =
    Object.keys(sortedGroupedProducts).length > 0
      ? Object.values(sortedGroupedProducts).flat()
      : data;

  return (
    <main className="mx-6 lg:mx-[60px] mb-20">
      <div className="hidden md:flex">
        <ProductCategoriesShortcut />
      </div>
      <div className="flex md:hidden overflow-x-auto scrollbar-hide">
        <MiniProductCategories />
      </div>

      <section className="lg:mx-16">
        <div className="flex space-x-1 items-center mt-4">
          <p className="text-[#222224] text-sm">Fair</p>
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
              ({subcategory.length}){" "}
              {subcategory.length === 1 ? "result" : "results"}
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
          <div className="flex items-baseline space-x-3  mt-2 mb-4">
            <p className="w-fit">Filter</p>
            <>
              <SubCategoryFilterForm products={productsToDisplay} />
            </>
          </div>
        </div>
        <hr className="mb-6" />{" "}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-40 xl:grid-cols-5 xl:gap-4 2xl:flex 2xl:flex-wrap 2xl:justify-between lg:gap-">
          {productsToDisplay.map((product) => (
            <Link
              to={`/category/${categoryName}/${subcategory}/${product.id}/${product.slug}`}
              key={product.id}
            >
              <div key={product.id} className="mb-6 ">
                <ProductCard product={product} />
              </div>
            </Link>
          ))}
        </section>
        <div className="flex justify-center md:justify-start">
          <Pagination />
        </div>
      </section>
    </main>
  );
};

export default SubCategoryPage;
