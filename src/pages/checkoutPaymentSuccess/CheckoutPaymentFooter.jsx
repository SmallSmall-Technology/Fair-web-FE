import { Copyright } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CheckoutPaymentFooter = () => {
  return (
    <ul className="hidden md:flex flex-wrap gap-4">
      <li className="flex items-center text-xs">
        <span>
          <Copyright size={14} />
        </span>
        Smallsmall Technology 2025
      </li>
      <li className="text-xs">
        <a
          href="https://smallsmall.ng"
          target="_blank"
          rel="noopener noreferrer"
        >
          smallsmall.ng
        </a>
      </li>
      <li className="text-xs">
        <Link to="/terms-of-use">Terms of use</Link>
      </li>
      <li className="text-xs">
        <Link to="/privacy-policy">Refunds and returns</Link>
      </li>
    </ul>
  );
};
