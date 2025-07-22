import { NavLink } from 'react-router-dom';

export const SingleCategorySubcategories = ({
  category,
  subcategory,
  isLoadingSubcategories,
}) => {
  return (
    <>
      {isLoadingSubcategories
        ? Array.from({ length: 5 }).map((_, i) => (
            <li
              key={i}
              className="flex flex-col items-center animate-pulse space-y-1"
            >
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
            </li>
          ))
        : subcategory.map((sub) => (
            <li
              key={sub.slug}
              className="font-calsans flex flex-col items-center hover:cursor-pointer transition-all duration-300 ease-in-out"
            >
              <NavLink
                to={`/${category}/${sub.slug}`}
                className={({ isActive }) =>
                  `text-sm font-medium text-nowrap px-2 py-1 transition-transform duration-300 ${
                    isActive ? 'border-b border-black scale-105' : ''
                  }`
                }
              >
                <span className="text-gray-700">{sub.name || 'No Name'}</span>
              </NavLink>
            </li>
          ))}
    </>
  );
};
