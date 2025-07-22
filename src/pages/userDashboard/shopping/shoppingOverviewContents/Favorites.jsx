import { useSelector } from 'react-redux';
import { getFavourites } from '../../../../features/favourite/favouriteSlice';
import ProductCard from '../../../../utils/ProductCard';

const Favorites = () => {
  const favourites = useSelector(getFavourites);
  return (
    <section>
      <div className="flex mx-auto w-full">
        {favourites <= 0 && (
          <div className="bg-[#F6F6F6] w-full h-[141px] flex items-center justify-center rounded-[6px]">
            <p className="font-medium">No Favourite product</p>
          </div>
        )}
      </div>

      {!favourites.length !== 0 && (
        <>
          <h1 className="font-semibold text-[23px] mb-3">
            Favourites products
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:flex flex-wrap lg:space-x-2">
            {favourites.slice(0, 10).map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;

// const SingleFavouriteProduct = ({ favourite, onRemoveItem }) => {
//   return (
//     <li className="flex items-center justify-between lg:w-[60%] border rounded-[10px] py-3 px-2 text-balance">
//       <Link to={`/user-dashboard/${favourite.id}/${favourite.slug}`}>
//         <div className="flex items-center space-x-2">
//           <div className="h-24 min-w-24 max-w-24">
//             <img
//               src={favourite.image}
//               alt={favourite.name}
//               className="h-full w-full rounded-lg"
//             />
//           </div>
//           <div>
//             <p className="mb-4">{favourite.name}</p>
//             <p>{favourite.price}</p>
//           </div>
//         </div>
//       </Link>
//       <button>
//         <Trash2
//           role="button"
//           size={20}
//           className="mb-4 text-red-600 cursor-pointer hover:shadow-lg hover:scale-110 hover:ease-in-out"
//           onClick={() => onRemoveItem(favourite)}
//         />
//         {/* <p className="">Jan 13, 2025</p> */}
//       </button>
//     </li>
//   );
// };
