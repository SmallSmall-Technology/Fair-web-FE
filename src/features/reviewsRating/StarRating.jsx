import { Star } from './Star';

export const StarRating = ({ rating, onHandleRating }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => {
        return (
          <Star
            key={i}
            full={rating >= i + 1}
            onRate={() => onHandleRating(i + 1)}
          />
        );
      })}
      {rating.toFixed(1) || ''}
    </div>
  );
};
