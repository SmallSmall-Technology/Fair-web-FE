import { Link } from 'react-router-dom';

function HorizontalScrollBar({ items }) {
  return (
    <div className="overflow-x-auto md:overflow-x-visible md:px-40 my-10 md:my-28">
      <div className="inline-flex bg-[#FFDE11] md:rounded-full px-6 py-3 whitespace-nowrap space-x-6 min-w-full md:justify-center">
        {items.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="text-black font-semibold whitespace-nowrap focus:outline-none"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HorizontalScrollBar;
