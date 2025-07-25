import React from 'react';

const ScrollableCards = ({ cards }) => {
  return (
    <div className="overflow-x-auto md:overflow-x-visible py-4 md:pb-32">
      <div className="flex space-x-4 px-4 md:justify-center min-w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-64 bg-[#FFDE11] px-6 py-10 rounded-lg shadow-sm flex-shrink-0"
          >
            <h3 className="font-bold text-lg mb-20">{card.title}</h3>
            <p className="text-sm leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCards;
