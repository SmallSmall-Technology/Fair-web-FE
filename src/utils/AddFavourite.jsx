import { useState } from "react";
import { Button } from "./Button";
import { Heart } from "lucide-react";

export const AddFavourite = ({ product }) => {
  const [favourites, setFavourites] = useState([]);

  const handleFavourite = () => {
    // console.log("click", product);

    if (product) {
      setFavourites((newProduct) => [...newProduct, product]);
    }

    console.log("click", favourites);
  };
  //   const handleSubmitComment = (values, { resetForm }) => {
  //     if (values) {
  //       const reviewWithDefault = { ...values, name: values.name || "Anonymous" };
  //       setReviews((prevReview) => [...prevReview, reviewWithDefault]);
  //       resetForm();
  //     }
  //   };
  return (
    // <Button
    //   aria-label={isFavourite ? "Remove from favourite" : "Add to favourite"}
    //   title={isFavourite ? "Remove from favourite" : "Add to favourite"}
    //   className="focus:outline-none focus:ring-2 focus:ring-black"
    //   onClick={() => handleFavourite(product)}
    // >
    //   <Heart
    //     size={18}
    //     cursor="pointer"
    //     fill={isFavourite ? "red" : "white"}
    //     aria-hidden="true"
    //   />
    //   <span className="sr-only">
    //     {isFavourite ? "Remove from favourite" : "Add to favourite"}
    //   </span>
    // </Button>
    <Button
      // aria-label={isFavourite ? "Remove from favourite" : "Add to favourite"}
      // title={isFavourite ? "Remove from favourite" : "Add to favourite"}
      className="focus:outline-none focus:ring-2 focus:ring-black"
      // onClick={() => handleFavourite(product)}
      onClick={handleFavourite}
    >
      <Heart size={18} cursor="pointer" fill="red" aria-hidden="true" />
      <span className="sr-only">
        {/* {isFavourite ? "Remove from favourite" : "Add to favourite"} */}
      </span>
    </Button>
  );
};
