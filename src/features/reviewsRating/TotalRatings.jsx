import { useState } from 'react';
import { Star } from './Star';

export const TotalRatings = ({ maxRating = 5, product, reviews }) => {
  const totalReviews = product.totalReviews || reviews.length || 0;

  const averageRating =
    totalReviews > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        totalReviews
      : 0;

  const [totalRatings, setTotalRatings] = useState(averageRating);

  const handleTotalRatings = () => {
    let rate = setTotalRatings((prevRating) => prevRating + rating);
    rate;
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxRating }, (_, i) => {
        return (
          <Star
            key={i}
            full={totalRatings >= i + 1}
            value={totalRatings}
            onChange={() => handleTotalRatings()}
          />
        );
      })}
      <span className="font-[#A6A6A6] text-[#A6A6A6]">|</span>
      {totalReviews > 0 ? (
        <span className="ml-2 font-inter text-sm text-gray-600">
          ({totalReviews || ''})
        </span>
      ) : null}
    </div>
  );
};
