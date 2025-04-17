import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TotalRatings } from './TotalRatings';
import { CircleArrowUp } from 'lucide-react';
import { UsersReviews } from '../../Pages/productCategories/productDetails/UsersReviews';
import { UsersReviewsModal } from '../../Pages/productCategories/productDetails/UsersReviewsModal';

export const CommentBar = React.memo(() => {
  const [reviews, setReviews] = useState([]);

  const handleSubmitComment = (values, { resetForm }) => {
    // e.preventDefault();
    if (values) {
      const reviewWithDefault = { ...values, name: values.name || 'Anonymous' };
      setReviews((prevReview) => [...prevReview, reviewWithDefault]);
      resetForm();
    }
  };

  return (
    <>
      <Formik
        initialValues={{ comment: '', name: '' }}
        onSubmit={handleSubmitComment}
        onReset={''}
      >
        {(formik) => (
          <Form>
            <div className="relative mb-5">
              <label htmlFor="comment" className="sr-only">
                Drop a review for this product
              </label>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Add your comment"
                className="border rounded-[20px] pl-6 py-2 font-medium text-black w-full"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <CircleArrowUp size={30} fill="#A6A6A6" color="white" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
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
});
