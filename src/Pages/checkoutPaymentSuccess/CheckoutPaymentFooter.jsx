import { Copyright } from "lucide-react";
import { Link } from "react-router";

export const CheckoutPaymentFooter = () => {
  return (
    <ul className="hidden md:flex flex-wrap gap-4">
      <li className="flex items-center text-xs">
        <span>
          <Copyright size={14} />
        </span>
        Fair by Smallsmall Technology 2025
      </li>
      <li className="text-xs">
        <a href="https://fairapp.ng" target="_blank" rel="noopener noreferrer">
          fairapp.ng
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
