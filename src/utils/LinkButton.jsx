import { Link } from 'react-router-dom';

function LinkButton({ children, link, className }) {
  return (
    <Link to={link} className={`w-full inline-block ${className}`}>
      {children}
    </Link>
  );
}

export default LinkButton;
