import { Star } from './Star';
import { useState } from 'react';

export const StarRating = ({ maxRating = 5 }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
  };

  return (
    <div className="flex">
      {Array.from({ length: maxRating }, (_, i) => {
        return (
          <Star
            key={i}
            full={rating >= i + 1}
            onRate={() => handleRating(i + 1)}
          />
        );
      })}
      {rating.toFixed(1) || ''}
    </div>
  );
};
