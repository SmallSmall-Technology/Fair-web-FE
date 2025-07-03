// import { Link } from 'react-router-dom';
// import { categories } from '../HomeLivingCategory';

// export const BedBath = () => {
//   return (
//     <div
//       className={`${categories[4].color} ${categories[4]?.width}  p-4 rounded-xl  lg:w-[30%] h-[300px] mb-4`}
//     >
//       <div
//         className={` ${categories[4]?.width}  ${categories[4]?.height} mb-4 lg:mb-0 flex justify-center lg:justify-start`}
//       >
//         <img
//           src={categories[4].image}
//           alt={categories[4].title}
//           className="object-cover max-w-full max-h-full mt-7 lg:mt-3"
//           loading="lazy"
//         />
//       </div>
//       <div className="mb-8 lg:mb-0 lg:pl-4">
//         <h4 className="text-[24px] text-black font-bold">
//           {categories[4].title}
//         </h4>
//         <Link
//           to={categories[4].link}
//           className="text-sm underline lg:mt-1 inline-block  text-black"
//         >
//           {categories[4].title && 'Shop now'}{' '}
//         </Link>
//       </div>
//     </div>
//   );
// };

import { CategoryCard } from '../CategoryCard';
import { categories } from '../HomeLivingCategory';

export const BedBath = () => {
  return <CategoryCard category={categories[4]} padding="px-4 py-4" />;
};
