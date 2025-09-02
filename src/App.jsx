import AppRoutes from './AppRoutes';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './utils/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchUser } from './features/user/userSlice';

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [toastShown, setToastShown] = useState(false);

  // The chat app from DevRev implementation
  // useEffect(() => {
  //   window.plugSDK.init({
  //     app_id:
  //       'DvRvStPZG9uOmNvcmU6ZHZydi11cy0xOmRldm8vMW5rOE8ybGtPTzpwbHVnX3NldHRpbmcvMV9ffHxfXzIwMjUtMDUtMTkgMTI6Mjg6MTguNjEzMTU2NzgyICswMDAwIFVUQw==xlxendsDvRv',
  //   });
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
