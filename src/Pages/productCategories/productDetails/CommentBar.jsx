import { Formik, Form, Field } from "formik";
import { CircleArrowUp } from "lucide-react";
import { useState } from "react";
import { UsersReviews } from "./UsersReviews";
import { StarRating } from "./StarRating";

export const CommentBar = () => {
  const [reviews, setReviews] = useState([]);

  const handleSubmitComment = (values, { resetForm }) => {
    if (values) {
      const reviewWithDefault = { ...values, name: values.name || "Anonymous" };
      setReviews((prevReview) => [...prevReview, reviewWithDefault]);
      resetForm();
    }
  };

  return (
    <>
      <Formik
        initialValues={{ comment: "", name: "" }}
        // validationSchema={validationSchema}
        onSubmit={handleSubmitComment}
        onReset={""}
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
        <div>
          <p>Reviews</p>
          <StarRating />
        </div>
        <UsersReviews reviews={reviews} />
      </section>
    </>
  );
};
