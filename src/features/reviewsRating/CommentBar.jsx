import React, { useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import { TotalRatings } from './TotalRatings';
import { CircleArrowUp } from 'lucide-react';
import { UsersReviews } from '../../pages/productCategories/productDetails/UserReview/UsersReviews';
import { UsersReviewsModal } from '../../pages/productCategories/productDetails/UserReview/UsersReviewsModal';

const CommentBar = () => {
  const [reviews, setReviews] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { comment: '', name: '' },
  });

  const onSubmit = (data) => {
    const reviewWithDefault = { ...data, name: data.name || 'Anonymous' };
    setReviews((prevReview) => [...prevReview, reviewWithDefault]);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-5">
          <label htmlFor="comment" className="sr-only">
            Drop a review for this product
          </label>
          <textarea
            id="comment"
            {...register('comment', { required: 'Comment is required' })}
            placeholder="Add your comment"
            className={`border rounded-[20px] pl-6 py-2 font-medium text-black w-full ${
              errors.comment ? 'border-red-500' : ''
            }`}
          />
          {errors.comment && (
            <p className="text-red-500 text-xs mt-1">
              {errors.comment.message}
            </p>
          )}
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <CircleArrowUp size={30} fill="#A6A6A6" color="white" />
          </button>
        </div>
      </form>
      <section className="grid grid-cols-1 gap-6">
        <div className="mb-8">
          <p>Reviews</p>
          <TotalRatings reviews={reviews} />
        </div>
        <UsersReviews reviews={reviews} />
        <UsersReviewsModal reviews={reviews} />
      </section>
    </>
  );
};

export default memo(CommentBar);
