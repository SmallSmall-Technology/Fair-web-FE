import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { Share2, Star } from "lucide-react";
import { Button } from "../../utils/Button";
import { AddToCart } from "../cart/AddToCart";
import { AddFavourite } from "../favourite/AddFavourite";
import { getTotalCartQuantity, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/FormatCurrency";
import { handleShareProduct } from "./ShareProduct";

export const ProductCard = React.memo(({ product }) => {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const cart = useSelector((state) => state.cart.cart);
  console.log(formatCurrency(totalCartPrice));
  console.log(totalCartQuantity);
  console.log(cart);

  const {
    id,
    name,
    brand,
    category,
    subcategory,
    image,
    price,
    discountPrice,
    ratings,
    noOfProductSold,
    slug,
  } = product;

  return (
    <article
      className="w-fit rounded-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:pb-[px]"
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

      <Link to={`/${product.id}/${product.slug}`} className="block">
        <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl cursor-pointer">
          {/* Share Button */}
          <div className="absolute top-2 flex justify-between w-full px-2">
            <Button
              aria-label="Share this product"
              title="Share"
              className="rounded-full bg-white p-2 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out focus:border-2 focus:border-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              onClick={(e) => {
                e.stopPropagation();
                handleShareProduct();
              }}
            >
              <Share2 className="fill-black" size="15px" />
              <span className="sr-only">Share this product</span>
            </Button>

            {product.discountPrice && (
              <p className="bg-[#FFF8CF] w-[51px] flex justify-center items-center rounded-[20px]">
                <span className="font-medium text-xs">
                  -{product.discountPercentage || 0}%
                </span>
              </p>
            )}
          </div>

          {/* Product Image */}
          <div className="relative flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-fit w-fit object-cover mt-10"
            />
          </div>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 space-y-2 text-[#222224] w-[146px] md:w-[218px] mt-2 px-2 group-hover:pb-2">
        {/* Product Name */}
        <Link
          to={`/${product.id}/${product.slug}`}
          className="hover:underline focus:underline focus:outline-none"
        >
          <p
            className="text-sm leading-[16.94px] min-h-12 cursor-pointer"
            tabIndex={0}
            role="link"
            aria-label={`View details for ${product.name}`}
          >
            {product.name}
          </p>
        </Link>

        {/* Product Price */}
        <div className="flex items-center flex-wrap md:space-x-2">
          <p className="font-semibold text-base">
            {formatCurrency(product.price)}
          </p>

          <p className="text-sm line-through text-[#96959F]">
            {discountPrice ? `${formatCurrency(product.discountPrice)}` : ""}
          </p>
        </div>

        {/* Product Ratings */}
        <div className="flex items-center space-x-1">
          <Star fill="black" className="w-3" aria-hidden="true" />{" "}
          {/* Hide from screen readers */}
          <p>
            {product.ratings} {""} ({product.noOfProductSold})
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6">
          {/* Add to Cart Button */}
          <AddToCart product={product} />

          {/* Add to Favourite Button */}
          <div>
            <AddFavourite product={product} />
          </div>
        </div>
      </div>
    </article>
  );
});
