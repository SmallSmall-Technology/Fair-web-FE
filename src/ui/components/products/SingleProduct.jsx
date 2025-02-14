import { Share2, Star, Heart } from "lucide-react";
import { Button } from "../../../utils/Button";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";

export const SingleProduct = ({ product }) => {
  //   const [addToFavourite, setAddToFavourite] = useState([]);
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

  //   const handleAddtoFavourite = () => {
  //     setAddToFavourite((prev) =>
  //       isFavourite
  //         ? prev.filter((item) => item.id !== product.id)
  //         : [...prev, product]
  //     );
  //     setIsFavourite(!isFavourite);
  //   };

  //   useEffect(() => {
  //     console.log("Favourites:", addToFavourite);
  //   }, [addToFavourite]);

  return (
    <>
      <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl">
        <Button
          aria-label="share product"
          className="absolute top-2 left-2 rounded-full bg-white p-2 cursor-pointer focus:border-2 focus:border-black hover:bg-white"
          onClick={handleShareProduct}
        >
          <Share2 className="fill-black" size="15px" />
        </Button>

        <div className="relative flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
          <img
            src={product.image}
            alt={product.name}
            className="h-fit w-fit object-cover mt-10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 space-y-2 text-[#222224] w-[146px] md:w-[218px] mt-2">
        <p className="text-sm leading-[16.94px] h-12">{product.name}</p>
        <div className="flex items-center flex-wrap md:space-x-2">
          <p className="font-semibold text-base">{product.price}</p>
          <p className="text-sm line-through text-[#96959F]">
            {product.discountPrice}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <Star fill="black" className="w-3" />
          <p>
            {product.ratings} {""} ({product.noOfProductSold})
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <NavLink to="product:id">
            <div className="bg-[#FFDE11] h-10 w-10 rounded-full flex justify-center">
              <img
                src="/images/shopping-bag-add.svg"
                alt="add to shopping cart"
                className="w-5"
              />
            </div>
          </NavLink>

          <Button aria-label="Add to favourite">
            <Heart
              size={18}
              cursor="pointer"
              // onClick={handleAddtoFavourite}
              fill={isFavourite ? "red" : "white"}
            />
          </Button>
        </div>
      </div>
    </>
  );
};
