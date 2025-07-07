import { BrowserRouter, Routes } from 'react-router-dom';
import ScrollToTop from './utils/ScrollToTop';
import { ToastContainer } from 'react-toastify';
// import AppRoutes from './Routes';
// import appRoutes from './AppRoutes';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
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
      {/* <Routes>{AppRoutes()} </Routes> */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
