import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const categories = [
  {
    title: 'Home & Living',
    items: [
      { name: 'Decor', icon: '/images/decor.svg' },
      { name: 'Furniture', icon: '/images/furniture.svg' },
      { name: 'Bed & Bath', icon: '/images/bed.svg' },
      { name: 'Kitchen & Dinning', icon: '/images/kitchen.svg' },
      { name: 'Garden & outdoor', icon: '/images/garden.svg' },
      { name: 'Home improvement', icon: '/images/home.svg' },
    ],
  },
  {
    title: 'Lifestyle & Consumer goods',
    items: [
      { name: 'Personal care', icon: '/images/personal.svg' },
      { name: 'Toys', icon: '/images/toys.svg' },
      { name: 'Beauty', icon: '/images/beauty.svg' },
      { name: 'Fashion', icon: '/images/fashion.svg' },
      { name: 'Household essentials', icon: '/images/household.svg' },
      { name: 'Entertainment', icon: '/images/entertainment.svg' },
      { name: 'Books', icon: '/images/books.svg' },
      { name: 'Baby&Mother care', icon: '/images/baby.svg' },
      { name: 'Health&wellness', icon: '/images/health.svg' },
    ],
  },
  {
    title: 'Electronics',
    items: [
      { name: 'Phones', icon: '/images/phone.svg' },
      { name: 'Computers', icon: '/images/computers.svg' },
      { name: 'TV', icon: '/images/tv.svg' },
      { name: 'Home Appliances', icon: '/images/home-appliances.svg' },
      { name: 'Gadgets', icon: '/images/gadgets.svg' },
      { name: 'Accessories', icon: '/images/accessories.svg' },
      { name: 'Home audio&Theater', icon: '/images/audio.svg' },
      { name: 'Video games', icon: '/images/games.svg' },
    ],
  },
  {
    title: 'Food & Drink',
    items: [
      { name: 'Grocery', icon: '/images/grocery.svg' },
      { name: 'Confectionery', icon: '/images/confectionery.svg' },
      { name: 'Beverage', icon: '/images/beverages.svg' },
    ],
  },
  {
    title: 'Real Estate',
    items: [
      { name: 'RentSmallsmall' },
      { name: 'StaySmallsmall' },
      { name: 'BuySmallsmall' },
    ],
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
        className={`absolute top-0 left-0 w-full h-full bg-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex justify-end px-4 pt-6">
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 pt-4 pb-2">
            <h2 className="text-xl font-semibold">Browse departments</h2>
            <hr className="mt-2" />
          </div>
        </div>

        <div className="px-4 py-4 space-y-6 overflow-y-auto h-[calc(100%-100px)]">
          {categories.map((group) => (
            <div key={group.title}>
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex space-x-2 items-center justify-center px-4 py-2 rounded-full text-sm bg-[#F5F5F7] hover:bg-gray-200 transition whitespace-nowrap"
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-[30px] h-[30px] mr-1"
                      />
                    )}
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-8">
            <button onClick={onClose} className="flex items-center text-sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
