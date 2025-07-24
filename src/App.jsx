import { BrowserRouter, Routes } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import { toast, ToastContainer } from 'react-toastify';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const onlineStatus = navigator.onLine;
      setIsOnline(onlineStatus);
      if (!onlineStatus && !toastShown) {
        toast.error(
          'You are currently offline. Please check your internet connection.',
          {
            className:
              'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            pauseOnHover: true,
            theme: 'colored',
          }
        );
        setToastShown(true); // Set toastShown to true after showing the toast
      } else if (onlineStatus) {
        setToastShown(false); // Reset when back online
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [toastShown]); // Add toastShown to the dependency array

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="yellow"
      />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
