export const BuyAGiftCard = () => {
  return (
    <section className="relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-0 items-center justify-between bg-[#FFDE11] rounded-2xl mt-8 pb-48 lg:pb-0 mb-12">
      <div className="grid gap-4 lg:gap-3 lg:pl-12 text-center lg:text-start mx-auto lg:mx-0">
        <h1 className="items-center lg:items-start text-[23px] font-semibold pt-8 lg:pt-0">
          Buy a gift card
        </h1>{' '}
        <p className="max-w-[289px] lg:min-w-[468px] mx-auto lg:mx-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore e
        </p>
      </div>

      <div className="relative">
        <div className="hidden lg:block">
          <img
            src="images/desktop-gift-card.svg"
            alt="An imaage showing a phone and the payment plan"
            className="my-4 object-cover "
          />
        </div>
        <div className="absolute top- lg:hidden flex justify-center w-full">
          <img
            src="images/gift-card.svg"
            alt="An imaage showing a phone and the payment plan"
            className="mx-auto"
          />
        </div>
      </div>
    </section>
  );
};
