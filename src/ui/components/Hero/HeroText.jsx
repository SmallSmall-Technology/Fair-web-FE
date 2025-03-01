import { NavLink } from "react-router";

export const HeroText = () => {
  return (
    <section className="flex flex-col gap-4 justify-center items-center my-8 mx-4">
      <h1 className="font-bold text-4xl md:text-5xl mb-2 text-balance text-center">
        Shop today, Pay later
      </h1>
      <p className="font-light w-full md:w-[40%] text-center text-balance">
        Unlock a seamless shopping experience that puts you in control of your
        budget. Enjoy the freedom to spread your payments and make every
        purchase easier.
      </p>
      <div className="flex gap-2">
        <NavLink
          to=""
          className="group relative inline-flex items-center overflow-hidden rounded-full bg-[#FFDE11]  border-2 border-[#FFDE11] px-6 md:px-12 py-3 text-lg font-medium text-black hover:bg-gray-50 hover:text-black"
        >
          <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-[#FFDE11]"></span>

          <span className="relative transform duration-700 group-hover:-translate-x-1">
            Try it out
          </span>
        </NavLink>

        <NavLink
          to=""
          className="group relative inline-flex items-center overflow-hidden rounded-full border-2 border-white px-6 md:px-12 py-3 text-lg font-medium text-black hover:bg-gray-50 hover:text-black underline"
        >
          <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-[#FFDE11] opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
          <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-1 md:group-hover:-translate-x-2">
            <img src="/images/arrow-circle-right.svg" alt="arrow right icon" />
          </span>
          <span className="relative transform duration-700 group-hover:-translate-x-1 md:group-hover:-translate-x-3">
            Learn more
          </span>
        </NavLink>
      </div>
    </section>
  );
};
