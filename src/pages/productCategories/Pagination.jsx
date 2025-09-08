import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from 'lucide-react';

export const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex space-x-1 mt-8">
      <button
        className={`flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${page === 1 ? 'cursor-not-allowed bg-gray-100' : ''}`}
        aria-label="Go to first page"
        onClick={() => setPage(1)}
      >
        <ChevronsLeftIcon size={8} />
        <span>First</span>
      </button>

      {page > 1 && (
        <button
          className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Go to previous page"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          <ChevronLeftIcon size={8} />
          <span>Back</span>
        </button>
      )}

      <span
        className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 bg-gray-200 font-semibold"
        aria-current="page"
      >
        {page}
      </span>

      {page < totalPages && (
        <button
          className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Go to next page"
          onClick={() => setPage((p) => p + 1)}
        >
          <span>Next</span>
          <ChevronRightIcon size={8} />
        </button>
      )}

      <button
        className={`flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${page === totalPages ? 'cursor-not-allowed bg-gray-100' : ''} `}
        aria-label="Go to last page"
        onClick={() => setPage(totalPages)}
      >
        <span>Last</span>
        <ChevronsRightIcon size={8} />
      </button>
    </div>
  );
};
