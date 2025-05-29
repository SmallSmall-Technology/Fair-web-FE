export const CircularProgress = () => {
  return (
    <div className="relative w-[38px] h-[38px] md:w-[54px] md:h-[54px] border rounded-full p-[2px] md:p-1 border-black">
      <svg className="w-full h-full transform -rotate-40" viewBox="0 0 36 36">
        <path
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth="3.8"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-green-500"
          stroke="currentColor"
          strokeWidth="3.8"
          strokeDasharray=" 33.33, 100"
          fill="none"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-black text-sm font-normal">
        1/3
      </div>
    </div>
  );
};
