// import { useQuery } from '@tanstack/react-query';
// import ProductCard from '../../../../utils/ProductCard';
// import { fetchFavouriteProducts } from '../../../../api/product-api';

// const Favorites = () => {
//   const {
//     data: favourites = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['favourites'],
//     queryFn: fetchFavouriteProducts,
//   });

//   return (
//     <section>
//       {isLoading && (
//         <p className="skeleton w-full h-[141px] font-inter flex justify-center items-center">
//           Loading Favourites...
//         </p>
//       )}

//       {!isLoading ||
//         (favourites.length === 0 && (
//           <p className="skeleton w-full h-[141px] font-inter flex justify-center items-center">
//             No Favourite product
//           </p>
//         ))}

//       {isError && (
//         <p className="skeleton w-full h-[141px] font-inter flex justify-center items-center">
//           {' '}
//           Failed to load Favourites
//         </p>
//       )}

//       {favourites.length > 0 && (
//         <>
//           <h1 className="font-semibold text-[23px] mb-3">Favourite products</h1>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:flex flex-wrap lg:space-x-2">
//             {favourites
//               .filter((product) => product.inStock === true)
//               .slice(0, 10)
//               .map((product) => (
//                 <ProductCard
//                   product={product.productDetails}
//                   key={product.id}
//                 />
//               ))}
//           </div>
//         </>
//       )}
//     </section>
//   );
// };

// export default Favorites;

import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../../../utils/ProductCard';
import { fetchFavouriteProducts } from '../../../../api/product-api';

const Favorites = () => {
  const {
    data: favourites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['favourites'],
    queryFn: fetchFavouriteProducts,
  });

  // Filter favourites to only in-stock products once
  const inStockFavourites = favourites.filter(
    (product) => product.inStock === true || product.inStock === 'true'
  );

  return (
    <section>
      <h1 className="font-semibold text-[23px] mb-3">Favourite products</h1>
      {isLoading && (
        <p className="skeleton w-full h-[141px] font-inter flex justify-center items-center">
          Loading Favourites...
        </p>
      )}

      {!isLoading && inStockFavourites.length === 0 && (
        <p className="skeleton w-full h-[141px] font-inter flex justify-center items-center">
          No Favourite product
        </p>
      )}

      {isError && (
        <p className="skeleton w-full h-[141px] font-inter flex justify-center items-center">
          Failed to load Favourites
        </p>
      )}

      {inStockFavourites.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:flex flex-wrap lg:space-x-2">
            {inStockFavourites.slice(0, 10).map((product) => (
              <ProductCard product={product.productDetails} key={product.id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
