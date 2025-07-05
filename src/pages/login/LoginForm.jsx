import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../../utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../../features/auth/authSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import React from 'react';

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
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.dismiss();
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className:
          'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
        bodyClassName: 'm-0 p-0',
        closeButton: false,
      });
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
    } catch (err) {
      toast.dismiss();
      toast.error(
        err?.response?.data?.message || 'Error logging in. Please try again.',
        {
          autoClose: 3000,
          className:
            'bg-[#FFDE11] text-black text-sm px-1 py-1 rounded-md min-h-0',
          bodyClassName: 'm-0 p-0',
          closeButton: false,
        }
      );
    }
  };

  return (
    <form
      className="my-3 space-y-4 w-[100%] lg:max-w-md mx-auto"
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
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE11] disabled:opacity-50"
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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE11] disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-3 right-3 text-gray-500 hover:text-[#FFDE11]"
          >
            {passwordVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full bg-[#FFDE11] text-black rounded-full py-3 text-lg font-medium hover:bg-gray-100 hover:text-black disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Log in'}
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
