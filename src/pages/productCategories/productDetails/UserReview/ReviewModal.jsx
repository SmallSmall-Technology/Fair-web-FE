import { useForm } from 'react-hook-form';
import { StarRating } from './StarRating';
import { useMutation } from '@tanstack/react-query';
import { addReviewforProduct } from '../../../../api/product-api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReviewModal = ({ onClose }) => {
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

  const data = { productID, rating, review: watch('review') };
  console.log('Data to submit:', data);
  const mutation = useMutation({
    mutationFn: addReviewforProduct,
    onSuccess: (data) => {
      toast.success('Review submitted successfully', {
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      }),
        onClose();
    },
    onError: (error) => {
      toast.error('Error submitting review', {
        className: 'bg-red-500 text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
    },
  });

  if (!productID) {
    console.error('No productID found!');
    return;
  }

  const onSubmit = (data) => {
    mutation.mutate(data);
    console.log('Submitted data:', { ...data, productID: productID });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg relative py-6">
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-xl font-bold text-gray-600"
          >
            &times;
          </button>

          <h2 className="font-inter text-xl font-bold mb-4 flex items-center gap-2">
            Add review <span>🗨️</span>
          </h2>
        </div>

        <hr className="my-4 h-[6px] bg-[#F6F6F6]" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          {/* Comment */}
          <div>
            <label className="font-inter block mb-1 text-sm">Add Comment</label>
            <textarea
              {...register('review', { required: 'Comment is required' })}
              placeholder="enter comment"
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
          <div>
            <label className="font-inter block mb-1 text-sm">Rate item</label>
            <StarRating
              rating={rating}
              setRating={handleRatingClick}
              interactive={true}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1">Rating is required</p>
            )}
          </div>

          <hr className="my-3" />

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:underline"
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
