import React from 'react';
import { YellowButton } from '../../utils/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { requestPasswordResetOTP } from '../../api/authAPI';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (email) => {
    try {
      await requestPasswordResetOTP(email);
      toast.success(`OTP sent to ${email.email}`, {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to send OTP';
      toast.error(msg, {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
    }
  };

  return (
    <>
      {/* <div className=""> */}
      <div className="flex-1 py-6 px-5 flex flex-col items-start  lg:pl-36">
        <div className="w-full">
          <div className=" flex justify-center mb-10 lg:mb-5 text-center w-full  lg:justify-end lg:pr-8">
            <Link to="/" aria-label="Fair Home">
              <img
                src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
                alt="Fair Logo"
                width={120}
                height={40}
                loading="eager"
                decoding="defer"
              />
            </Link>
          </div>
        </div>
      </div>
      <section className="px-5 md:w-[480px] mx-auto grid gap-3">
        <h1 className="font-semibold text-4xl">Reset password</h1>
        <p className="font-normal text-balance">
          Enter your email address and we will send you instructions to reset
          your password.
        </p>
        <form action="submit" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 mb-5">
            <label htmlFor="email" className="text-sm font-medium sr-only">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <YellowButton>
            {isSubmitting ? 'Sending OTP...' : 'Continue'}
          </YellowButton>
          <Link to="/" className="mt-3 flex justify-center">
            Back to Fair
          </Link>
        </form>
      </section>
      {/* </div> */}
    </>
  );
};

export default ForgotPassword;
