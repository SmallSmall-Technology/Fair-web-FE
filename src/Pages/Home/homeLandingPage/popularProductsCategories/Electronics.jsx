import { Link } from 'react-router-dom';
import { categories } from './PopularCategories';

export const Electronics = () => {
  return (
    <div
      className={`${categories[0].color} ${categories[0]?.width}  p-4 lg:rounded-xl  lg:flex items-start justify-between  pt-8 w-full px-11 lg:px-4`}
    >
      <div className="mb-8 lg:mb-0 lg:pl-2">
        <p className="lg:text-lg text-[#222224]">{categories[0].desc}</p>
        <h4 className="text-[28px] font-bold">{categories[0].title}</h4>
        <Link
          to={categories[0].link}
          className="text-sm text-black underline lg:mt-1 inline-block my-6"
        >
          {categories[0].title === 'Real estate' ? 'Rent now' : 'Shop now'}{' '}
          <span className="bg-black text-white rounded-[50%] p-[1px] px-[3px]">
            &rarr;
          </span>
        </Link>
      </div>
      <div
        className={` ${categories[0]?.width}  ${categories[0]?.height} mb-4 lg:mb-0 flex justify-center`}
      >
        <img
          src={categories[0].image}
          alt={categories[0].title}
          className="object-cover max-w-full max-h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};
