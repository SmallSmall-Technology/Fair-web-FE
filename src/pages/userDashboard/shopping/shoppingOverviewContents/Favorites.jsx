import ProductCard from '../../../../utils/ProductCard';
import { useQuery } from '@tanstack/react-query';
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

  if (isLoading) {
    return <p>Loading favourites...</p>;
  }

  if (isError) {
    return <p>Failed to load favourites.</p>;
  }

  return (
    <section>
      <div className="flex mx-auto w-full">
        {favourites.length === 0 && (
          <div className="bg-[#F6F6F6] w-full h-[141px] flex items-center justify-center rounded-[6px]">
            <p className="font-medium">No Favourite product</p>
          </div>
        )}
      </div>

      {favourites.length > 0 && (
        <>
          <h1 className="font-semibold text-[23px] mb-3">
            Favourite products ({favourites.length})
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:flex flex-wrap lg:space-x-2">
            {favourites.slice(0, 10).map((product, id) => (
              <ProductCard product={product.productDetails} key={product.id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Favorites;
