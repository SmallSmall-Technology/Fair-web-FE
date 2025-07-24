// export const ProductImage = ({ children, className }) => {
//   return (
//     <li
//       className={`bg-[#F2F2F2] rounded-2xl flex justify-center items-center ${className}`}
//     >
//       <img src={image} alt={alt} className="w-[80%] h-[80%] object-cover" />
//       {children}
//     </li>
//   );
// };

export const ProductImage = ({ children }) => {
  return (
    <div className="bg-[#F2F2F2] rounded-2xl flex justify-center items-center w-[80px] h-[80px]">
      {children}
    </div>
  );
};

export default ProductImage;
