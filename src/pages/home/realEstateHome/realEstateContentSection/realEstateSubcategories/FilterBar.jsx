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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const selectClass =
    'bg-[#F9F9F9] md:bg-transparent text-sm text-[#222224] outline-none w-full';

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-[90%] mx-auto mt-8 mb-6 p-3 md:pl-6 md:pr-14 py-2 md:py-1 rounded-[20px] md:rounded-full shadow-md bg-white font-outfit"
    >
      {/* Title (mobile only) */}
      <p className="text-center text-black text-base font-semibold mt-2 mb-4 md:hidden">
        Search our listings
      </p>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 items-center mx-auto justify-center w-full md:overflow-x-auto custom-scrollbar-hidden">
        {/* Location */}
        <div className="w-full flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-2 py-2 md:py-3 md:w-auto md:flex-1">
          <MapPin className="w-4 h-4 text-[#222224] mr-3" />
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Location</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="PH">Port Harcourt</option>
          </select>
        </div>

        {/* Bed & Bath */}
        <div className="flex justify-between gap-2 w-full md:w-fit">
          <div className="w-1/2 flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-2 md:px-4 py-2 md:py-3 md:flex-1">
            <BedDouble className="w-4 h-4 text-[#222224] mr-3" />
            <select
              name="bed"
              value={filters.bed}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Bed</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Bed</option>
              <option value="3">3+ Bed</option>
            </select>
          </div>

          <div className="w-1/2 flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-2 md:px-4 py-2 md:py-3 md:flex-1">
            <Bath className="w-4 h-4 text-[#222224] mr-3" />
            <select
              name="bath"
              value={filters.bath}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Bath</option>
              <option value="1">1 Bath</option>
              <option value="2">2 Bath</option>
              <option value="3">3+ Bath</option>
            </select>
          </div>
        </div>

        {/* Furnishing & Agent */}
        <div className="flex justify-between gap-2 w-full md:w-fit">
          <div className="w-1/2 flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-2 md:px-4 py-2 md:py-3 md:flex-1">
            <Sofa className="w-4 h-4 text-[#222224] mr-3" />
            <select
              name="furnishing"
              value={filters.furnishing}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Furnishing</option>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="semi">Semi-Furnished</option>
            </select>
          </div>

          <div className="w-1/2 flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-2 md:px-4 py-2 md:py-3 md:flex-1">
            <User className="w-4 h-4 text-[#222224] mr-3" />
            <select
              name="agent"
              value={filters.agent}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">Agent</option>
              <option value="verified">Verified</option>
              <option value="non-verified">Non-Verified</option>
            </select>
          </div>
        </div>

        {/* Price */}
        <div className="w-full flex items-center bg-[#F9F9F9] rounded-full md:rounded-md px-2 py-2 md:py-3 md:flex-1">
          <span className="text-[#222224] mr-2">₦</span>
          <select
            name="price"
            value={filters.price}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="">Price</option>
            <option value="0-500000">₦0 - ₦500k</option>
            <option value="500000-1000000">₦500k - ₦1M</option>
            <option value="1000000+">₦1M+</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="mb-4 md:absolute text-black md:top-1/2 md:-translate-y-1/2 right-1 bg-[#FFDE11] hover:bg-yellow-400 rounded-full p-3 flex items-center justify-center w-full md:w-fit shadow-md"
        >
          <span className="md:hidden mr-2">Search</span>
          <Search className="w-4 h-4 text-black" />
        </button>
      </div>
    </form>
  );
};

export default FilterBar;
