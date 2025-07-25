import AppRoutes from './AppRoutes';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './utils/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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
        setToastShown(true);
      }

      if (onlineStatus && toastShown) {
        toast.success('You are back online.', {
          className:
            'bg-green-500 text-white text-sm px-1 py-1 rounded-md min-h-0',
          position: 'bottom-left',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          theme: 'colored',
        });
        setToastShown(false);
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [toastShown]);

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
        theme="colored"
      />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
