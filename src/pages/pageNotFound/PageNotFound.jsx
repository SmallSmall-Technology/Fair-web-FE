import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Logo from '../../ui/components/Logo';

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 px-4 text-center">
      <Logo width={200} height={40} />
      <h1 className="text-[120px] font-extrabold text-blue-500 drop-shadow-lg">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PageNotFound;
