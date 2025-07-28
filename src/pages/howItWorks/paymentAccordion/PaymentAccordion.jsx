import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import InstallmentPlanCard from './InstallmentPlanCard';

const paymentData = [
  {
    title: 'Stretch Your Budget Further',
    content:
      'Pick an item with an instalment payment plan that suits your budget and lifestyle. Our instalment plans are designed to help you enjoy what you want, when you want it.',
    image: '/images/stretch-budget.svg',
  },
  {
    title: 'Direct debit',
    content: 'Automatically deducts payments from your bank account when due.',
    image: '/images/direct-debit.svg',
  },
  {
    title: 'Enjoy Now, Pay Later',
    content: 'Buy now and split your payment into manageable instalments.',
    image: '/images/pay-later.svg',
  },
  {
    title: 'Manage Your Payments',
    content: 'Track, update or reschedule your payments from your dashboard.',
    image: '/images/manage-payments.svg',
  },
];

export default function PaymentAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);
  function handleClick(index) {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }

  return (
    <section className="flex flex-col md:flex-row gap-8 md:px-20 md:my-10 p-6">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 relative flex justify-center">
        <img
          src={paymentData[activeIndex]?.image || paymentData[0]?.image}
          alt="Payment Illustration"
          className="rounded-xl"
        />
        {activeIndex === 0 && <InstallmentPlanCard />}
      </div>

      {/* Text + Accordion Section */}
      <div className="w-full lg:w-1/2 pt-20 px-3">
        {paymentData.map((item, index) => (
          <div key={index} className="border-b py-4">
            <button
              onClick={() => handleClick(index)}
              className="flex justify-between items-center w-full text-left font-semibold md:text-3xl"
            >
              {item.title}
              <span className="text-xl">
                {activeIndex === index ? <Minus /> : <Plus />}
              </span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{item.content}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
