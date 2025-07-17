import { Link } from 'react-router-dom';
import { Copyright } from 'lucide-react';

export const CartFooter = () => {
  return (
    <footer className="pb-10 mt-40 mx-6 lg:mx-[60px]">
      <ul className="flex flex-wrap gap-4">
        <li className="underline cursor-pointer  text-xs">
          <Link to="/about-us">About us</Link>
        </li>
        <li className="underline cursor-pointer text-xs">
          <Link to="/help-center">Help center</Link>
        </li>
        <li className="underline cursor-pointer text-xs">
          <Link to="/buyer-protection">Buyer protection</Link>
        </li>
        <li className="underline cursor-pointer text-xs">
          <Link to="/refunds-and-returns">Refunds and returns</Link>
        </li>
        <li className="underline cursor-pointer text-xs">
          <Link to="/contact-us">Contact us</Link>
        </li>
        <li className="underline cursor-pointer text-xs">
          <Link to="/buying-policy">Buying Policy</Link>
        </li>
      </ul>

      <hr className="mt-8 mb-6" />
      {/* desktop screen */}
      <ul className="hidden md:flex flex-wrap gap-4">
        <li className="flex items-center text-xs">
          <span>
            <Copyright size={14} />
          </span>
          Smallsmall Technology 2025
        </li>
        <li className="text-xs">
          <a
            href="https://smallsmall.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            smallsmall.com
          </a>
        </li>
        <li className="text-xs">
          <Link to="/privacy-policy">Privacy policy</Link>
        </li>
        <li className="text-xs">
          <Link to="/terms-of-use">Terms of use</Link>
        </li>
      </ul>

      {/* mobile screen */}
      <ul className="flex flex-wrap gap-4 md:hidden">
        <li className="text-xs">
          <Link to="/privacy-policy">Privacy policy</Link>
        </li>
        <li className="text-xs">
          <Link to="/terms-of-use">Terms of use</Link>
        </li>
        <li className="flex items-center text-xs">
          <span>
            <Copyright size={14} />
          </span>
          Smallsmall Technology 2025
        </li>
        <li className="text-xs">
          <a
            href="https://fairapp.ng"
            target="_blank"
            rel="noopener noreferrer"
          >
            smallsmall.com
          </a>
        </li>
      </ul>
    </footer>
  );
};
