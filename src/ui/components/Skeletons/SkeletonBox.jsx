const SkeletonBox = ({ width = '100%', height = '1rem', className = '' }) => (
  <p
    className={`bg-gray-200 animate-pulse rounded ${className}`}
    style={{ width, height }}
  ></p>
);

export default SkeletonBox;
