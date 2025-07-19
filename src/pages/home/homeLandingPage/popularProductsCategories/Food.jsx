import { Link } from 'react-router-dom';
import { shopByPopularCategories } from './PopularCategories';

export const Food = () => {
  return (
    <div
      className={`${shopByPopularCategories[1].color} ${shopByPopularCategories[1]?.width}  p-4 lg:rounded-xl  lg:flex items-start justify-between pt-8 w-full px-11 lg:px-4`}
    >
      <div className=" lg:mb-0 lg:pl-2">
        <p className="lg:text-lg text-[#222224]">
          {shopByPopularCategories[1].desc}
        </p>
        <h4 className="text-[28px] font-bold">
          {shopByPopularCategories[1].title}
        </h4>
        <Link
          to={shopByPopularCategories[1].link}
          className="text-sm text-black underline lg:mt-1 inline-block mt-6"
        >
          {shopByPopularCategories[1].title === 'Real estate'
            ? 'Rent now'
            : 'Shop now'}{' '}
          <span className="bg-black text-white rounded-[50%] p-[1px] px-[3px]">
            &rarr;
          </span>
        </Link>
      </div>
      <div
        className={` ${shopByPopularCategories[1]?.width}  ${shopByPopularCategories[1]?.height} flex justify-center`}
      >
        <img
          src={shopByPopularCategories[1].image}
          alt={shopByPopularCategories[1].title}
          className="object-cover max-w-full max-h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};
