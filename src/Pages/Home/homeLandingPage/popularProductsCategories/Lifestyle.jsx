import { Link } from 'react-router-dom';
import { categories } from './PopularCategories';

export const Lifestyle = () => {
  return (
    <div
      className={`${categories[0].color} ${categories[0]?.width}  p-4 rounded-xl  lg:grid items-start justify-between  pt-8 w-full`}
    >
      <div className="mb-4 lg:mb-0 lg:pl-2">
        <p className="lg:text-lg text-[#222224]">{categories[2].desc}</p>
        <h4 className="text-[28px] font-bold">{categories[2].title}</h4>
      </div>
      <div className="lg:flex justify-between lg:space-x-20 lg:pl-2">
        <Link
          to={categories[2].link}
          className="text-sm text-black underline lg:mt-1 inline-block my-6"
        >
          {categories[2].title === 'Real estate' ? 'Rent now' : 'Shop now'}{' '}
          <span className="bg-black text-white rounded-[50%] p-[1px] px-[3px]">
            &rarr;
          </span>
        </Link>
        <div
          className={` ${categories[2]?.width}  ${categories[2]?.height} lg:mb-0 flex justify-center`}
        >
          <img
            src={categories[2].image}
            alt={categories[2].title}
            className="object-cover max-w-full max-h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
