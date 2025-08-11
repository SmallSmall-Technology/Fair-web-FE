import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '../../utils/Button';
import { useDispatch } from 'react-redux';
import { clearError } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { passwordReset } from '../../api/authAPI';
import { useMutation } from '@tanstack/react-query';

const UpdatePassword = ({ email, disabled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: email || '',
    password: '',
    passwordAgain: '',
  });

  const [passwordVisible, setPasswordVisible] = useState({
    password: false,
    passwordAgain: false,
  });

  useEffect(() => {
    if (email) {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [email]);

  const mutation = useMutation({
    mutationFn: ({ email, password, passwordAgain }) =>
      passwordReset({ email, password, passwordAgain }),
    onSuccess: () => {
      toast.success('Password reset successful. Please login.', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      navigate('/login');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Error resetting password.', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
    },
  });

  const handleChange = (e) => {
    dispatch(clearError());
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, passwordAgain } = formData;
    if (!email || !password || !passwordAgain) {
      toast.error('Please fill in all fields', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      return;
    }

    if (password !== passwordAgain) {
      toast.error('Passwords do not match', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      return;
    }

    mutation.mutate({ email, password, passwordAgain });
  };

  return (
    <form
      className={`my-3 space-y-4 w-full mx-auto ${
        disabled ? 'text-[#DEDEDE]' : ''
      }`}
      onSubmit={handleSubmit}
    >
      {/* New Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="font-semibold text-xl">
          New Password
        </label>
        <div className="relative">
          <input
            type={passwordVisible.password ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={disabled}
            className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-[var(--yellow-primary)] disabled:opacity-50"
          />
          <img
            src="/images/key.svg"
            alt="icon"
            className="absolute top-3 left-3"
          />
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              setPasswordVisible((prev) => ({
                ...prev,
                password: !prev.password,
              }))
            }
            className="absolute top-3 right-3 text-gray-500 hover:text-bg-[var(--yellow-primary)]"
          >
            {passwordVisible.password ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label htmlFor="passwordAgain" className="font-semibold text-xl">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={passwordVisible.passwordAgain ? 'text' : 'password'}
            id="passwordAgain"
            name="passwordAgain"
            value={formData.passwordAgain}
            onChange={handleChange}
            disabled={disabled}
            className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bg-[var(--yellow-primary)] disabled:opacity-50"
          />
          <img
            src="/images/key.svg"
            alt="icon"
            className="absolute top-3 left-3"
          />
          <button
            type="button"
            disabled={disabled}
            onClick={() =>
              setPasswordVisible((prev) => ({
                ...prev,
                passwordAgain: !prev.passwordAgain,
              }))
            }
            className="absolute top-3 right-3 text-gray-500 hover:text-bg-[var(--yellow-primary)]"
          >
            {passwordVisible.passwordAgain ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between space-x-5">
        <Link
          to="/login"
          className="block text-center mt-2 w-[102px] bg-[#222224] text-white font-bold rounded-full py-3 hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-bg-[var(--yellow-primary)] focus:ring-offset-2"
        >
          Cancel
        </Link>

        <div className="w-[172px]">
          <Button
            type="submit"
            className={`w-full py-3 text-normal font-bold rounded-full transition duration-200 ${
              disabled
                ? 'bg-[#DEDEDE] text-white cursor-not-allowed'
                : 'bg-[var(--yellow-primary)] text-black hover:bg-yellow-300'
            } focus:outline-none focus:ring-2 focus:ring-[#222224] focus:ring-offset-2`}
            disabled={disabled || mutation.isLoading}
          >
            {mutation.isLoading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
