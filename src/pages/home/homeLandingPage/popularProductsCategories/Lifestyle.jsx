import { Link } from 'react-router-dom';
import { shopByPopularCategories } from './PopularCategories';

export const Lifestyle = () => {
  return (
    <div
      className={`${shopByPopularCategories[0].color} ${shopByPopularCategories[0]?.width}  p-4 lg:rounded-xl  lg:grid items-start justify-between  pt-8 w-full px-11 lg:px-4`}
    >
      <div className="mb-4 lg:mb-0 lg:pl-2">
        <p className="lg:text-lg text-[#222224]">
          {shopByPopularCategories[2].desc}
        </p>
        <h4 className="text-[28px] font-bold">
          {shopByPopularCategories[2].title}
        </h4>
      </div>
      <div className="lg:flex justify-between lg:space-x-20 lg:pl-2">
        <Link
          to={shopByPopularCategories[2].link}
          className="text-sm text-black underline lg:mt-1 inline-block my-6"
        >
          {shopByPopularCategories[2].title === 'Real estate'
            ? 'Rent now'
            : 'Shop now'}{' '}
          <span className="bg-black text-white rounded-[50%] p-[1px] px-[3px]">
            &rarr;
          </span>
        </Link>
        <div
          className={` ${shopByPopularCategories[2]?.width}  ${shopByPopularCategories[2]?.height} lg:mb-0 flex justify-center`}
        >
          <img
            src={shopByPopularCategories[2].image}
            alt={shopByPopularCategories[2].title}
            className="object-cover max-w-full max-h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
