import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../../utils/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';
import { passwordReset } from '../../api/authAPI';

// eslint-disable-next-line react/prop-types
const UpdatePassword = ({ email, disabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    userId: userId,
    email: email,
    password: '',
    passwordAgain: '',
  });

  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    passwordAgain: false,
  });

  useEffect(() => {
    if (email && userId) {
      setFormData((prev) => ({ ...prev, email, userId }));
    }
  }, [email, userId]);

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

    const { userId, email, password, passwordAgain } = formData;
    console.log(formData);
    if (!userId || !email || !password || !passwordAgain) {
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      return;
    }

    if (password !== passwordAgain) {
      toast.error('Passwords do not match', {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      return;
    }

    try {
      await passwordReset({ userId, email: email, password, passwordAgain });

      toast.success('Password reset successful. Please login.', {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });

      navigate('/login');
    } catch (err) {
      console.log(err);

      toast.error(err?.response?.data?.message || 'Error resetting password.', {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
    }
  };

  return (
    <form
      className={`my-3 space-y-4 w-full mx-auto${disabled != true && 'text-[#DEDEDE]'}`}
      onSubmit={handleSubmit}
    >
      {/* <h2 className="text-xl font-semibold text-center">New Password</h2> */}

      <div className="space-y-2">
        <label htmlFor="password" className="font-semibold text-xl">
          New Password
        </label>
        <div className="relative">
          <input
            type={passwordVisible.password ? 'text' : 'password'}
            id="password"
            name="password"
            // placeholder="      New Password"
            value={formData.password}
            onChange={handleChange}
            disabled={disabled}
            className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE11] disabled:opacity-50"
          />
          <img
            src="/images/key.svg"
            alt="icon"
            className="absolute top-3 left-3"
          />
          <button
            disabled={disabled}
            type="button"
            onClick={() =>
              setPasswordVisible((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            className="absolute top-3 right-3 text-gray-500 hover:text-[#FFDE11]"
          >
            {passwordVisible.password ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>

      <div className="space-y-2 pb-5">
        <label htmlFor="passwordAgain" className="font-semibold text-xl">
          Confirm Password
        </label>
        <div className="relative">
          <img
            src="/images/key.svg"
            alt="icon"
            className="absolute top-3 left-3"
          />
          <input
            type={passwordVisible.passwordAgain ? 'text' : 'password'}
            id="passwordAgain"
            name="passwordAgain"
            // placeholder="      Confirm Password"
            value={formData.passwordAgain}
            onChange={handleChange}
            disabled={disabled}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE11] disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() =>
              setPasswordVisible((prev) => ({
                ...prev,
                passwordAgain: !prev.passwordAgain,
              }))
            }
            className="absolute top-3 right-3 text-gray-500 hover:text-[#FFDE11]"
          >
            {passwordVisible.passwordAgain ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-5">
        <Link
          to="/login"
          className="block text-center mt-2 w-[102px] bg-[#222224] text-white font-bold rounded-full py-3 transition duration-200 hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#FFDE11] focus:ring-offset-2"
        >
          Cancel
        </Link>

        <div className="w-[172px]">
          <Button
            type="submit"
            className={`
        w-full
        py-3
        text-normal
        font-bold
        rounded-full
        transition duration-200
        ${
          disabled
            ? 'bg-[#DEDEDE] text-white cursor-not-allowed'
            : 'bg-[#FFDE11] text-black hover:bg-yellow-300'
        }
        focus:outline-none focus:ring-2 focus:ring-[#222224] focus:ring-offset-2
      `}
            disabled={disabled}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
