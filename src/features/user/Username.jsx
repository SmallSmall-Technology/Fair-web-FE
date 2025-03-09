import { useSelector } from "react-redux";

const Username = () => {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;
  return <div>{username}</div>;
};

export default Username;
