import { useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import { TotalRatings } from './TotalRatings';
import { CircleArrowUp } from 'lucide-react';
import { UsersReviews } from '../../pages/productCategories/productDetails/UserReview/UsersReviews';
import ReviewModal from '../../pages/productCategories/productDetails/UserReview/ReviewModal';
import { useParams } from 'react-router-dom';

const CommentBar = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState(product.productID);
  const [reviews, setReviews] = useState([]);

  const { productID } = useParams();
  // console.log('Comment', productID);

  const handleModalOpen = () => {
    setProductId(product?.productID);
    setIsOpen(true);
  };

  return (
    <>
      <section>
        <div className="relative mb-5">
          <label htmlFor="comment" className="sr-only">
            Drop a review for this product
          </label>

          <input
            type="text"
            placeholder="Add your comment"
            className="border rounded-[20px] pl-6 py-2 font-medium text-black w-full"
          />

          <button
            onClick={handleModalOpen}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <CircleArrowUp size={30} fill="#A6A6A6" color="white" />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6">
        <div className="mb-8">
          <p className="font-inter font-semibold">Reviews</p>
          <TotalRatings product={product} />
        </div>
        <UsersReviews reviews={reviews} productId={productId} />
      </section>
      {isOpen === true && (
        <ReviewModal
          productId={productId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default memo(CommentBar);
