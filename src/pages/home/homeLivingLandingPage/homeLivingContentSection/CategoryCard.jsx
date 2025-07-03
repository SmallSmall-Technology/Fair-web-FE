import { Link } from 'react-router-dom';

export const CategoryCard = ({
  category,
  width,
  height,
  padding = 'p-4',
  margin = 'mb-4',
  text,
}) => {
  if (!category) return null;

  const cardWidth = width || category.width || 'lg:w-[30%]';
  const cardHeight = height || category.height;

  return (
    <div
      className={`${category.color || ''} ${cardHeight} ${cardWidth} ${padding} ${margin} lg:rounded-xl flex flex-col justify-between pb-4 px-11 lg:px-4`}
    >
      <div className={`mb-4 lg:mb-0 flex justify-center lg:justify-star`}>
        <img
          src={category.image}
          alt={category.title}
          className={`object-cover max-w-full {category?.height} mt-7 lg:mt-3`}
          loading="lazy"
        />
      </div>
      <div className={`pb-2 lg:pb-0 lg:pl- ${category?.text}`}>
        <h4 className="text-[20px] lg:text-[24px] font-bold">
          {category.title}
        </h4>
        {category.title && (
          <Link
            to={category.link}
            className="text-sm underline lg:mt-1 inline-block "
          >
            Shop now
          </Link>
        )}
      </div>
    </div>
  );
};
