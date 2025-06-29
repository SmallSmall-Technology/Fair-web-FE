import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export const departments = [
  {
    name: 'Home & Living',
    subcategories: [
      { name: 'Decor', link: '/home-living-decor' },
      { name: 'Furniture', link: '/home-living-furniture' },
      { name: 'Kitchen & Dining', link: '/home-living-kitchen-dining' },
      { name: 'Bed & Bath', link: '/home-living-bed-bath' },
      { name: 'Garden & Outdoor', link: '/home-living-garden-outdoor' },
      { name: 'Home Improvement', link: '/home-living-home-improvement' },
    ],
  },
  {
    name: 'Lifestyle & Consumer goods',
    subcategories: [
      { name: 'Personal Care', link: '/lifestyle-personal-care' },
      { name: 'Beauty', link: '/lifestyle-beauty' },
      { name: 'Fashion', link: '/lifestyle-fashion' },
      { name: 'Health & Wellness', link: '/lifestyle-health-wellness' },
      { name: 'Baby & Mother care', link: '/lifestyle-baby-mother' },
      { name: 'Household Essentials', link: '/lifestyle-household-essentials' },
      { name: 'Toys', link: '/lifestyle-toys' },
      { name: 'Entertainment', link: '/lifestyle-entertainment' },
      { name: 'Books', link: '/lifestyle-books' },
    ],
  },
  {
    name: 'Electronics',
    subcategories: [
      { name: 'Phones', link: '/electronics-phones' },
      { name: 'Computers', link: '/electronics-computers' },
      { name: 'TV', link: '/electronics-tv' },
      { name: 'Home Audio & Theater', link: '/electronics-audio-theater' },
      { name: 'Video Games', link: '/electronics-video-games' },
      { name: 'Gadgets', link: '/electronics-gadgets' },
      { name: 'House Appliances', link: '/electronics-house-appliances' },
      { name: 'Accessories', link: '/electronics-accessories' },
    ],
  },
  {
    name: 'Food & Drink',
    subcategories: [
      { name: 'Groceries', link: '/food-drink-groceries' },
      { name: 'Confectioneries', link: '/food-drink-confectioneries' },
      { name: 'Beverages', link: '/food-drink-beverages' },
    ],
  },
  {
    name: 'Real estate',
    subcategories: [
      { name: 'RentSmallsmall', link: '/real-estate-rentsmallsmall' },
      { name: 'StaySmallsmall', link: '/real-estate-staysmallsmall' },
      { name: 'BuySmallsmall', link: '/real-estate-buysmallsmall' },
    ],
  },
  {
    name: 'Education & Training',
    subcategories: [
      { name: 'Online Courses', link: '/education-online-courses' },
      { name: 'Books', link: '/education-books' },
      { name: 'Tutorials', link: '/education-tutorials' },
      { name: 'Certifications', link: '/education-certifications' },
      { name: 'Workshops', link: '/education-workshops' },
      { name: 'Educational Toys', link: '/education-educational-toys' },
    ],
  },
  {
    name: 'Automotive',
    subcategories: [
      { name: 'Cars', link: '/automotive-cars' },
      { name: 'Motorcycles', link: '/automotive-motorcycles' },
      { name: 'Parts & Accessories', link: '/automotive-parts-accessories' },
      { name: 'Tires', link: '/automotive-tires' },
      { name: 'Car Care', link: '/automotive-car-care' },
      { name: 'Tools & Equipment', link: '/automotive-tools-equipment' },
    ],
  },
  {
    name: 'Sales & Offers',
    link: '/sales-offers',
    subcategories: [
      { name: 'Discounts', link: '/sales-offers-discounts' },
      { name: 'Clearance', link: '/sales-offers-clearance' },
      { name: 'Promotions', link: '/sales-offers-promotions' },
      { name: 'Bundle Deals', link: '/sales-offers-bundle-deals' },
      { name: 'Seasonal Sales', link: '/sales-offers-seasonal-sales' },
      { name: 'Gift Cards', link: '/sales-offers-gift-cards' },
    ],
  },
];

const SingleProductCategory = ({ product }) => {
  return (
    <li className="flex flex-col items-center hover:cursor-pointer hover:shadow-[0px_4px_0px_rgba(0,0,0,0.2)] hover:scale-105 hover:text-blue-600 transition-all duration-300 ease-in-out focus-within:scale-105 focus-within:text-blue-600">
      <NavLink
        to={product.link}
        className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
      >
        <p className="text-sm font-medium text-nowrap">{product.name}</p>
      </NavLink>
    </li>
  );
};

export const ProductCategoriesShortcut = ({ categories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isDropdownOpen) setSelectedDepartment(null);
  };

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
        setSelectedDepartment(null);
      }
    };

    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isDropdownOpen]);

  const overlayStyle =
    buttonRef.current && isDropdownOpen
      ? {
          top: `${buttonRef.current.getBoundingClientRect().bottom + window.scrollY}px`,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'fixed',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 20,
        }
      : {};

  return (
    <section className="relative px-5">
      <div className="flex justify-start gap-5 items-center lg:pb-4">
        <div className="relative">
          <p
            ref={buttonRef}
            className="flex space-x-1 p-2 rounded-[20px] font-medium text-xs border px-5 items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <img
              src="/public/images/category-alt.svg"
              alt="category icon"
              width={15}
            />
            <button
              onClick={toggleDropdown}
              className="appearance-none bg-transparent outline-none cursor-pointer focus:ring-2 focus:ring-blue-400 rounded"
            >
              <p>Department</p>
            </button>
          </p>
          {isDropdownOpen && (
            <>
              <div style={overlayStyle} onClick={toggleDropdown} />
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 mt-2 bg-white rounded-b-[10px] shadow-lg z-30 flex"
              >
                <div className="py-2 w-64">
                  <h3 className="font-semibold text-sm px-4">
                    All Departments
                  </h3>
                  <hr className="my-2 mx-4" />
                  <ul className="mt-2 space-y-2">
                    {departments.map((dept) => (
                      <li
                        key={dept.name}
                        onClick={() => handleDepartmentClick(dept)}
                        className={`cursor-pointer py-1 transition-all duration-200 ease-in-out 
                          ${dept.name === selectedDepartment?.name ? 'font-semibold bg-[#FFF8CF]' : ''} 
                          ${dept.name === 'Sales & Offers' ? 'text-[#DB1C5E]' : 'text-gray-800'} 
                          hover:bg-[#FFF8CF] hover:scale-101 hover:shadow-sm 
                          focus:outline-none focus:bg-[#FFF8CF] focus:scale-101 focus:shadow-sm`}
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && handleDepartmentClick(dept)
                        }
                      >
                        <span className="px-4">{dept.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selectedDepartment &&
                  selectedDepartment.subcategories.length > 0 && (
                    <div className="p-4 bg-[#FFF8CF] w-64 rounded-b-[10px]">
                      <h3 className="font-semibold text-sm">
                        {selectedDepartment.name}
                      </h3>
                      <hr className="border-black my-2" />
                      <ul className="mt-2 space-y-2">
                        {/* {selectedDepartment.subcategories.map((sub, index) => ( */}
                        {selectedDepartment.subcategories.map((sub, index) => (
                          <li key={index}>
                            <Link
                              to={sub.link}
                              className="cursor-pointer rounded px-2 py-1 text-gray-700 hover:bg-yellow-100 hover:scale-105 hover:shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:bg-yellow-100 focus:scale-105 focus:shadow-sm"
                              tabIndex={0}
                              onKeyDown={(e) =>
                                e.key === 'Enter' &&
                                console.log(`Selected ${sub.name}`)
                              }
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </>
          )}
        </div>
        <ul className="flex space-x-6 overflow-x-auto">
          {/* console.log(departments[0].subcategories[0].name); */}

          {/* {departments[0].subcategories.map((product, index) => ( */}
          {categories.map((product, index) => (
            <SingleProductCategory product={product} key={index} />
          ))}
        </ul>
        <Link className="hidden lg:flex font-medium text-[#DB1C5E] text-sm hover:text-[#FF4A8A] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded">
          Sales & Offers
        </Link>
      </div>
    </section>
  );
};
