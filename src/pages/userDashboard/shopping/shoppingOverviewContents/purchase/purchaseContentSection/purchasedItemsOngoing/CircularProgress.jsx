export const CircularProgress = ({ paid, totalCount }) => {
  const progress = totalCount > 0 ? (paid / totalCount) * 100 : 0;
  const dashArray = 100;
  const dashOffset = dashArray - progress;

  return (
    <div className="relative w-[38px] h-[38px] md:w-[54px] md:h-[54px] border rounded-full p-[2px] md:p-1 border-black">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        {/* Gray track - full circle */}
        <path
          stroke="currentColor"
          className="text-gray-300"
          strokeWidth="3.8"
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />

        {/* Green progress - partial circle */}
        <path
          stroke="currentColor"
          className="text-green-500"
          strokeWidth="3.8"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center text-black text-xs md:text-sm font-normal">
        {totalCount > 0 ? `${paid}/${totalCount}` : '0/0'}
      </div>
    </div>
  );
};
