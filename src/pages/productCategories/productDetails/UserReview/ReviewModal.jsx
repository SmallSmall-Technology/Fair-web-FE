import { useForm } from 'react-hook-form';
import { StarRating } from './StarRating';
import { useMutation } from '@tanstack/react-query';
import { addReviewforProduct } from '../../../../api/product-api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReviewModal = ({ onClose, review, setReview }) => {
  const { productID } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const rating = watch('rating', 0);

  const handleRatingClick = (value) => {
    setValue('rating', value);
  };

  const mutation = useMutation({
    mutationKey: ['addReview', productID],

    mutationFn: (data) => addReviewforProduct(data),

    onMutate: (variables) => {},

    onSuccess: (review) => {
      toast.success('Review submitted successfully', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      queryClient.setQueryData(['reviews', productID], (old = []) => [
        review,
        ...old,
      ]);
      onClose();
      setReview('');
    },

    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || 'Something went wrong';
      onClose();
      setReview('');
      toast.error(errorMessage, {
        className: 'bg-red-500 text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    },
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    const reviewData = { ...data, productID };
    mutation.mutate(reviewData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative ">
        <div className="p-4 lg:px-8 lg:pt-5">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-xl font-bold text-gray-600"
          >
            &times;
          </button>

          <h2 className="font-inter text-xl font-medium  flex items-center gap-2">
            Add review <span>🗨️</span>
          </h2>
        </div>

        <div className="w-full h-[6px] bg-[#F6F6F6]"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
          {/* Comment */}
          <div className="px-4 lg:px-8">
            <label className="font-inter block mb-2 text-sm">Add Comment</label>
            <textarea
              {...register('review', {
                required: 'Comment is required',
                validate: (value) => {
                  const letterCount = value.replace(/[^a-zA-Z]/g, '').length;
                  return (
                    letterCount >= 10 || 'Comment must be at least 10 letters'
                  );
                },
              })}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Enter comment"
              className="w-full p-3 border border-[#B0B0B0] rounded-md outline-none resize-none"
              rows="4"
            />
            {errors.review && (
              <p className="text-red-500 text-sm mt-1">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div className="px-4 lg:px-8">
            <label className="font-inter block mb-1 text-sm">Rate item</label>
            <StarRating
              rating={rating}
              onRating={handleRatingClick}
              interactive={true}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">Rating is required</p>
            )}
          </div>

          <hr className="my-3" />

          {/* Buttons */}
          <div className="font-inter font-medium flex justify-between items-center px-4 lg:px-8">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              // disabled={!watch('review') || !watch('rating')}
              disabled={mutation.isLoading}
              aria-disabled={mutation.isLoading}
              className="bg-[#FFDE11] text-black font-medium px-6 py-2 rounded-[5px] hover:bg-yellow-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
