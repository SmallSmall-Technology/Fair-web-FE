import { useNavigate } from 'react-router-dom';

// function PageNotFound() {
//   const navigate = useNavigate();
//   return (
//     <div>
//       Ooops!!! page not found{' '}
//       <button onClick={() => navigate(-1)}>&larr;go back home</button>
//     </div>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 px-4 text-center">
      <Link
        to="/"
        aria-label="Fair Home"
        // className="transition-transform focus:scale-105 focus:outline-none"
      >
        <img
          src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
          alt="Fair Logo"
          width={170}
          height={40}
          loading="eager"
          decoding="defer"
          // className="motion-safe:transition-transform"
        />
      </Link>
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
