import { Link } from 'react-router-dom';
import { categories } from './PopularCategories';

export const RealEstate = () => {
  return (
    <div
      className={`${categories[3].color} ${categories[3]?.width} pb-0 lg:rounded-xl  flex flex-col-reverse lg:flex lg:flex-row place-items-start justify-between p-4 pt-8 lg:pt-0 lg:px-14 px-11 w-full`}
    >
      <div
        className={` ${categories[3]?.width}  ${categories[3]?.height} mb-4 lg:mb-0 mx-auto lg:mx-0`}
      >
        <img
          src={categories[3].image}
          alt={categories[3].title}
          className="object-cover max-w-full max-h-full"
          loading="lazy"
        />
      </div>
      <div className="mb-8 lg:mb-0 lg:pt-9">
        <p className="lg:text-lg text-[#222224]">{categories[3].desc}</p>
        <h4 className="text-[28px] font-bold">{categories[3].title}</h4>
        <Link
          to={categories[3].link}
          className="text-sm text-black underline lg:mt-1 inline-block lg:my-6"
        >
          {categories[3].title === 'Real estate' ? 'Rent now' : 'Shop now'}{' '}
          <span className="bg-black text-white rounded-[50%] p-[1px] px-[3px]">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};
