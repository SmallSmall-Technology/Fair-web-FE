import { Button } from "./Button";
import { Heart } from "lucide-react";
import { useState } from "react";

export const AddFavourite = ({ product }) => {
  const [isFavourite, setIsFavourites] = useState(false);

  // handleToggleFavourite = () => {
  //   setIsFavourites(!isFavourite);
  // };

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
      // onClick={handleToggleFavourite()}
      aria-label={isFavourite ? "Remove from favourite" : "Add to favourite"}
      title={isFavourite ? "Remove from favourite" : "Add to favourite"}
      className="focus:outline-none focus:ring-2 focus:ring-black"
    >
      <Heart size={18} cursor="pointer" fill="red" aria-hidden="true" />
      <span className="sr-only">
        {isFavourite ? "Remove from favourite" : "Add to favourite"}
      </span>
    </Button>
  );
};
