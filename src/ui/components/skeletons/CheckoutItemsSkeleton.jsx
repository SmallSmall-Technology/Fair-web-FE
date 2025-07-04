import { CartHeader } from '../../../pages/checkoutItems/CartHeader';

const CheckoutItemsSkeleton = () => {
  return (
    <main className="grid">
      <CartHeader />
      <hr className="mt-2 mb-8 hidden lg:block" />

      <section className="grid lg:grid-cols-[60%_40%] lg:px-[76px] pt-24">
        <main className="w-full h-screen pt-8 lg:block lg:px-8">
          <section className="lg:hidden">
            <div className="bg-gray-300 animate-pulse h-24 w-full rounded-md"></div>
          </section>

          <div className="lg:hidden border border-t-2 border-[#E5E5E5] w-full h-0 my-4"></div>

          <div className="px-8 pt-8">
            <h2 className="mt-7 mb-3 font-medium text-[21px] lg:hidden bg-gray-300 animate-pulse rounded-md w-full h-4"></h2>
            <h2 className="mt-7 mb-3 font-medium text-[21px] hidden lg:block bg-gray-300 animate-pulse rounded-md w-full h-4"></h2>

            {[...Array(2)].map((_, index) => (
              <article className="mb-6" key={index}>
                <p className="bg-gray-300 animate-pulse h-4 w-3/4 rounded mb-2"></p>
                <p className="bg-gray-300 animate-pulse h-4 w-1/2 rounded"></p>
              </article>
            ))}
          </div>

          <section className="mt-8 hidden lg:block px-8">
            <div className="grid font-medium mb-4">
              <h2 className="text-[21px] bg-gray-300 animate-pulse rounded-md w-full h-4"></h2>
              <p className="text-[#96959F] bg-gray-300 animate-pulse rounded-md w-full h-4 mt-2"></p>
            </div>
            <div className="bg-gray-300 animate-pulse h-24 w-full rounded-md"></div>
          </section>
        </main>

        <aside className="border-l-2 pt-8 lg:bg-[#F2F2F2] lg:pr-[12px] h-screen">
          <p className="hidden lg:block font-semibold pl-8 pt-6 bg-gray-300 animate-pulse rounded-md w-full h-4"></p>
          <div className="hidden lg:block">
            <div className="bg-gray-300 animate-pulse h-24 w-full rounded-md mt-4"></div>
          </div>

          <div className="lg:hidden border border-t-2 border-[#E5E5E5] w-full h-0 my-4"></div>
          <section className="lg:hidden">
            <div className="bg-gray-300 animate-pulse h-20 w-full rounded-md mb-4"></div>
          </section>

          <div className="lg:hidden border border-t-2 border-[#E5E5E5] w-full h-0 my-4"></div>
          <div className="bg-gray-300 animate-pulse h-28 w-full rounded-md"></div>
        </aside>
      </section>
    </main>
  );
};

export default CheckoutItemsSkeleton;
