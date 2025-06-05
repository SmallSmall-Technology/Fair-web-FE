const CreditSectionData = [
  {
    title: 'Up to N2m interest free credit',
    text: "We won't leave you empty. Every kobo spent on SmallSmall unlocks a new creditline for your next shopping",
  },
  {
    title: 'Build your credit history and rating',
    text: 'Unlock a brighter future for yourself where your credit rating counts and all your needs are sorted',
  },
  {
    title: 'Financial planning AI assistant',
    text: 'Use Pasture AI to create your budget, plan your spending, and prioritize your needs.',
  },
  {
    title: 'Financial planning AI assistant',
    text: 'Use Pasture AI to create your budget, plan your spending, and prioritize your needs.',
  },
];

export default function CreditSection() {
  return (
    <section className="px-4 mx-auto mt-6">
      <h3 className="text-[28px] lg:text-[40px] font-bold lg:mb-6 lg:text-center">
        Credit that's Sustainable and Rewarding
      </h3>
      <div className="hidden lg:flex mb-4 rounded-xl items-center justify-center mx-auto w-[1109px] h-[376px]">
        <img
          src="/images/one-happy-young-african-american-man-sitting-on-hi(3).svg"
          alt="one-happy-young-african-american-man-sitting"
          className=" object-contain h-full w-full"
          loading="lazy"
        />
      </div>
      <div className="lg:hidden mb-4 rounded-xl flex items-center justify-center mx-auto w-[344p] h-[330px]">
        <img
          src="/images/mobile-one-happy-young-african-american-man-sitting-on-hi(3) (2).svg"
          alt="one-happy-young-african-american-man-sitting"
          className=" object-contain w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="grid md:grid-cols-4 gap-4  mx-auto lg:w-[1109px]">
        {CreditSectionData.map((item, index) => (
          <div
            key={index}
            className="bg-[#F5F5F7] p-4 rounded-lg shadow-sm text-sm border"
          >
            <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
            <p className="text-[#222224]">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
