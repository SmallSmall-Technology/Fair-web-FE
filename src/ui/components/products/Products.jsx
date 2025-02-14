import { NewProductsInStore } from "./NewProductsInStore";
import { PopularProducts } from "./PopularProducts";

const Products = () => {
  return (
    <section className="mx-6 md:mx-12">
      <NewProductsInStore />
      <PopularProducts />
    </section>
  );
};

export default Products;
