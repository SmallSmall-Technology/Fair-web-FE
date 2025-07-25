import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const faqData = [
  {
    title: 'What is Smallsmall?',
    content:
      'Smallsmall is a platform that provides flexible rent payment options.',
  },
  {
    title: 'How it works',
    content: 'You choose a property, subscribe, and pay monthly with ease.',
  },
  {
    title: 'Get started',
    content: 'Sign up, complete your profile, and start browsing properties.',
  },
  {
    title: 'FAQs',
    content: 'See more answers to common questions about Smallsmall.',
  },
];

function Accordion({ children }) {
  const [activeIndex, setActiveIndex] = useState(null);

  function handleClick(index) {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }

  return (
    <>
      <div className="md:w-[60%] w-full  mx-auto bg-white rounded-lg divide-y p-6">
        {children}
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={activeIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </>
  );
}

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="font-semibold">{title}</span>

        {isOpen ? <Minus /> : <Plus />}
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-gray-600">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
      )}
    </div>
  );
}

export default Accordion;
