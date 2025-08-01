import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../utils/Button';

export const CartHeader = () => {
  return (
    <header className="fixed bg-white w-full lg:flex lg:justify-between items-center pt-4 px-6 py-2 lg:px-[76p] z-50 lg:border-b-2">
      <div className="flex items-center space-x-4">
        <img
          src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
          alt="Smallsmall Logo"
          width={120}
          height={40}
          loading="eager"
          className="motion-safe:transition-transform"
        />
        <h1 className="font-semibold text-[25px] hidden lg:block">Checkout</h1>
      </div>
      <div className="mx-auto">
        <h1 className="font-semibold text-[25px] flex justify-center lg:hidden">
          Checkout
        </h1>
      </div>

      <div className="hidden lg:block">
        <CancelPurchase />
      </div>
    </header>
  );
};

export const CancelPurchase = () => {
  return (
    <div className="bg-[#ECEDF1] rounded-lg overflow-clip">
      <Link to="/cart-items">
        <Button className="flex space-x-1 items-center hover:shadow-lg p-2  border border-[#ECEDF1]">
          <X color="#EF4237" />
          <span className="font-medium text-sm">Cancel purchase</span>{' '}
        </Button>
      </Link>
    </div>
  );
};
