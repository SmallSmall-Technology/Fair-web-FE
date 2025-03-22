import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFavourite,
  getFavourites,
  removeItemFromFavourite,
} from "../../../../features/favourite/favouriteSlice";
import { YellowButton } from "../../../../utils/Button";

export const Favorites = () => {
  const favourites = useSelector(getFavourites);
  const dispatch = useDispatch();

  const handleRemoveFromFavorite = (id) => {
    dispatch(removeItemFromFavourite(id));
  };

  const handleClearFavourites = () => {
    dispatch(clearFavourite());
  };
  return (
    <section>
      <div className="flex ml-auto w-fit">
        {favourites.length === 0 ? (
          ""
        ) : (
          <YellowButton onClick={handleClearFavourites}>
            {" "}
            Clear all
          </YellowButton>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-4 lg:overflow-y-auto lg:h-80">
        {favourites.map((favourite, id) => (
          <article key={id}>
            <SingleFavouriteProduct
              favourite={favourite}
              onRemoveItem={handleRemoveFromFavorite}
            />
          </article>
        ))}
      </ul>
    </section>
  );
};

const SingleFavouriteProduct = ({ favourite, onRemoveItem }) => {
  return (
    <li className="flex items-center justify-between lg:w-[60%] border rounded-[10px] py-3 px-2 text-balance">
      <div className="flex items-center space-x-2">
        <div className="h-24 min-w-24 max-w-24">
          <img
            src={favourite.image}
            alt={favourite.name}
            className="h-full w-full rounded-lg"
          />
        </div>
        <div>
          <p className="mb-4">{favourite.name}</p>
          <p>{favourite.price}</p>
        </div>
      </div>
      <div>
        <Trash2
          size={20}
          className="mb-4 text-red-600 cursor-pointer hover:shadow-lg hover:scale-110 hover:ease-in-out"
          onClick={() => onRemoveItem(favourite)}
        />
        {/* <p className="">Jan 13, 2025</p> */}
      </div>
    </li>
  );
};
