import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { getOngoingOrders } from '../../../../features/order/orderSlice';

const CreditWallet = () => {
  return (
    <section className="mb-6 lg:w-1/2">
      <CreditWalletBalance />
    </section>
  );
};

export default CreditWallet;

const CreditWalletBalance = () => {
  const ongoingOrders = useSelector(getOngoingOrders);
  return (
    <section>
      <h1 className="lg:hidden font-semibold text-2xl mb-4">
        CreditWallet balance
      </h1>
      <h1 className="hidden md:block font-semibold text-2xl mb-4">
        Credit Wallet
      </h1>

      <article className="border rounded-[10px] py-8 px-6 w-full bg-[var(--yellow-primary)] grid gap-4">
        <div className="grid gap-2">
          <p>Available balance</p>
          <p className="flex items-center space-x-2 font-semibold text-3xl">
            N953.66{' '}
            <Link
              to="/user-dashboard/shopping-overview/credit-wallet"
              aria-label="see more"
            >
              <ChevronRight size={24} className="cursor-pointer" />
            </Link>
          </p>
        </div>
        {ongoingOrders && (
          <div className="grid gap-2">
            <p>Credit balance</p>
            <p className="flex items-center space-x-2 font-semibold text-3xl">
              N0.0{' '}
              <Link
                to="/user-dashboard/shopping-overview/credit-wallet"
                aria-label="see more"
              >
                <ChevronRight size={24} className="cursor-pointer" />
              </Link>
            </p>
          </div>
        )}
      </article>
    </section>
  );
};
