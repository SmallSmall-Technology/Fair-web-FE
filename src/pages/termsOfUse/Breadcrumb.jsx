import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Breadcrumb({ routes = [] }) {
  return (
    <nav className="text-sm text-gray-500 my-[3em]" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {routes.map((route, index) => {
          const isLast = index === routes.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}
              {isLast ? (
                <span className="text-gray-700 font-medium">{route.name}</span>
              ) : (
                <Link
                  to={route.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {route.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
