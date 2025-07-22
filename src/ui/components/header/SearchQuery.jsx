import debounce from 'just-debounce-it';
import { Search } from 'lucide-react';
import { useCallback, useMemo, memo } from 'react';
import { useForm } from 'react-hook-form';

const SearchQuery = () => {
  const initialValues = useMemo(() => ({ search: '' }), []);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  });

  const handleSearchQuery = useCallback(
    debounce((data) => {
      const searchTerm = data.search.trim().toLowerCase();
      reset();
    }, 300),
    [reset]
  );

  const onSubmit = (data) => {
    handleSearchQuery(data);
  };

  return (
    <div className="flex w-full lg:w-1/3">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full font-inter">
        <label htmlFor="search" className="sr-only">
          Search for products
        </label>
        <div className="relative flex items-center">
          <input
            type="text"
            id="search"
            aria-label="Search for products"
            {...register('search')}
            placeholder="Search for anything"
            className="rounded-md px-2 py-[10px] border text-sm w-full focus:ring-2 focus:ring-[#FFDE11] focus:border-transparent transition-all hover:border-[#FFDE11] motion-safe:duration-200 bg-[#ECEDF1]"
          />
          <button
            type="submit"
            id="search-button"
            aria-label="Submit search"
            className="absolute right-1 flex items-center py-2 px-2 bg-[var(--yellow-primary)] rounded-[10px] border-[#737376] hover:bg-[#FFD700] active:bg-[#FFC107] focus:ring-2 focus:ring-bg-[var(--yellow-primary)]  transition-all motion-safe:duration-200 hover:scale-105 active:scale-95"
          >
            <Search size={12} aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(SearchQuery);
