import { ChevronRight } from "lucide-react";
import { MiniProductCategories } from "../../ui/components/hero/MiniProductCategories";
import { ProductCategoriesShortcut } from "./ProductCategoriesShortcut";
import { useParams } from "react-router";
import { ProductCard } from "../../ui/components/landingPageProduct/ProductCard";
import { products } from "../../utils/data";

const SingleProductPage = () => {
  const { categoryName, subcategory } = useParams();
  const { id } = useParams();
  const data = products.find((product) => product.id === Number(id));
  console.log(id);
  //   const convertToSlug = (text) => {
  //     return text
  //       .toLowerCase()
  //       .replace(/ /g, "-")
  //       .replace(/[^\w-]+/g, "");
  //   };

  return (
    <main className="mx-6 lg:mx-[76px] mb-20">
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
          <p className="text-[#222224] text-sm cursor-pointer">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p className="text-[#222224] text-sm">
            {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
          </p>
          <ChevronRight size={11} className="text-[#6B6B6B]" />
          <p className="text-[#6B6B6B] text-sm">
            {/* {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} */}

            {data.name}
          </p>
        </div>
      </section>
      <ProductCard product={data} />
    </main>
  );
};

export default SingleProductPage;
