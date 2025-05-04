import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

const Shop = ({ setHamburgerIsOpen, shopIsOpen, setShopIsOpen }) => {
  return (
    <>
      <AnimatePresence>
        {shopIsOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShopIsOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute inset-0 bg-white z-50 h-screen"
            >
              <button
                className="w-full flex justify-end pt-5 pr-5"
                onClick={() => setShopIsOpen(false)}
              >
                <X />
              </button>

              <button
                className="text-sm pl-6 mb-4 flex justify-start items-center"
                onClick={() => setShopIsOpen(false)}
              >
                <span className="mr-2">
                  <ArrowLeft size={10.5} />
                </span>
                Back
              </button>

              <h1 className="font-medium text-xl pl-6">Categories</h1>
              <ul className="flex flex-col space-y-3 p-6 pt-2 w-full">
                {[
                  { label: 'Men', href: '/category/beauty' },
                  { label: 'Women', href: '/category/beauty' },
                  { label: 'Groceries', href: '#' },
                  { label: 'Home&Office', href: '#' },
                  { label: 'Computers', href: '/category/electronics' },
                  { label: 'Power', href: '/category/electronics' },
                  { label: 'Electronics', href: '/category/electronics' },
                  { label: 'Phones', href: '/category/electronics' },
                  { label: 'Kids', href: '/category/toys' },
                  { label: 'Sports Items', href: '/category/toys' },
                  { label: 'Health&Beauty', href: '/category/beauty' },
                  {
                    label: 'Mobile accessories',
                    href: '/category/electronics',
                  },
                  { label: 'Toys&Games', href: '/category/toys' },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="text-lg font-normal text-[#96959F] cursor-pointer transition-colors duration-200 hover:text-black hover:underline focus:outline-none focus:text-black"
                  >
                    <a href={item.href} aria-label={item.label}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <button
                  className="text-sm mb-4 flex justify-start items-center"
                  onClick={() => setHamburgerIsOpen(true)}
                >
                  <span className="mr-2">
                    <ArrowLeft size={10.5} />
                  </span>
                  Back
                </button>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Shop;
