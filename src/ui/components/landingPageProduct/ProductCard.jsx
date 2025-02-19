import { NavLink } from "react-router";
import React, { useEffect, useState } from "react";
import { Button } from "../../../utils/Button";
import { Share2, Star, Heart } from "lucide-react";

export const ProductCard = React.memo(({ product, isLoading }) => {
  // const [addToFavourite, setAddToFavourite] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

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

  const handleAddtoFavourite = () => {
    // setAddToFavourite((prev) => {
    //   const favouritesSet = new Set(prev.map((item) => item.id));

    //   if (favouritesSet.has(product.id)) {
    //     // Remove from favourites
    //     return prev.filter((item) => item.id !== product.id);
    //   } else {
    //     // Add to favourites
    //     return [...prev, product];
    //   }
    // });

    // Toggle favourite state
    setIsFavourite((prev) => !prev);
  };

  return (
    <>
      <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl">
        {isLoading ? (
          <div className="absolute top-2 left-2 rounded-full bg-gray-300 p-2 animate-pulse">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
          </div>
        ) : (
          <Button
            aria-label="Share this product"
            title="Share"
            className="absolute top-2 left-2 rounded-full bg-white p-2 cursor-pointer focus:border-2 focus:border-black hover:bg-white"
            onClick={handleShareProduct}
          >
            <Share2 className="fill-black" size="15px" />
            <span className="sr-only">Share this product</span>
          </Button>
        )}

        <div className="relative flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
          {isLoading ? (
            <div className="w-full h-full bg-gray-300 animate-pulse rounded-lg mt-10"></div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-fit w-fit object-cover mt-10"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 space-y-2 text-[#222224] w-[146px] md:w-[218px] mt-2">
        {isLoading ? (
          <div className="h-12 bg-gray-300 animate-pulse rounded-lg"></div>
        ) : (
          <p className="text-sm leading-[16.94px] h-12">{product.name}</p>
        )}

        <div className="flex items-center flex-wrap md:space-x-2">
          {isLoading ? (
            <>
              <div className="h-6 w-16 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="h-6 w-12 bg-gray-300 animate-pulse rounded-lg"></div>
            </>
          ) : (
            <>
              <p className="font-semibold text-base">{product.price}</p>
              <p className="text-sm line-through text-[#96959F]">
                {product.discountPrice}
              </p>
            </>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {isLoading ? (
            <div className="h-4 w-16 bg-gray-300 animate-pulse rounded-lg"></div>
          ) : (
            <>
              <Star fill="black" className="w-3" />
              <p>
                {product.ratings} {""} ({product.noOfProductSold})
              </p>
            </>
          )}
        </div>

        <div className="flex items-center space-x-6">
          {isLoading ? (
            <div className="h-10 w-10 bg-gray-300 animate-pulse rounded-full"></div>
          ) : (
            <NavLink to="product:id">
              <div className="bg-[#FFDE11] h-10 w-10 rounded-full flex justify-center">
                <img
                  src="/images/shopping-bag-add.svg"
                  alt="add to shopping cart"
                  className="w-5"
                />
              </div>
            </NavLink>
          )}

          {isLoading ? (
            <div className="h-6 w-6 bg-gray-300 animate-pulse rounded-full"></div>
          ) : (
            <Button
              aria-label={
                isFavourite ? "Remove from favourite" : "Add to favourite"
              }
              title={isFavourite ? "Remove from favourite" : "Add to favourite"}
              onClick={() => handleAddtoFavourite((prev) => [...prev, product])}
              // className="focus:outline-none focus:ring-2 focus:ring-red"
            >
              <Heart
                size={18}
                cursor="pointer"
                fill={isFavourite ? "red" : "white"}
              />
              <span className="sr-only">Add this product to Favourites</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
});
