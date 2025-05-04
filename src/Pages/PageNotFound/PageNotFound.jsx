import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div>
      Ooops!!! page not found{' '}
      <button onClick={() => navigate(-1)}>&larr;go back home</button>
    </div>
  );
}

export default PageNotFound;
