 ';

const SkeletonBox = ({ className = '' }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} />
);

const LandingPageSkeleton = () => {
  const categories = Array(8).fill(null);

  return (
    <div className="p-6 xl:px-20">
      <SkeletonBox className="w-full h-40 rounded-xl mb-6" />

      <div className="mb-6 space-y-3">
        <SkeletonBox className="w-2/3 h-6" />
        <div className="flex space-x-4">
          <SkeletonBox className="w-20 h-8 rounded-full" />
          <SkeletonBox className="w-24 h-8 rounded-full" />
        </div>
      </div>

      <div className="mb-4 space-y-2">
        <SkeletonBox className="w-48 h-6" />
        <SkeletonBox className="w-32 h-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((_, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-4 space-y-3 shadow-sm"
          >
            <SkeletonBox className="w-full h-32 rounded-md" />
            <SkeletonBox className="w-1/2 h-4" />
            <SkeletonBox className="w-1/3 h-3" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPageSkeleton;
