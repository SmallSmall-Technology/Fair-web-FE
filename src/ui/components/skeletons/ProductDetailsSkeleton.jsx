import SkeletonBox from './SkeletonBox';
import Header from '../header/Header';

const ProductDetailsSkeleton = ({ imageCount = 4 }) => (
  <>
    <Header />
    <div className="hidden xl:flex justify-end space-x-2 mb-3 mx-10 pt-10">
      <div className="flex items-center text-sm text-[#222224] cursor-pointer">
        <SkeletonBox width="80px" height="16px" />
        <span className="pl-1">
          <SkeletonBox width="24px" height="24px" />
        </span>
      </div>
      <div className="flex items-center text-sm text-[#222224] cursor-pointer">
        <SkeletonBox width="40px" height="16px" />
        <span className="pl-1">
          <SkeletonBox width="16px" height="16px" />
        </span>
      </div>
    </div>

    <div className="flex justify-between items-center  mx-10">
      <main className="w-full lg:w-full xl:w-[52%] mx-5 md:mx-0">
        <div className="flex justify-between items-center md:items-start gap-5 md:mb-20">
          <aside className="w-[100px] hidden md:grid">
            <ul className="hidden md:grid grid-cols-1 gap-2">
              {Array.from({ length: imageCount }).map((_, index) => (
                <SkeletonBox
                  key={index}
                  width="94px"
                  height="94px"
                  className="rounded"
                />
              ))}
            </ul>
          </aside>
          <main className="flex-1">
            <div className="hidden md:bg-[#F2F2F2] rounded-2xl w-full h-[363px] md:h-[589px] xl:w-[589px] md:flex justify-center items-center">
              <SkeletonBox width="100%" height="100%" className="rounded" />
            </div>

            <section className="relative flex justify-center mb-8 md:hidden">
              <div className="flex w-full md:hidden overflow-hidden h-[363px]">
                {Array.from({ length: imageCount }).map((_, index) => (
                  <SkeletonBox
                    key={index}
                    width="100%"
                    height="100%"
                    className="absolute h-full w-full"
                  />
                ))}
              </div>
              <div className="absolute bottom-2 flex justify-center space-x-4 bg-[#323232] w-fit p-1 rounded-xl">
                {Array.from({ length: imageCount }).map((_, index) => (
                  <SkeletonBox
                    key={index}
                    width="8px"
                    height="8px"
                    className="rounded-full"
                  />
                ))}
              </div>
            </section>
          </main>
        </div>

        <section className="hidden xl:grid mt-8">
          <SkeletonBox width="200px" height="24px" className="mb-4" />
          <SkeletonBox width="100%" height="60px" />
        </section>
      </main>

      <aside className="w-full xl:w-[45%] mx-5  mt-8">
        <div className="grid gap-4">
          <SkeletonBox width="100%" height="40px" className="rounded-lg" />
          <SkeletonBox width="100%" height="40px" className="rounded-lg" />
          <SkeletonBox width="100%" height="40px" className="rounded-lg mb-4" />
        </div>

        <SkeletonBox width="100%" height="400px" className="rounded-lg" />
      </aside>
    </div>

    <section className="mb-24 mx-5 ">
      <div className="mt-8 flex justify-between items-center mb-6">
        <SkeletonBox width="180px" height="24px" />
        <SkeletonBox width="80px" height="20px" />
      </div>
      <div className="grid grid-flow-col space-x-4 w-full overflow-x-scroll scrollbar-hide scroll-smooth">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <SkeletonBox
              key={index}
              width="218px"
              height="300px"
              className="rounded-2xl"
            />
          ))}
      </div>
    </section>

    <section className="hidden xl:block">
      <SkeletonBox width="250px" height="28px" />
      <SkeletonBox width="100px" height="1rem" className="mt-4 mb-20" />
      <div className="flex justify-between">
        <button className="text-[#DB1C5E] text-[13px] underline">
          <SkeletonBox width="100px" height="20px" />
        </button>
        <button className="text-[13px] underline">
          <SkeletonBox width="100px" height="20px" />
        </button>
      </div>
    </section>
  </>
);

export default ProductDetailsSkeleton;
