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
    'outline-none text-sm text-[#222224] placeholder-[#222224] bg-[#F9F9F9] md:bg-transparent md:w-24';

  return (
    <form className="relative w-[90%] mx-auto mt-8 mb-6 p-6 py-2 rounded-[20px] md:rounded-full shadow-md bg-white font-outfit bg-blac">
      {/* Title (mobile only) */}
      <p className="text-center text-black text-base font-semibold mb-4 md:hidden">
        Search our listings
      </p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 items-center mx-auto justify-center w-full md:overflow-x-auto ">
        {/* Location */}
        <div className="flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-1 md:px-4 py-2 md:py-3  md:w-auto md:flex-1">
          <MapPin className="w-4 h-4 text-[#222224] mr-3" />
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
        <div className="flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-1 md:px-4 py-2 md:py-3  md:w-auto md:flex-1">
          <BedDouble className="w-4 h-4 text-[#222224] mr-3" />
          <input
            type="number"
            name="bed"
            placeholder="Bed"
            value={filters.bed}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Bath */}
        <div className="flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-1 md:px-4 py-2 md:py-3  md:w-auto md:flex-1">
          <Bath className="w-4 h-4 text-[#222224] mr-3" />
          <input
            type="number"
            name="bath"
            placeholder="Bath"
            value={filters.bath}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Furnishing */}
        <div className="flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-1 md:px-4 py-2 md:py-3  md:w-auto md:flex-1">
          <Sofa className="w-4 h-4 text-[#222224] mr-3" />
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
        <div className="flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-1 md:px-4 py-2 md:py-3  md:w-auto md:flex-1">
          <User className="w-4 h-4 text-[#222224] mr-3" />
          <input
            type="text"
            name="agent"
            placeholder="Agent"
            value={filters.agent}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Price */}
        <div className="flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-1 md:px-4 py-2 md:py-3  md:w-auto md:flex-1">
          <span className="text-[#222224] mr-2">₦</span>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={filters.price}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Search Button */}
        {/* <button
          onClick={handleSearch}
          className="absolute -translate-x-1/2 right-1 w-full md:w-auto bg-[#FFDE11] hover:bg-yellow-400 text-black font-semibold py-3 px-5 rounded-full flex items-center justify-center gap-2 mt-3 md:mt-0"
        >
          <span className=" md:hidden">Search</span>
          <Search className="w-4 h-4" />
        </button> */}
        <button
          onClick={handleSearch}
          className="md:absolute text-black md:top-1/2 md:-translate-y-1/2 right-1 bg-[#FFDE11] hover:bg-yellow-400 rounded-full p-3 flex items-center justify-center w-full md:w-fit shadow-md"
        >
          <span className=" md:hidden">Search</span>
          <Search className="w-4 h-4 text-black" />
        </button>
      </div>
    </form>
  );
};

export default FilterBar;
