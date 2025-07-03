const CheckoutPaymentSkeleton = () => {
  return (
    <section className="min-h-screen bg-[#f9f9f9] py-8 px-4 flex justify-center">
      <div className="bg-white w-full max-w-[510px] p-6 shadow border rounded-md">
        <div className="w-24 h-6 bg-gray-300 animate-pulse rounded mb-8" />

        <div className="space-y-2">
          <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full mb-4" />
          <div className="h-5 w-3/5 bg-gray-300 animate-pulse rounded" />
          <div className="h-4 w-4/5 bg-gray-300 animate-pulse rounded" />
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="flex justify-between mb-6">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
          </div>
          <div className="space-y-4">
            <div className="h-4 w-32 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-28 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-20 bg-gray-300 animate-pulse rounded" />
          </div>
        </div>

        <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded mb-6" />

        <hr className="my-6 border-gray-300" />

        <div className="space-y-3 mb-6">
          <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-full bg-gray-300 animate-pulse rounded"
            />
          ))}
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-300 animate-pulse rounded" />
          <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded" />
          <div className="flex items-center space-x-2 mt-6">
            <div className="h-4 w-32 bg-gray-300 animate-pulse rounded" />
            <div className="h-4 w-4 bg-gray-300 animate-pulse rounded-full" />
          </div>
        </div>

        <div className="mt-10 hidden md:flex flex-wrap gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-3 w-40 bg-gray-300 animate-pulse rounded"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CheckoutPaymentSkeleton;
