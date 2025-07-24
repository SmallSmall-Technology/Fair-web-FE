import { useState } from 'react';
import { Star } from './Star';

export const TotalRatings = ({ maxRating = 5, product }) => {
  const totalReviews = product.totalReviews;
  const [totalRatings, setTotalRatings] = useState(totalReviews);
  // console.log(product);

  const handleTotalRatings = () => {
    let rate = setTotalRatings((prevRating) => prevRating + rating);
    rate;
  };

  return (
    <div className="flex">
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
      {totalRatings.toFixed(1) || ''}
    </div>
  );
};
