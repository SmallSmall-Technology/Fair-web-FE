const features = [
  {
    icon: '/images/split.svg',
    text: 'Split your payment',
  },
  {
    icon: '/images/fee.svg',
    text: 'No interest rate/hidden fees',
  },
  {
    icon: '/images/calendar-update.svg',
    text: 'Flexible plans',
  },
  {
    icon: '/images/delivery-truck.svg',
    text: 'Receive immediately',
  },
];

export default function FeaturesBar() {
  return (
    <div className="flex flex-wrap justify-start gap-4 px-4 py-4 lg:bg-[#F5F5F7] w-full lg:w-fit lg:mx-auto rounded-[10px]">
      {features?.map(({ icon: Icon, text }, i) => (
        <div key={i} className="flex items-center gap-2 px-4 py- text-sm ">
          <img
            src={Icon}
            alt="icon"
            className="bg-[#F5F5F7] lg:bg-white p-1 rounded-lg"
            loading="lazy"
          />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
