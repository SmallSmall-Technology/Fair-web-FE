import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../../utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/auth/authSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { transferGuestCartToUser } from '../../features/cart/cartSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      toast.dismiss();
      toast.success('Login successful!', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (error) {
      setFormData((prev) => ({ ...prev, password: '' }));
    }
  }, [error]);

  const handleChange = (e) => {
    if (error) dispatch(clearError());
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!formData.email || !formData.password) {
  //     toast.dismiss();
  //     toast.error('Please fill in all fields', {
  //       autoClose: 3000,
  //       className:
  //         'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
  //       bodyClassName: 'm-0 p-0',
  //       closeButton: false,
  //     });
  //     return;
  //   }

  //   try {
  //     await dispatch(login(formData)).unwrap();
  //   } catch (err) {
  //     toast.dismiss();
  //     toast.error(
  //       err?.response?.data?.message || 'Error logging in. Please try again.',
  //       {
  //         autoClose: 3000,
  //         className:
  //           'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
  //         bodyClassName: 'm-0 p-0',
  //         closeButton: false,
  //       }
  //     );
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.dismiss();
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      return;
    }
    try {
      await dispatch(login(formData)).unwrap(); // Only this try/catch is for login errors

      // If we reach here, login succeeded
      const guestCartSessionID = localStorage.getItem('cartSessionID');
      console.log(
        'cartSessionID in localStorage:',
        localStorage.getItem('cartSessionID')
      );

      if (guestCartSessionID) {
        try {
          await dispatch(
            transferGuestCartToUser({ cartSessionID: guestCartSessionID() })
          ).unwrap();
          localStorage.removeItem('cartSessionID');
        } catch (cartError) {
          console.error('Failed to transfer guest cart:', cartError);
          // Optional toast for cart error
          toast.error('Some items could not be transferred from guest cart.');
        }
      }
    } catch (err) {
      // This only runs if login itself failed
      toast.dismiss();
      toast.error(
        err?.response?.data?.message || 'Error logging in. Please try again.',
        {
          autoClose: 3000,
          className:
            'bg-[var(--yellow-primary)] text-black text-sm px-1 py-1 rounded-md min-h-0',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
        }
      );
    }
  };

  return (
    <form
      className="my-3 space-y-4 w-[100%] md:max-w-sm lg:max-w-md lg:flex flex-col justify-start "
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium sr-only">
          Email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-[var(--yellow-primary)]  disabled:opacity-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium sr-only">
          Password
        </label>
        <div className="relative">
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-[var(--yellow-primary)]  disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-3 right-3 text-gray-500 hover:text-bg-[var(--yellow-primary)] "
          >
            {passwordVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-[var(--yellow-primary)] text-black rounded-full py-3 text-lg font-medium  hover:text-black disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="font-inter mr-1">Logging in...</span>
            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
          </>
        ) : (
          'Log in'
        )}
      </Button>

      <Link
        to="/forgot-password"
        className="font-semibold flex justify-center mt-2"
      >
        Forgot Password?
      </Link>
    </form>
  );
};

export default LoginForm;
