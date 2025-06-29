import { Link } from 'react-router-dom';
import { categories } from '../HomeLivingCategory';

export const Furniture = () => {
  return (
    <div
      className={`${categories[1].color} ${categories[1]?.width} rounded-xl lg:w-[30%] px-4 pt-10 md:pt-0 mb-4 flex  justify-center items-end lg:justify-around`}
    >
      <div className="pb-4 lg:mt-[-40px] lg:pl-">
        <h4 className="text-[24px] text-black font-bold">
          {categories[1].title}
        </h4>
        <Link
          to={categories[1].link}
          className="text-sm underline lg:mt- inline-block  text-black"
        >
          {categories[1].title && 'Shop now'}{' '}
        </Link>
      </div>
      <div
        className={` ${categories[1]?.width}  ${categories[1]?.height} lg:mb-0 flex justify-center mt-aut lg:justify-between`}
      >
        <img
          src={categories[1].image}
          alt={categories[1].title}
          className="object-cover max-w-full  lg:ml-auto flex justify-end mb-10"
          loading="lazy"
        />
      </div>
    </div>
  );
};
