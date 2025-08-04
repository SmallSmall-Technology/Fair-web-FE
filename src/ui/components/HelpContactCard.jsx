import React from 'react';
import { Link } from 'react-router-dom';

function HelpContactCard() {
  return (
    <div className="bg-[#F6F6F6] rounded-2xl md:py-12 md:px-28 max-w-2xl my-40 mx-auto text-center">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Need more help
      </h2>
      <p className="text-gray-700 mb-6">
        Get the help you need from our automated assistant, or contact an agent
      </p>
      <Link
        to="/contact"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md inline-block transition duration-300"
      >
        Contact us
      </Link>
    </div>
  );
}

export default HelpContactCard;
