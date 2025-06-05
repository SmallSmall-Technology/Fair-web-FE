import { StarRating } from './StarRating';

export const UsersReviews = ({ reviews }) => {
  const firstFiveReviews = reviews.slice(0, 4);

  return (
    <ul className="grid grid-cols-1">
      {firstFiveReviews.map((review, index) => (
        <UserReview key={index} review={review} />
      ))}
    </ul>
  );
};

export const UserReview = ({ review, rating, handleRating }) => {
  return (
    <>
      <li className="grid grid-cols-1">
        <div>
          <StarRating rating={rating} handleRating={handleRating} />
        </div>
        <p className="mt-2">{review?.comment}</p>
        <div className="flex space-x-3 mt-4">
          <p className="text-xs">{review?.name || 'Anonymous'}</p>
          <p className="text-xs">{new Date().toLocaleDateString()}</p>
        </div>
        <hr className="my-4" />
      </li>
    </>
  );
};
