import { Button } from '../../../utils/Button';
import { BuyAGiftCard } from './BuyAGiftCard';

const GetApp = () => {
  return (
    <section className="grid grid-cols-1 mx-6 md:mx-[76px] mb-28">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0 items-center justify-between bg-[#F2F2F2] rounded-2xl mt-14 ">
        <div className="grid gap-4 lg:gap-3 lg:pl-12 text-center lg:text-start mx-auto lg:mx-0">
          <h1 className="items-center lg:items-start text-[23px] font-semibold pt-8 lg:pt-0">
            Get the app
          </h1>{' '}
          <p className="max-w-[289px] lg:min-w-[468px] mx-auto lg:mx-0 mb-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore e
          </p>
          <div className="flex gap-4 justify-center lg:justify-start">
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
        </div>
        <div className="">
          <div className="hidden lg:block">
            <img
              src="images/get-the-app-image-desktop.svg"
              alt="An image showing a phone and the payment plan"
              className="w-full object-cover "
            />
          </div>
          <div className="block lg:hidden">
            <img
              src="images/get-the-mobile-app.svg"
              alt="An image showing a phone and the payment plan"
              className="w-full object-cover "
            />
          </div>
        </div>
      </div>
      <div>
        <BuyAGiftCard />
      </div>
    </section>
  );
};

export default GetApp;
