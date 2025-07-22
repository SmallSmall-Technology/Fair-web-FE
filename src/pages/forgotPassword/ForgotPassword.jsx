import { YellowButton } from '../../utils/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSendOTP } from '../../hooks/useSendOTP';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { mutate: sendOTP, isPending } = useSendOTP((email) => {
    navigate('/reset-password', { state: { email } });
  });

  const onSubmit = (data) => {
    sendOTP(data);
  };

  return (
    <>
      <div className="flex-1 py-6 px-5 flex flex-col items-start  lg:pl-36">
        <div className="w-full">
          <div className=" flex justify-center mb-10 lg:mb-5 text-center w-full  lg:justify-end lg:pr-8">
            <Link to="/" aria-label="Fair Home">
              <img
                src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
                alt="Smallsmall Logo"
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
            {isPending ? 'Sending OTP...' : 'Continue'}
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
