import { ChevronRight } from "lucide-react";
import { MiniProductCategories } from "../../ui/components/hero/MiniProductCategories";
import { ProductCategoriesShortcut } from "./ProductCategoriesShortcut";
import { useNavigate, useParams } from "react-router";
import { ProductCard } from "../../ui/components/landingPageProduct/ProductCard";
import { products } from "../../utils/data";
import { SingleProductDetails } from "./SingleProductDetails";

const SingleProductPage = () => {
  const { categoryName, subcategory } = useParams();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = products.find((product) => product.id === Number(id));

  return (
    <>
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
            <p className="text-[#6B6B6B] text-sm">{data.name}</p>
          </div>
        </section>
      </main>
      <section className="mt-8 mx-5 lg:mx-[40px] mb-12">
        <SingleProductDetails product={data} />
      </section>
    </>
  );
};

export default SingleProductPage;
