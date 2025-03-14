import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Button } from "../../../utils/Button";
import { ProductImage } from "../ProductImage";
import { products } from "../../../utils/data";
import { NavLink, useNavigate } from "react-router";
import { ProductCard } from "../../../features/product/ProductCard";
import { CommentBar } from "../../../features/reviewsRating/CommentBar";
import { AddFavourite } from "../../../features/favourite/AddFavourite";
import { SingleProductDetailsAside } from "./SingleProductDetailsAside";
import { handleShareProduct } from "../../../features/product/ShareProduct";

export const SingleProductDetails = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  // Array of images for the aside section
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  //Get the property category
  const category = product.category;
  const shippingDate = "20 Jan, 2025";

  return (
    <>
      <div className="hidden lg:flex justify-end space-x-2 mb-3 mx-5 lg:mx-0 ">
        <p className="flex items-center text-sm text-[#222224] cursor-pointer">
          Add to favorite{" "}
          <span className="pl-1">
            <AddFavourite product={product} />
          </span>
        </p>
        <p
          className="flex items-center text-sm text-[#222224] cursor-pointer"
          onClick={handleShareProduct}
        >
          <span>Share </span>
          <span className="pl-1">
            <img src="/public/images/share-square.svg" alt="A share icon" />
          </span>
        </p>
      </div>
      {/* Main Product Section */}

      <div className="flex flex-wrap w-full justify-between">
        {/* Left Section - Product Images */}
        <main className="w-full lg:w-1/2 mx-5 lg:mx-0">
          <div className="flex justify-between gap-5 lg:mb-20">
            {/* Aside - Thumbnail Images */}
            <aside className="w-[100px] hidden lg:grid">
              <ul className="hidden lg:grid grid-cols-1 gap-2">
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
              <div className="hidden lg:bg-[#F2F2F2] rounded-2xl w-full h-[363px] lg:h-[589px] llg:w-[589px] lg:flex justify-center items-center">
                <img
                  src={product.image}
                  alt={product.slug}
                  className="w-[full] lg:w-[487px] lg:h-[487px] object-cover"
                />
              </div>
              {/* Carousel images for mobile view */}
              <section className="relative flex justify-center mb-8 md:hidden">
                <div
                  className="flex w-full lg:hidden overflow-hidden h-[363px] "
                  aria-live="polite"
                  role="group"
                  aria-roledescription="carousel"
                >
                  {productImages.map((product, index) => (
                    <img
                      key={index}
                      src={product}
                      className={`absolute h-full w-full transition-opacity duration-700 ease-in-out ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>

                {/* Carousel button for mobile view */}
                <div className="absolute bottom-2 p flex justify-center space-x-4 bg-[#323232] w-fit p-1 rounded-xl">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-[#FFFFFF] scale-125"
                          : "bg-[#A3A3A2]"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setCurrentIndex(index);
                        }
                      }}
                    ></button>
                  ))}
                </div>

                <div className="absolute bottom-0 right-0 lg:hidden w-fit shadow-[2px_4px_7px_1px_rgba(0,0,0,0.2)] ml-auto p-2 flex items-center rounded-[10px] ">
                  <AddFavourite />
                </div>
              </section>
            </main>
          </div>
          <section className="hidden lg:grid mt-8">
            <p className="font-semibold text-lg mb-4">
              Customer ratings and review
            </p>
            <CommentBar />
          </section>
        </main>

        {/* Right Section - Product Details */}

        <SingleProductDetailsAside
          product={product}
          shippingDate={shippingDate}
          category={category}
        />
      </div>

      {/* "You May Also Like" Section */}
      <section className="mb-24 mx-5 lg:mx-0">
        <div className="mt-8 flex justify-between items-center mb-6">
          <p className="text-lg font-semibold">You may also like</p>
          <NavLink to="/related-products" className="underline">
            See more
          </NavLink>
        </div>
        <div className="grid grid-flow-col space-x-4 w-full overflow-x-scroll scrollbar-hide scroll-smooth">
          {products
            .filter((product) => product.category === category)
            .map((product, id) => (
              <ProductCard product={product} key={id} />
            ))}
        </div>
      </section>

      <section className="hidden lg:block">
        {/* Explore related searches */}
        <h2 className="font-semibold text-2xl">Explore related searches</h2>
        <p className="text-[13px] mt-4 mb-20">Fridge 200 litre</p>

        <div className="flex justify-between">
          <Button
            className="text-[#DB1C5E] text-[13px] underline"
            onClick={() => {
              navigate(-1);
              window.location.reload();
            }}
          >
            Back previous page
          </Button>
          <Button
            className="text-[13px] underline"
            onClick={() => {
              window.scrollTo("y", 0);
            }}
          >
            Return to top
          </Button>
        </div>
      </section>
    </>
  );
};
