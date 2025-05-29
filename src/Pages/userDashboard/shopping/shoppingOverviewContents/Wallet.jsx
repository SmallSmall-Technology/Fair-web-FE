import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Wallet = () => {
  return (
    <section className="mb-6 lg:w-1/2">
      <WalletBalance />
    </section>
  );
};

export default Wallet;

const WalletBalance = () => {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4"> Wallet balance</h1>
      <article className="border rounded-[10px] py-6 pb- px-6 w-full bg-[#FFDE11] grid gap-4">
        <div className="grid gap-2">
          <p>Available balance</p>
          <p className="flex items-center space-x-2 font-semibold text-3xl">
            N953.66{' '}
            <Link
              to="/user-dashboard/shopping-overview/wallet"
              aria-label="see more"
            >
              <ChevronRight size={24} className="cursor-pointer" />
            </Link>
          </p>
        </div>
        <div className="grid gap-2">
          <p>Credit balance</p>
          <p className="flex items-center space-x-2 font-semibold text-3xl">
            N0.0{' '}
            <Link
              to="/user-dashboard/shopping-overview/wallet"
              aria-label="see more"
            >
              <ChevronRight size={24} className="cursor-pointer" />
            </Link>
          </p>
        </div>
      </article>
    </section>
  );
};
