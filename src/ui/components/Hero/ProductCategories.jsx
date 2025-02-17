import { productCategories } from "../../../utils/data";

const SingleProductCategory = ({ product }) => {
  return (
    <li className="flex flex-col items-center hover:cursor-pointer hover:shadow-[0px_4px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 transition-all duration-300 ease-in-out">
      <div className="w-10 h-10">
        <img
          src={product.productIcon}
          alt={`${product.productName} + 'icon'`}
          className="w-full h-full"
        />
      </div>
      <p className="text-xs font-medium text-nowrap">{product.productName}</p>
    </li>
  );
};

export const ProductCategories = () => {
  return (
    <section>
      <ul className="flex gap-8 md:justify-center overflow-scroll py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {productCategories.map((product) => (
          <SingleProductCategory product={product} key={product.id} />
        ))}
      </ul>
    </section>
  );
};
