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
    return (
      <p className="skeleton p-36 h-[141px] font-inter flex justify-center items-center">
        Loading Favourites...
      </p>
    );
  }

  if (!isLoading && favourites.length === 0) {
    return (
      <p className="skeleton p-36 h-[141px] font-inter flex justify-center items-center">
        No Favourite product
      </p>
    );
  }

  if (isError) {
    return (
      <p className="skeleton p-36 h-[141px] font-inter flex justify-center items-center">
        {' '}
        Failed to load Favourites
      </p>
    );
  }

  return (
    <section>
      {favourites.length > 0 && (
        <>
          <h1 className="font-semibold text-[23px] mb-3">Favourite products</h1>
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
