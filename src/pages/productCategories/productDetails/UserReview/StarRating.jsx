import { useState } from 'react';

export const TotalRatings = ({ maxRating = 5, reviews }) => {
  const totalReviews = reviews.length;

  const [totalRatings, setTotalRatings] = useState(totalReviews);

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

export const StarRating = ({ maxRating = 5, rating, onRating }) => {
  const numericRating = Number(rating);
  return (
    <div
      className="flex items-center"
      role="radiogroup"
      aria-label="Star rating"
    >
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          full={rating >= i + 1}
          onRate={() => onRating(i + 1)}
          index={i + 1}
        />
      ))}
      <span className="ml-2">{numericRating?.toFixed(1)}</span>
      <span className="sr-only">
        Number {numericRating?.toFixed(1)} rate out of {maxRating}
      </span>
    </div>
  );
};

const Star = ({ onRate, full, index }) => {
  return (
    <button
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        onRate();
      }}
      aria-label={`Rate ${index} star${index > 1 ? 's' : ''}`}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          // fill="#FCE340"
          fill="#000"
          width={30}
          height={29}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#E5E5E5"
          width={30}
          height={29}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </button>
  );
};
