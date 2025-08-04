import { useState } from 'react';
import { PropertyCard } from '../realEstateBanner/realEstateProperties/PropertyCard';
import { properties } from '../realEstateBanner/realEstateProperties/RealEstateNewProperties';

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
      <div className="bg-[url('/images/real-estate-banner.svg')] text-white p-4 pt-6 rounded-[10px] w-full bg-cover">
        <h1 className="font-bold text-5xl w-[600px] mb-3">
          Switch to a life of quality and convenience
        </h1>
        <p className="w-[450px] font-outfit">
          Choose how you would like to pay rent from any of our plans, enjoy
          convenience and control your spending every month.
        </p>

        {/* Tabs */}
        <section>
          <div className="flex items-center gap-4 mt-4 font-outfit font-extrabold">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`text-lg font-semibold ${
                  activeTab === tab.key ? 'underline' : ''
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab description */}
          {activeTab === 'rentsmall' && (
            <p className="text-sm text-gray-300 mt-2">
              Rent Smallsmall is a flexible rent payment plan that allows you to
              choose how you want to pay your rent each month.
            </p>
          )}
          {activeTab === 'upfront' && (
            <p className="text-sm text-gray-300 mt-2">
              Upfront rent lets you pay rent ahead of time for convenience and
              better planning.
            </p>
          )}
        </section>
      </div>

      {/* Property Listing */}
      <section>
        <h1>Find your new home</h1>
        <p className="font-outfit text-sm mb-3">
          Explore a wide range of listings and discover a good place to call
          your own.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
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
