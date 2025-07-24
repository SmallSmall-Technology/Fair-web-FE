import { useQuery } from '@tanstack/react-query';
import { StarRating } from './StarRating';
import { getProductReviews } from '../../../../api/product-api';
import { useParams } from 'react-router-dom';

export const UsersReviews = ({ productId }) => {
  // console.log('Product ID:', productId);
  const { data, isLoading } = useQuery({
    queryKey: ['review'],
    queryFn: () => getProductReviews(productId),
  });

  const productReviews = data?.data?.reviews;
  // console.log(productReviews);

  return (
    <ul className="grid grid-cols-1">
      {productReviews?.map((review, index) => (
        <UserReview key={index} review={review} />
      ))}
    </ul>
  );
};

export const UserReview = ({ review, handleRating }) => {
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
            <span className="ml-1">{new Date().toLocaleDateString()}</span>
          </p>
          {/* <p className="font-inter text-xs">
          </p> */}
        </div>
        <hr className="my-4" />
      </li>
    </>
  );
};
