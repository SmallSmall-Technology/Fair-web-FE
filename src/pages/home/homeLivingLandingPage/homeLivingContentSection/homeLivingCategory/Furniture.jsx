import { Link } from 'react-router-dom';
import { shopByHomeLivingCategories } from '../HomeLivingCategory';

export const Furniture = () => {
  return (
    <div
      className={`${shopByHomeLivingCategories[1].color} ${shopByHomeLivingCategories[1]?.width} lg:rounded-xl lg:w-[30%] px-4 pt-10 md:pt-0 mb-4 flex  justify-center items-end lg:justify-around`}
    >
      <div className="pb-4 lg:mt-[-40px] lg:pl-">
        <h4 className="text-[24px] text-black font-bold">
          {shopByHomeLivingCategories[1].title}
        </h4>
        <Link
          to={shopByHomeLivingCategories[1].link}
          className="text-sm underline lg:mt- inline-block  text-black"
        >
          {shopByHomeLivingCategories[1].title && 'Shop now'}{' '}
        </Link>
      </div>
      <div
        className={` ${shopByHomeLivingCategories[1]?.width}  ${shopByHomeLivingCategories[1]?.height} lg:mb-0 flex justify-center mt-aut lg:justify-between`}
      >
        <img
          src={shopByHomeLivingCategories[1].image}
          alt={shopByHomeLivingCategories[1].title}
          className="object-cover max-w-full  lg:ml-auto flex justify-end mb-10"
          loading="lazy"
        />
      </div>
    </div>
  );
};
