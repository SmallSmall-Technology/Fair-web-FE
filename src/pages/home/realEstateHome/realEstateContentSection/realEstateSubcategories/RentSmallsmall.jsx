import { useState } from 'react';
import { PropertyCard } from '../realEstateBanner/realEstateProperties/PropertyCard';
import { properties } from '../realEstateBanner/realEstateProperties/RealEstateNewProperties';
import FilterBar from './FilterBar';

export const RentSmallsmall = () => {
  // Track active tab
  const [activeTab, setActiveTab] = useState('rentsmall');

  const tabs = [
    { key: 'rentsmall', label: 'RentSmallsmall' },
    { key: 'upfront', label: 'Upfront rent' },
  ];

  return (
    <div className="grid gap-8">
      {/* Banner */}
      <div className="relative w-full rounded-[10px] overflow-hidden">
        {/* Background Image */}
        <div className="bg-[url('/images/real-estate-banner.svg')] bg-cover bg-no-repeat bg-center w-full h-full absolute inset-0"></div>

        {/* Color Overlay */}
        <div className="absolute inset-0 bg-[#22222433]" />

        {/* Content */}
        <div className="relative text-white p-4 lg:p-6 pt-10">
          <h1 className="font-semibold lg:font-bold text-4xl text-balance lg:text-5xl lg:w-[600px] mb-3">
            Switch to a life of quality{' '}
            <span className="hidden md:block">and</span>{' '}
            <span className=" md:hidden">&</span> convenience
          </h1>
          <p className="lg:w-[450px] font-outfit font-normal">
            Choose how you would like to pay rent from any of our plans, enjoy
            convenience and control your spending every month.
          </p>

          {/* Tabs */}
          <section className="flex flex-col justify-center items-center mt-10">
            <div className="flex items-center gap-1 md:gap-10 mt-4 font-outfit font-extrabold">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`text-lg font-semibold ${
                    activeTab === tab.key
                      ? 'border-b-4 border-white'
                      : 'border-b-4 border-transparent'
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab description */}
            {activeTab === 'rentsmall' && <FilterBar />}
            {activeTab === 'upfront' && <FilterBar />}
          </section>
        </div>
      </div>

      {/* Property Listing */}
      <section>
        <h1 className="text-[25px] font-bold">Find your new home</h1>
        <p className="font-outfit text-sm mb-3">
          Explore a wide range of listings and discover a good place to call
          your own.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
          {properties.slice(0, 8).map((property, index) => (
            <div key={index} className="mb-6">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
