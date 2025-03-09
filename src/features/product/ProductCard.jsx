import React from "react";
import { Share2, Star } from "lucide-react";
import { Button } from "../../utils/Button";
import { Link } from "react-router";
import { AddFavourite } from "../../utils/AddFavourite";
import { useDispatch } from "react-redux";
import {
  addItem,
  getTotalCartQuantity,
  getTotalCartPrice,
} from "../cart/cartSlice";
import { useSelector } from "react-redux";

import {
  addItemToFavourite,
  removeItemFromFavourite,
} from "../favourite/favouriteSlice";
import { formatCurrency } from "../../utils/FormatCurrency";

export const ProductCard = React.memo(({ product }) => {
  const favourite = useSelector((state) => state.favourite.favourite);
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  // console.log(formatCurrency(totalCartPrice));
  // console.log(totalCartQuantity);

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
  const dispatch = useDispatch();
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

  const handleAddToCart = () => {
    const newItem = {
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
      quantity: 1,
      totalPrice: price,
    };

    dispatch(addItem(newItem));
  };

  const handleAddToFavourite = () => {
    const newItem = {
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
      quantity: 1,
      totalPrice: price * 1,
    };
    const isFavourite = favourite.find((item) => item.id === newItem.id);
    if (isFavourite) {
      dispatch(removeItemFromFavourite(newItem));
    } else {
      dispatch(addItemToFavourite(newItem));
    }
  };

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
          <div
            className="bg-[#FFDE11] h-10 w-10 rounded-full flex justify-center focus:outline-none focus:ring-2 focus:ring-black"
            tabIndex={0}
            aria-label="Add to cart"
            role="button"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              handleAddToCart();
            }}
          >
            <img
              src="/images/shopping-bag-add.svg"
              alt="Add to shopping cart"
              className="w-5"
            />
          </div>

          {/* Add to Favourite Button */}
          <div
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              handleAddToFavourite();
            }}
          >
            <AddFavourite product={product} />
          </div>
        </div>
      </div>
    </article>
  );
});
