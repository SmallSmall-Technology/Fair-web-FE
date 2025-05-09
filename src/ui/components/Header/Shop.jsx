import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const categories = [
  {
    title: 'Home & Living',
    items: [
      'Decor',
      'Furniture',
      'Kitchen & Dinning',
      'Home improvement',
      'Bed & Bath',
      'Garden & Outdoor',
      'Sales & Offers',
    ],
  },
  {
    title: 'Lifestyle & Consumer goods',
    items: [
      'Personal care',
      'Beauty',
      'Fashion',
      'Health & Wellness',
      'Baby & Mothercare',
      'Household essentials',
      'Toys',
      'Entertainment',
      'Books',
      'Sales & Offers',
    ],
  },
  {
    title: 'Electronics',
    items: [
      'Phones',
      'Computers',
      'TV',
      'Home audio & Theater',
      'Video games',
      'Gadget',
      'House appliance',
      'Accessories',
      'Sales & Offers',
    ],
  },
  {
    title: 'Food & Drink',
    items: ['Grocery', 'Confectionery', 'Beverages', 'Sales & Offers'],
  },
  {
    title: 'Real Estate',
    items: ['Rent', 'Shortlet', 'Buy'],
  },
];

const Shop = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute inset-0 bg-white h-screen overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col justify-between items-center px-4 pt-10 w-full">
          <button onClick={onClose} className=" w-full flex justify-end">
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="flex items-center text-sm w-full justify-start"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        </div>

        <h2 className="text-lg font-semibold px-4 pt-3 pb-2 border-">
          Browse departments
        </h2>
        <hr className="ml-4 w-[73%]" />
        <div className="px-4 py-4 space-y-6">
          {categories.map((group) => (
            <div key={group.title}>
              <h3 className=" underline mb-2 text-sm">{group.title}</h3>
              <div className="bg-[#F5F5F7] rounded-md p-4 space-y-2 text-sm text-gray-800 w-[80%]">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className={
                      item === 'Sales & Offers' ? 'text-rose-500 ' : ''
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-6">
          <button onClick={onClose} className="flex items-center text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
