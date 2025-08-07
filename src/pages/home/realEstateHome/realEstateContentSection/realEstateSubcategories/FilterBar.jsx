import React, { useState } from 'react';
import { MapPin, BedDouble, Bath, Sofa, User, Search } from 'lucide-react';

const FilterBar = () => {
  const [filters, setFilters] = useState({
    location: '',
    bed: '',
    bath: '',
    furnishing: '',
    agent: '',
    price: '',
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {};

  const inputClass =
    'outline-none text-sm text-[#222224] placeholder-[#222224] bg-transparent w-24';

  return (
    <div className="relative w-[90%] mt-10 mb-4 mx-auto font-outfit">
      {/* Main Filter Input */}
      <div className="flex items-center bg-white rounded-full shadow-md px-6 py-3 overflow-x-auto w-full">
        {/* Location */}
        <div className="flex items-center space-x-2 border-r border-[#E5E5E5] pr-6 mr-6">
          <MapPin className="w-4 h-4 text-[#222224]" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Bed */}
        <div className="flex items-center space-x-2 border-r border-[#E5E5E5] pr-6 mr-6">
          <BedDouble className="w-4 h-4 text-[#222224]" />
          <input
            type="number"
            name="bed"
            placeholder="Bed"
            value={filters.bed}
            onChange={handleChange}
            className={`${inputClass} w-16`}
          />
        </div>

        {/* Bath */}
        <div className="flex items-center space-x-2 border-r border-[#E5E5E5] pr-6 mr-6">
          <Bath className="w-4 h-4 text-[#222224]" />
          <input
            type="number"
            name="bath"
            placeholder="Bath"
            value={filters.bath}
            onChange={handleChange}
            className={`${inputClass} w-16`}
          />
        </div>

        {/* Furnishing */}
        <div className="flex items-center space-x-2 border-r border-[#E5E5E5] pr-6 mr-6">
          <Sofa className="w-4 h-4 text-[#222224]" />
          <input
            type="text"
            name="furnishing"
            placeholder="Furnishing"
            value={filters.furnishing}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Agent */}
        <div className="flex items-center space-x-2 border-r border-[#E5E5E5] pr-6 mr-6">
          <User className="w-4 h-4 text-[#222224]" />
          <input
            type="text"
            name="agent"
            placeholder="Agent"
            value={filters.agent}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Price with Naira Sign */}
        <div className="flex items-center space-x-2">
          <span className="text-[#222224] ">₦</span>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={filters.price}
            onChange={handleChange}
            className={`${inputClass} w-20`}
          />
        </div>
      </div>

      {/* Floating Search Button */}
      <button
        onClick={handleSearch}
        className="absolute top-1/2 -translate-y-1/2 right-1 bg-[#FFDE11] hover:bg-yellow-400 rounded-full p-3 flex items-center justify-center shadow-md"
      >
        <Search className="w-4 h-4 text-black" />
      </button>
    </div>
  );
};

export default FilterBar;
