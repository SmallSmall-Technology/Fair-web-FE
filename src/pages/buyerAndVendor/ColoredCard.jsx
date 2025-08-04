// ColoredCard.jsx
import React from 'react';

function ColoredCard({ title, subtitle, color, textColor = 'text-black' }) {
  return (
    <div className={`py-10 px-8 rounded-sm ${color} ${textColor} w-full`}>
      <h2 className="text-4xl mb-2">{title}</h2>
      {subtitle && <p className="text-base font-normal  mb-2">{subtitle}</p>}
    </div>
  );
}

export default ColoredCard;
