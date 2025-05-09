import { useEffect, useRef } from 'react';

const UserMenuDropdown = ({ setUserMenuIsOpen, userMenuIsOpen }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = userMenuIsOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [userMenuIsOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        userMenuIsOpen
      ) {
        setUserMenuIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuIsOpen]);

  return (
    <>
      {userMenuIsOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-0 transition-opacity duration-500 ease-in-out"
            style={{ opacity: userMenuIsOpen ? 1 : 0 }}
            onClick={() => setUserMenuIsOpen(false)}
          />

          <div
            ref={menuRef}
            className={`absolute inset-0 bg-white z-50 h-fit pb-80 top-20 bottom-shadow transform transition-all duration-500 ease-in-out ${
              userMenuIsOpen
                ? 'translate-y-0 opacity-100'
                : '-translate-y-2 opacity-0'
            }`}
          >
            <ul className="flex flex-col space-y-3 p-6 pt-2 h-full w-full">
              {[
                { label: 'My account', href: '/user-dashboard' },
                { label: 'Shopping overview', href: '' },
                { label: 'Notifications', href: '#' },
                { label: 'Account profile', href: '#' },
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-base font-semibold cursor-pointer transition-colors duration-200 hover:text-black hover:underline focus:outline-none focus:text-black"
                  onClick={() => setUserMenuIsOpen(false)}
                >
                  <a href={item.href} aria-label={item.label}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default UserMenuDropdown;
