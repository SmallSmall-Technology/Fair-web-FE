import { Link } from "react-router";
import { WalletBalance } from "./Wallet";
import { RecentlyViewed } from "./RecentlyViewed";

export const Summary = () => {
  return (
    <section className="grid grid-cols-1 gap-6">
      <article>
        <h1 className="font-semibold text-2xl mb-3"> Purchases</h1>
        <div className="border rounded-[10px] pt-4 pb-8 px-5 w-full">
          <ul className="flex space-x-8">
            <li className="grid gap-2">
              <p className="text-[#737376]">Ongoing</p>
              <p className="flex items-center space-x-1">
                <span>
                  <img src="/images/time-half-past.svg" alt="clock" />
                </span>
                <span className="font-semibold text-3xl">3</span>
              </p>
            </li>

            <li className="grid gap-2 ">
              <p className="text-[#737376]">Completed</p>
              <p className="flex space-x-1 items-center">
                <span>
                  <img src="/images/export-box.svg" alt="export box" />
                </span>
                <span className="font-semibold text-3xl">5</span>
              </p>
            </li>

            <li className="grid gap-2">
              <p className="text-[#737376]">Cancelled</p>
              <p className="flex space-x-1 items-center">
                <span>
                  <img src="/images/export-box.svg" alt="export box" />
                </span>
                <span className="font-semibold text-3xl">0</span>
              </p>
            </li>
          </ul>
        </div>
      </article>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[38%_60%]">
        <WalletBalance />
        <div>
          <div className="flex justify-between items-baseline">
            <h1 className="font-semibold text-2xl mb-4"> Recently viewed</h1>
            <Link
              to="/user-dashboard/shopping-overview/recently-viewed"
              className="underline font-medium"
            >
              See all
            </Link>
          </div>
          <RecentlyViewed />
        </div>
      </div>
    </section>
  );
};
