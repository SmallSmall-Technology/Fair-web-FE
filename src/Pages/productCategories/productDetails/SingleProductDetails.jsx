import { NavLink } from "react-router"; // Fixed import
import { ArrowBigUp } from "lucide-react";
import { useEffect } from "react";
import { CommentBar } from "./CommentBar";
import { ProductImage } from "./ProductImage";

export const SingleProductDetails = ({ product }) => {
  // Array of images for the aside section
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  return (
    <>
      {/* Main Product Section */}
      <div className="flex flex-wrap w-full justify-between">
        {/* Left Section - Product Images */}
        <main className="w-full md:w-1/2">
          <div className="flex justify-between gap-5">
            {/* Aside - Thumbnail Images */}
            <aside className="w-[100px]">
              <ul className="hidden md:grid grid-cols-1 gap-2">
                {productImages.map((image, index) => (
                  <ProductImage
                    key={index}
                    image={image}
                    alt={`${product.slug}-thumbnail-${index}`}
                    className="w-[94px] h-[94px]"
                  />
                ))}
              </ul>
            </aside>

            {/* Main Product Image */}
            <main className="flex-1">
              <div className="bg-[#F2F2F2] rounded-2xl w-full h-[589px] flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.slug}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </main>
          </div>
          <section className="mt-8">
            <p className="font-semibold text-lg mb-4">
              Customer ratings and review
            </p>
            <CommentBar />
          </section>
        </main>

        {/* Right Section - Product Details */}
        <aside className="w-full md:w-1/2 p-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <hr />
          <p className="text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-4">${product.price}</p>
          <p className="text-sm text-gray-500">{product.subcategory}</p>
        </aside>
      </div>

      {/* "You May Also Like" Section */}
      <div className="mt-8 flex justify-between items-center">
        <p className="text-lg font-semibold">You may also like</p>
        <NavLink
          to="/related-products"
          className="text-blue-500 hover:underline"
        >
          See more
        </NavLink>
      </div>
    </>
  );
};
