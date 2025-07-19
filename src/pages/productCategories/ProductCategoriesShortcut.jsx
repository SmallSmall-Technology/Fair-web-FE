/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';

const SingleProductCategory = ({ subcategory }) => {
  const { category } = useParams();

  return (
    <li className="flex flex-col items-center hover:cursor-pointer transition-all duration-300 ease-in-out">
      <NavLink
        to={`/${category}/${subcategory?.slug}`}
        className={({ isActive }) =>
          `text-sm font-medium text-nowrap px-2 py-1 transition-transform duration-300 ${
            isActive ? 'border-b border-black scale-105' : ''
          }`
        }
      >
        {subcategory.name || 'No Name'}
      </NavLink>
    </li>
  );
};

export const ProductCategoriesShortcut = ({ categories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const { category } = useParams();

  // const fewCategories = [
  //   'electronics',
  //   'lifestyle',
  //   'food-drink',
  //   'real-estate',
  // ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isDropdownOpen) setSelectedDepartment(null);
  };

  // const { data } = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => getAllCategories(),
  // });
  // const categories = Array.isArray(data?.data?.categories)
  //   ? data.data.categories
  //   : [];

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

  const handleClose = () => {
    setIsDropdownOpen(false);
  };

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
    <section className="relative px-5 ">
      <div className="flex justify-start gap-5 items-center lg:pb-4">
        <div className="relative hidden md:block">
          <p
            ref={buttonRef}
            className="flex space-x-1 p-2 rounded-[20px] font-medium text-xs border border-black px-5 items-center hover:bg-gray-100 transition-colors duration-200"
          >
            <img
              src="/images/category-alt.svg"
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
                    {categories.map((cat) => (
                      <li
                        key={cat.name}
                        onClick={() => handleDepartmentClick(cat)}
                        className={`cursor-pointer py-1 transition-all duration-200 ease-in-out 
                          ${cat.name === selectedDepartment?.name ? 'font-semibold bg-[#FFF8CF]' : ''} 
                          ${cat.name === 'Sales & Offers' ? 'text-[#DB1C5E]' : 'text-gray-800'} 
                          hover:bg-[#FFF8CF] hover:scale-101 hover:shadow-sm 
                          focus: outline-none focus:bg-[#FFF8CF] focus:scale-101 focus:shadow-sm`}
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && handleDepartmentClick(cat)
                        }
                      >
                        <span className="px-4">{cat.name}</span>
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
                        {selectedDepartment.subcategories.map((sub, index) => (
                          <li key={index}>
                            <Link
                              to={`/${selectedDepartment.slug}/${sub.slug}`}
                              className="cursor-pointer rounded px-2 py-1 text-gray-700 hover:bg-yellow-100 hover:scale-105 hover:shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:bg-yellow-100 focus:scale-105 focus:shadow-sm focus:underline"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter'}
                              onClick={handleClose}
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
        <ul className="flex space-x-4 z-10">
          {category &&
            categories
              ?.find((cat) => cat.name.toLowerCase() === category.toLowerCase())
              ?.subcategories?.map((sub, index) => (
                <SingleProductCategory subcategory={sub} key={index} />
              ))}
          {/* {categories
            .filter((category) =>
              fewCategories.includes(category?.slug?.toLowerCase())
            )
            .flatMap(
              (matchedCategory) =>
                matchedCategory.subcategories?.map((sub, index) => (
                  <SingleProductCategory
                    subcategory={sub}
                    key={sub.slug || index}
                  />
                )) || []
            )} */}
        </ul>
        <Link className="hidden lg:flex font-medium text-[#DB1C5E] text-sm hover:text-[#FF4A8A] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded text-nowrap">
          Sales & Offers
        </Link>
      </div>
    </section>
  );
};
