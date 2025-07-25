import { NavLink } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';

const LandingHeader = () => {
  const { categories, isLoading } = useCategories();

  const sortedCategories = categories?.slice().sort((a, b) => a.id - b.id);

  return (
    <div className="overflow-x-auto flex justify-center">
      <nav className="font-calsans flex gap-4 px-4 py-2 whitespace-nowrap text-sm w-fit">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-5 w-20 bg-gray-200 rounded animate-pulse"
              />
            ))
          : sortedCategories?.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/${cat.slug}`}
                className={({ isActive }) => {
                  const baseClasses = 'hover:text-red-500';
                  const activeClasses = isActive
                    ? 'font-semibold underline'
                    : '';
                  const salesClass =
                    cat.slug.toLowerCase() === 'sales-offers'
                      ? 'text-[#DB1C5E]'
                      : '';

                  return `${baseClasses} ${activeClasses} ${salesClass}`;
                }}
              >
                {cat.name}
              </NavLink>
            ))}
      </nav>
    </div>
  );
};

export default LandingHeader;
