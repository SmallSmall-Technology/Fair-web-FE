import { CartFooter } from '../../../pages/cartItems/CartFooter';
import Header from '../header/Header';
import SkeletonBox from './SkeletonBox';

const CartItemsSkeleton = () => {
  return (
    <>
      <Header />
      <main className="my-5 pt-36 lg:pt-28">
        <div className="mx-6 lg:mx-[60px] 2xl:mx-[150px]">
          <SkeletonBox className="h-10 w-40 hidden lg:flex" />
          <SkeletonBox className="h-10 w-48 flex lg:hidden" />
        </div>

        <hr className="lg:hidden my-6" />

        <div className="lg:hidden mx-6 lg:mx-[60px] 2xl:mx-[150px]">
          <SkeletonBox className="h-12 w-full rounded-full" />
          <div className="flex gap-2 mt-6">
            <SkeletonBox className="h-6 w-24" />
            <SkeletonBox className="h-6 w-16" />
          </div>
        </div>

        <hr className="lg:hidden mt-6 mb-4" />

        <section className="mx-6 lg:mx-[60px] 2xl:mx-[150px]">
          <div className="grid grid-cols-1 w-full lg:grid-cols-[60%_36%] gap-6 justify-between mt-6">
            <article className="md:border-[1px] pb-4 md:border-[#E5E5E5] rounded-[10px] w-full h-fit">
              <div className="md:p-4">
                <div className="flex justify-between mb-3 items-center">
                  <div className="flex space-x-2 items-center mb-1 2xl:px-10">
                    <SkeletonBox className="w-6 h-6 rounded-full" />
                    <SkeletonBox className="w-16 h-4" />
                  </div>

                  <SkeletonBox className="w-24 h-[22px] rounded-2xl" />
                </div>

                <div className="grid md:grid-flow-col items-center justify-between 2xl:px-10">
                  <div className="flex items-start gap-4">
                    <SkeletonBox className="w-28 h-28 rounded-md" />

                    <div className="flex flex-col gap-2">
                      <SkeletonBox className="w-40 h-4" />
                      <SkeletonBox className="w-24 h-4" />
                      <SkeletonBox className="w-28 h-6 mt-4 md:hidden" />
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-end gap-3">
                    <SkeletonBox className="w-24 h-6" />
                    <SkeletonBox className="w-28 h-4" />
                    <SkeletonBox className="w-16 h-4" />

                    <div className="flex space-x-2 mt-4">
                      <SkeletonBox className="w-20 h-4" />
                      <SkeletonBox className="w-4 h-4" />
                      <SkeletonBox className="w-6 h-6 rounded-full" />
                    </div>

                    <SkeletonBox className="w-36 h-4" />
                  </div>
                </div>
              </div>

              <div className="hidden md:flex items-center mt-4">
                <hr className="flex-grow border-[#E5E5E5]" />
                <SkeletonBox className="px-6 py-2 rounded-[20px] w-32 h-6" />
                <hr className="flex-grow border-[#E5E5E5]" />
              </div>

              <div className="mt-4 flex flex-col gap-2 px-4">
                <SkeletonBox className="w-full h-4" />
                <SkeletonBox className="w-full h-4" />
                <SkeletonBox className="w-3/4 h-4" />
              </div>

              <div className="flex justify-between mt-4 md:hidden px-4">
                <SkeletonBox className="w-32 h-10" />
                <div className="flex space-x-2 items-center">
                  <SkeletonBox className="w-6 h-6 rounded-full" />
                  <SkeletonBox className="w-6 h-6 rounded-full" />
                </div>
              </div>
            </article>

            <aside className="flex flex-col gap-6">
              <div className="p-4 border rounded-md shadow-sm">
                <SkeletonBox className="h-6 w-32 mb-2" />
                <SkeletonBox className="h-10 w-full rounded-md mb-2" />
                <SkeletonBox className="h-4 w-1/2" />
              </div>

              <div className="p-4 border rounded-md shadow-sm">
                <SkeletonBox className="h-6 w-32 mb-2" />
                <SkeletonBox className="h-10 w-full rounded-md" />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <div className="mx-6 lg:mx-[60px] pb-10 mt-40">
        <CartFooter />
      </div>
    </>
  );
};

export default CartItemsSkeleton;
