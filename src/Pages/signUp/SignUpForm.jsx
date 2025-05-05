import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../../utils/Button';

function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                      ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone number
        </label>
        <input
          type="text"
          id="phone"
          placeholder="Phone number"
          className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                      ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Invalid phone number',
            },
          })}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                        ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          <button
            type="button"
            id="al"
            aria-label="Eye visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1 right-2 text-gray-500 hover:text-yellow-500 w-11 h-11 flex items-center justify-center rounded"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {/* <button
            type="button"
            id="al"
            aria-label="Toggle password visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-1 right-2 text-gray-500 hover:text-yellow-500 w-11 h-11 flex items-center justify-center rounded"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button> */}
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="w-full mt-4 py-3 px-6 text-lg font-medium text-black bg-[#FFDE11] rounded-full border-2 border-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
      >
        Create account
      </Button>
    </form>
  );
}

export default SignUpForm;
