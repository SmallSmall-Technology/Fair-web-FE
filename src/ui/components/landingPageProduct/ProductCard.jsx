import { NavLink, useNavigate, useParams } from "react-router";
import { Button } from "../../../utils/Button";
import React from "react";
import { Share2, Star } from "lucide-react";
import { AddFavourite } from "../../../utils/AddFavourite";

export const ProductCard = React.memo(
  ({ product, isLoading, categoryName, subcategory }) => {
    const navigate = useNavigate();

    const handleShareProduct = () => {
      if (navigator.share) {
        navigator
          .share({
            title: product.name,
            text: `Check out this product: ${product.name}`,
            url: window.location.href,
          })
          .then(() => console.log("Product shared successfully"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        alert("Web Share API not supported on this browser.");
      }
    };

    return (
      <article
        className="w-fit rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:pb-[px]"
        // className="transition-all duration-300 ease-in-out hover:shadow-[1px_0_15px_-5px_rgba(0,0,0,0.3),-10px_0_15px_-5px_rgba(0,0,0,0.3)]"
        tabIndex={0}
        role="article"
        aria-label={`Product: ${product.name}`}
        style={{
          transform: "scale(1)",
          transformOrigin: "center",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.01)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-labelledby={`product-${product.id}-title`}
      >
        {/* Product Image Section */}
        <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl cursor-pointer">
          {/* Share Button */}
          <div className="absolute top-2 flex justify-between w-full px-2">
            <Button
              aria-label="Share this product"
              title="Share"
              className="  rounded-full bg-white p-2 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out focus:border-2 focus:border-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              onClick={handleShareProduct}
            >
              <Share2 className="fill-black" size="15px" />
              <span className="sr-only">Share this product</span>
            </Button>

            {product.discountPrice && (
              <p className="bg-[#FFF8CF] w-[51px] flex justify-center items-center rounded-[20px]">
                <span className="font-medium text-xs">
                  -{product?.discountPercentage || 0}%
                </span>
              </p>
            )}
          </div>

          {/* Product Image */}
          <div className="relative flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
            <img
              src={product?.image}
              alt={product?.name}
              loading="lazy"
              className="h-fit w-fit object-cover mt-10"
            />
          </div>
        </div>
        {/* Product Details Section */}
        <div className="grid grid-cols-1 space-y-2 text-[#222224] w-[146px] md:w-[218px] mt-2 px-2 group-hover:pb-2">
          {/* Product Name */}
          <p
            className="text-sm leading-[16.94px] min-h-12 cursor-pointer hover:underline focus:underline focus:outline-none"
            onClick={() => navigate(`/${product.id}/${product.slug}`)}
            tabIndex={0}
            role="link"
            aria-label={`View details for ${product.name}`}
          >
            {product.name}
          </p>

          {/* Product Price */}
          <div className="flex items-center flex-wrap md:space-x-2">
            <p className="font-semibold text-base">{product.price}</p>
            <p className="text-sm line-through text-[#96959F]">
              {product?.discountPrice}
            </p>
          </div>

          {/* Product Ratings */}
          <div className="flex items-center space-x-1 ">
            <Star fill="black" className="w-3" aria-hidden="true" />{" "}
            {/* Hide from screen readers */}
            <p>
              {product.ratings} {""} ({product.noOfProductSold})
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            {/* Add to Cart Button */}
            <NavLink to="product:id" aria-label="Add to cart">
              <div
                className="bg-[#FFDE11] h-10 w-10 rounded-full flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-black"
                tabIndex={0}
                role="button"
              >
                <img
                  src="/images/shopping-bag-add.svg"
                  alt="Add to shopping cart"
                  className="w-5"
                />
              </div>
            </NavLink>

            {/* Add to Favourite Button */}

            <AddFavourite product={product} />
          </div>
        </div>
      </article>
    );
  }
);
