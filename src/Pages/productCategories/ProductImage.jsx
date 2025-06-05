export const ProductImage = ({ image, alt, className }) => {
  return (
    <li
      className={`bg-[#F2F2F2] rounded-2xl flex justify-center items-center ${className}`}
    >
      <img src={image} alt={alt} className="w-[80%] h-[80%] object-cover" />
    </li>
  );
};
