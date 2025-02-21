import { useNavigate } from "react-router";
import { ProductCard } from "../../../ui/components/landingPageProduct/ProductCard";

const ProductList = ({
  categoryName,
  groupedProductsAll,
  groupedProductsWithLimit,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {Object.entries(groupedProductsWithLimit).map(
        ([subcategory, products]) => (
          <div key={subcategory} className="mb-8">
            <h1 className="font-bold text-xl capitalize mb-4 flex items-baseline">
              {subcategory}{" "}
              <p
                className="text-[#222224] text-sm font-normal underline pl-3 cursor-pointer"
                role="link"
                onClick={() =>
                  navigate(`/category/${categoryName}/${subcategory}`, {
                    state: { products: groupedProductsAll[subcategory] },
                  })
                }
              >
                See all
              </p>
            </h1>
            <div className="grid grid-flow-row grid-cols-2 overflow-scroll md:overflow-clip md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:flex 2xl:flex-wrap 2xl:justify-between gap-6 scroll-smooth">
              {products.map((product) => (
                <div key={product.id} className="mb-6">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductList;
