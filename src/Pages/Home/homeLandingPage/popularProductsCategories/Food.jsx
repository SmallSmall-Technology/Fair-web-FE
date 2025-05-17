import { Link } from 'react-router-dom';
import { categories } from './PopularCategories';

export const Food = () => {
  return (
    <div
      className={`${categories[1].color} ${categories[1]?.width}  p-4 rounded-xl  lg:flex items-start justify-between pt-8 w-full `}
    >
      <div className=" lg:mb-0 lg:pl-2">
        <p className="lg:text-lg text-[#222224]">{categories[1].desc}</p>
        <h4 className="text-[28px] font-bold">{categories[1].title}</h4>
        <Link
          to={categories[1].link}
          className="text-sm text-black underline lg:mt-1 inline-block mt-6"
        >
          {categories[1].title === 'Real estate' ? 'Rent now' : 'Shop now'}{' '}
          <span className="bg-black text-white rounded-[50%] p-[1px] px-[3px]">
            &rarr;
          </span>
        </Link>
      </div>
      <div
        className={` ${categories[1]?.width}  ${categories[1]?.height} flex justify-center`}
      >
        <img
          src={categories[1].image}
          alt={categories[1].title}
          className="object-cover max-w-full max-h-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};
