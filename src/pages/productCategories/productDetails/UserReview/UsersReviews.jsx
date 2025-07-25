import { useQuery } from '@tanstack/react-query';
import { StarRating } from './StarRating';
import { fetchReviewsForProduct } from '../../../../api/product-api';
import { useParams } from 'react-router-dom';

export const UsersReviews = ({ reviews }) => {
  const { productID } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['review'],
    queryFn: () => fetchReviewsForProduct(productID),
  });

  console.log('Review:', reviews);

  const productReviews = data?.data?.reviews;

  return (
    <ul className="grid grid-cols-1">
      {isLoading && <UserReviewSkeleton />}
      {!isLoading && productReviews?.length < 1 && (
        <li className="text-center text-gray-500">No reviews yet.</li>
      )}
      {productReviews?.length > 0 &&
        productReviews?.map((review, index) => (
          <UserReview key={index} review={review} productID={productID} />
        ))}
    </ul>
  );
};

export const UserReviewSkeleton = () => {
  return (
    <li className="grid grid-cols-1 animate-pulse">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
        ))}
      </div>

      <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-1 h-4 bg-gray-200 rounded w-2/3"></div>

      <div className="flex space-x-2 mt-4">
        <div className="w-24 h-3 bg-gray-300 rounded" />
        <div className="w-16 h-3 bg-gray-200 rounded" />
      </div>

      <hr className="my-4" />
    </li>
  );
};

export const UserReview = ({ review, handleRating, productID }) => {
  console.log(review);
  if (review.productID !== productID) {
    return null;
  }
  return (
    <>
      <li className="grid grid-cols-1">
        <div>
          <StarRating rating={review?.rating} handleRating={handleRating} />
        </div>
        <p className="mt-2 font-dmsans">{review?.review}</p>
        <div className="flex space-x-3 mt-4">
          <p className="font-inter text-xs">
            {review?.name || 'Anonymous'},
            <span className="ml-1">{review.updatedAt}</span>
          </p>
        </div>
        <hr className="my-4" />
      </li>
    </>
  );
};
