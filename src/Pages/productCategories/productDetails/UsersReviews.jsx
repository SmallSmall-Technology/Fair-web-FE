export const UsersReviews = ({ reviews }) => {
  return (
    <ul className="grid grid-cols-1">
      {reviews.map((review, index) => (
        <UserReview key={index} review={review} />
      ))}
    </ul>
  );
};
const UserReview = ({ review }) => {
  return (
    <>
      <li className="grid grid-cols-1 gap-4">
        <div></div>
        <p>{review?.comment}</p>
        <div className="flex space-x-3">
          <p className="text-xs">{review?.name || "Anonymous"}</p>
          <p className="text-xs">{new Date().toLocaleDateString()}</p>
        </div>
        <hr className="my-4" />
      </li>
    </>
  );
};
