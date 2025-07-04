const ProductCardSkeleton = () => {
  return (
    <article>
      <div className="relative bg-[#F2F2F2] w-[146px] h-[146px] md:w-[218px] md:h-[218px] rounded-2xl">
        <div className="absolute top-2 flex justify-between w-full px-2">
          <div className="rounded-full bg-gray-200 w-8 h-8 animate-pulse" />
          <div className="bg-gray-200 w-[51px] h-6 rounded-[20px] animate-pulse" />
        </div>
        <div className="flex justify-center items-center mx-auto w-[80px] h-[99px] md:w-[136px] md:h-[169px]">
          <div className="w-full h-3/4 bg-gray-200 rounded animate-pulse mt-10" />
        </div>
      </div>
      <div className="grid grid-cols-1 space-y-2 w-[146px] md:w-[218px] mt-2 px-2">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="flex flex-col space-y-2">
          <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-6">
          <div className="h-10 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
