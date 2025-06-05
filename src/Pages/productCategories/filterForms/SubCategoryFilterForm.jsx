import { CircleX } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { memo, useMemo } from 'react';

const SubCategoryFilterForm = ({
  categoryProducts,
  handleFilter,
  products,
}) => {
  const getUniqueOptions = (products, key) => {
    return [...new Set(products.map((product) => product[key]))];
  };

  const uniqueSizes = useMemo(
    () => getUniqueOptions(categoryProducts || products, 'Size'),
    [categoryProducts, products]
  );
  const uniqueBrands = useMemo(
    () => getUniqueOptions(categoryProducts || products, 'brand'),
    [categoryProducts, products]
  );
  const uniqueSales = useMemo(
    () => getUniqueOptions(categoryProducts || products, 'sales'),
    [categoryProducts, products]
  );

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: { size: '', brand: '', price: '', sales: '' },
  });

  const values = watch();
  const filterCount = Object.values(values).filter(Boolean).length;

  const onSubmit = (data) => {
    handleFilter(data);
  };

  const handleResetFilter = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <div className="flex-1 min-w-[120px]">
          <label htmlFor="size" className="sr-only">
            Size of product
          </label>
          <select
            id="size"
            {...register('size')}
            className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
          >
            <option value="" disabled>
              Size
            </option>
            {uniqueSizes.map((size, index) => (
              <option key={index} value={size}>
                {size || 'Size'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[120px]">
          <label htmlFor="brand" className="sr-only">
            Select Brand
          </label>
          <select
            id="brand"
            {...register('brand')}
            className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
          >
            <option value="" disabled>
              Brand
            </option>
            {uniqueBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[120px]">
          <label htmlFor="price" className="sr-only">
            Select Price Range
          </label>
          <select
            id="price"
            {...register('price')}
            className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
          >
            <option value="" disabled>
              Price
            </option>
            <option value="0-50000">₦0 - ₦50,000</option>
            <option value="50000-200000">₦50,000 - ₦200,000</option>
            <option value="200000-500000">₦200,000 - ₦500,000</option>
            <option value="500000+">₦500,000+</option>
          </select>
        </div>

        <div className="flex-1 min-w-[120px]">
          <label htmlFor="sales" className="sr-only">
            Sales
          </label>
          <select
            id="sales"
            {...register('sales')}
            className="w-full rounded-2xl border-2 bg-[#F7F7F7] text-xs p-2 px-3"
          >
            <option value="" disabled>
              Sales
            </option>
            {uniqueSales.map((sales, index) => (
              <option key={index} value={sales}>
                {sales || 'Sales'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <hr className="w-full my-4 md:w-0.5 md:h-8 bg-gray-300 mr-4" />

          <div
            className="hidden rounded-2xl border-2 bg-[#F7F7F7] text-xs md:flex items-center px-3 py-2"
            role="status"
            aria-live="polite"
          >
            <span>
              {filterCount === 0
                ? 'No filter(s) applied'
                : filterCount > 1
                  ? `${filterCount} filters applied`
                  : `${filterCount} filter applied`}
            </span>
            <button
              type="button"
              onClick={handleResetFilter}
              className="ml-2"
              title="Clear all filters"
              aria-label="Clear filters"
            >
              <CircleX
                size={12}
                fill="black"
                color="white"
                className="cursor-pointer"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex md:hidden">
        <div
          className="rounded-2xl border-2 bg-[#F7F7F7] text-xs flex items-center px-3 py-2"
          role="status"
          aria-live="polite"
        >
          <span>
            {filterCount === 0
              ? 'No filter(s) applied'
              : filterCount > 1
                ? `${filterCount} filters applied`
                : `${filterCount} filter applied`}
          </span>
          <button
            type="button"
            onClick={handleResetFilter}
            className="ml-2"
            title="Clear all filters"
            aria-label="Clear filters"
          >
            <CircleX
              size={12}
              fill="black"
              color="white"
              className="cursor-pointer"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(SubCategoryFilterForm);
