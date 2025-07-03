import { Link } from 'react-router-dom';
import { categories } from './ConsumerGoodsCategory';

export const Fashion = () => {
  return (
    <div
      className={`${categories[2].color} ${categories[2]?.width}  px-4 rounded-xl  lg:w-[40%] mb-4`}
    >
      <div
        className={` ${categories[2]?.width}  ${categories[2]?.height} lg:mb-0 flex justify-center lg:justify-around`}
      >
        <img
          src={categories[2].image}
          alt={categories[2].title}
          className="object-cover max-w-full  lg:ml-auto"
          loading="lazy"
        />
      </div>
      <div className="lg:mt-[-40px] lg:pl-4">
        <h4 className="text-[24px] text-black font-bold">
          {categories[2].title}
        </h4>
        <Link
          to={categories[2].link}
          className="text-sm underline lg:mt-1 inline-block  text-black pb-4 md:pb-0"
        >
          {categories[2].title && 'Shop now'}{' '}
        </Link>
      </div>
    </div>
  );
};
