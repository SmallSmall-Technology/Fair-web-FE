import { Link } from 'react-router-dom';

function TopArticleCards({ title }) {
  return (
    <div className="mt-5 mb-10">
      <h3 className="mb-3">Top articles on {title}</h3>
      <div className="flex gap-4 flex-wrap">
        {Array.from({ length: 5 }, (_, i) => (
          <div className="bg-gray-100 rounded-lg p-4  md:my-4 hover:underline shadow-sm w-60">
            <Link>Lorem ipsum dolor sit amet consectetur </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopArticleCards;
