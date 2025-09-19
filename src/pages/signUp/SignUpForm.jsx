import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Button, CustomButton } from '../../utils/Button';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../../api/authAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUpForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const { mutate: signUpUser, isPending: isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success('Account created successfully! Please log in.', {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      navigate('/login');
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || 'Something went wrong';
      const errors = error?.response?.data?.errors;

      if (errors) {
        setFormErrors(errors);
      } else {
        toast.error(errorMessage, {
          autoClose: 3000,
          className:
            'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        });
      }
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      phoneNumber: data.phoneNumber.replace(/^0/, '+234'),
    };

    signUpUser(formattedData);
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
        {formErrors?.email?.length > 0 && (
          <span className="text-red-500 text-sm">{formErrors.email[0]}</span>
        )}
      </div>

      <div className="mb-3">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Phone number
        </label>
        <input
          type="text"
          id="phoneNumber"
          placeholder="Phone number"
          className={`mt-1 block w-full px-3 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 
                      ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Invalid phone number',
            },
          })}
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-sm">
            {errors.phoneNumber.message}
          </span>
        )}

        {formErrors?.phoneNumber?.length > 0 && (
          <span className="text-red-500 text-sm">
            {formErrors.phoneNumber[0]}
          </span>
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

      <CustomButton
        type="submit"
        text={
          isLoading ? (
            <div className="flex items-center justify-center">
              <span className="font-inter mr-1">Creating account...</span>
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
            </div>
          ) : (
            'Create account'
          )
        }
        bgColor="var(--yellow-primary)"
        hoverColor="var(--btn-hover-bg-primary)"
        width="100%"
        textSize="1.125rem"
        fontWeight="500"
        disabled={isLoading}
        className="mt-4 py-3 px-6 border-2 border-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SignUpForm;
