import FilterForm from "./FilterForm";
import { ChevronRight } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router";
import { ProductCategoriesShortcut } from "./ProductCategoriesShortcut";
import { ProductCard } from "../../ui/components/landingPageProduct/ProductCard";
import { Pagination } from "./Pagination";

const SubCategoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = location.state?.products || [];
  const { categoryName, subcategory } = useParams();

  return (
    <main className="mx-6 lg:mx-[76px] mb-20">
      <ProductCategoriesShortcut />
      <section className="lg:mx-16">
        <div className="flex space-x-2 items-center mt-4">
          <p className="text-[#222224] text-sm">Fair</p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p
            className="text-[#6B6B6B] text-sm cursor-pointer"
            onClick={() => navigate(-1)}
          >
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p className="text-[#6B6B6B] text-sm">
            {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
          </p>
        </div>
        <header className="mt-8 mb-5 flex items-baseline space-x-2">
          <h1 className="font-bold text-2xl capitalize">{subcategory}</h1>
          <p className="text-xs text-[#6B6B6B]">
            ({products.length}) {products.length === 1 ? "result" : "results"}
          </p>
        </header>
        <hr />
        <div className="flex items-center flex-wrap space-x-4">
          <div className="flex items-baseline space-x-3  mt-2 mb-4">
            <p className="w-fit">Filter</p>
            <>
              <FilterForm products={products} />
            </>
          </div>
        </div>
        <hr className="mb-6" />{" "}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex 2xl:flex-wrap 2xl:justify-between lg:gap-4">
          {products.map((product) => (
            <div key={product.id} className="mb-6">
              <ProductCard product={product} />
            </div>
          ))}
        </section>
        <Pagination />
      </section>
    </main>
  );
};

export default SubCategoryPage;
