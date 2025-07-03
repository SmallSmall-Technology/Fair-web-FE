import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from 'lucide-react';

export const Pagination = () => {
  return (
    <div className="flex space-x-1 mt-8">
      <button
        className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to first page"
      >
        <ChevronsLeftIcon size={8} />
        <span>First</span>
      </button>

      <button
        className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to previous page"
      >
        <ChevronLeftIcon size={8} />
        <span>Back</span>
      </button>

      <span
        className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 
                   bg-gray-200 font-semibold"
        aria-current="page"
      >
        1
      </span>

      <button
        className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to next page"
      >
        <span>Next</span>
        <ChevronRightIcon size={8} />
      </button>

      <button
        className="flex space-x-1 items-center text-xs text-[#313131] border rounded-[4px] border-[#E9E9E9] px-2 py-1 
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to last page"
      >
        <span>Last</span>
        <ChevronsRightIcon size={8} />
      </button>
    </div>
  );
};
