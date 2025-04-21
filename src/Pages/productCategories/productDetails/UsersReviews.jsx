import { useState } from 'react';
import { StarRating } from './StarRating';
import { UsersReviewsModal } from './UsersReviewsModal';

export const UsersReviews = ({ reviews }) => {
  const firstFiveReviews = reviews.slice(0, 5);

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
      <li className="grid grid-cols-1 gap-4">
        <div>
          <StarRating rating={rating} handleRating={handleRating} />
        </div>
        <p>{review?.comment}</p>
        <div className="flex space-x-3">
          <p className="text-xs">{review?.name || 'Anonymous'}</p>
          <p className="text-xs">{new Date().toLocaleDateString()}</p>
        </div>
        <hr className="my-4" />
      </li>
    </>
  );
};
