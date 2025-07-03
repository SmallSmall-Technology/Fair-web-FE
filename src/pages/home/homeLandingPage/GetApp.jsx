import { Button } from '../../../utils/Button';

const GetApp = () => {
  return (
    <section className="grid grid-cols-1 lg:mx-[257px] mb-28 bg-[#FFDE11] rounded-[10px] mx-4 ">
      <div className="grid grid-cols-1 gap-14 lg:gap-6 lg:flex items-center justify-between px-10 lg:pt-4">
        <div className="grid gap-4 lg:gap-3  text-center lg:text-start">
          <h1 className="items-center lg:items-start text-[23px] font-semibold pt-8 lg:pt-0">
            Get the app
          </h1>{' '}
          <p className="max-w-[289px] lg:min-w-[468p] mx-auto lg:mx-0 mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore e
          </p>
          <div className="hidden lg:flex gap-4 justify-center lg:justify-start">
            <Button>
              <img
                role="button"
                src="/images/google-store.svg"
                alt="A logo incsribed with Get it on Google play"
                className="w-[103px] lg:w-[186px]"
              />
            </Button>
            <Button>
              <img
                role="button"
                src="/images/app-store.svg"
                alt="A logo incsribed with Get it on Apple store"
                className="w-[103px] lg:w-[186px]"
              />
            </Button>
          </div>
          <div className="flex lg:hidden gap-4 justify-center lg:justify-start">
            <Button>
              <img
                role="button"
                src="/images/google-store-mobile.svg"
                alt="A logo incsribed with Get it on Google play"
                className="w-[103px] lg:w-[186px]"
              />
            </Button>
            <Button>
              <img
                role="button"
                src="/images/app-store-mobile.svg"
                alt="A logo incsribed with Get it on Apple store"
                className="w-[103px] lg:w-[186px]"
              />
            </Button>
          </div>
        </div>
        <div className="">
          <div className="hidden lg:block lg:h-[276px]">
            <img
              src="/images/iphone-14-pro.svg"
              alt="An image showing a phone and the payment plan"
              className="w-full object- h-full "
            />
          </div>
          <div className="block lg:hidden lg:h-[276px]">
            <img
              src="/images/iphone-14-pro.svg"
              alt="An image showing a phone and the payment plan"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
