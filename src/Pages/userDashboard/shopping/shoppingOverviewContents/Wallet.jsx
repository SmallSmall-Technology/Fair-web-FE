import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Wallet = () => {
  return (
    <section>
      <article className="border rounded-[10px] h-44 bg-[F6F6F6]"></article>
      <WalletBalance />
    </section>
  );
};

export const WalletBalance = () => {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4"> Wallet balance</h1>
      <article className="border rounded-[10px] pt-4 pb-24 px-5 w-full bg-[#FFDE11]">
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
      </article>
    </section>
  );
};
