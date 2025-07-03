/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { passwordResetOTPVerification } from '../../api/authAPI';
import { toast } from 'react-toastify';
import { Check, X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { setUserId } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useSendOTP } from '../../hooks/useSendOTP';

const OtpInput = ({
  control,
  name = 'otp',
  length = 4,
  onAutoSubmit,
  verified,
}) => {
  const inputRefs = useRef([]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      rules={{
        required: 'OTP is required',
        validate: (val) =>
          val.length === length || `OTP must be ${length} digits`,
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleChange = (e, index) => {
          const val = e.target.value;
          if (!/^\d?$/.test(val)) return;

          const otpArray = value.split('');
          otpArray[index] = val;
          const newOtp = otpArray.join('').padEnd(length, '');
          onChange(newOtp);

          if (val && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
          }

          if (
            newOtp.length === length &&
            !newOtp.includes('') &&
            onAutoSubmit
          ) {
            setTimeout(() => onAutoSubmit(), 150);
          }
        };

        const handleKeyDown = (e, index) => {
          if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
        };

        return (
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2 justify-center">
              {[...Array(length)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-[54px] h-[55px] text-center font-bold text-2xl border border-[#DBDBDB] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-[#F05929]"
                  value={value[i] || ''}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  ref={(el) => (inputRefs.current[i] = el)}
                  disabled={verified}
                />
              ))}
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-1 text-center">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default function VerifyOtp({ verified, setVerified, email }) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const [timeLeft, setTimeLeft] = useState(50);

  // ✅ Resend OTP mutation with timer reset
  const { mutate: resendOTP } = useSendOTP(() => {
    toast.success('OTP resent');
    setTimeLeft(50);
  });

  // ✅ OTP verification mutation
  const otpMutation = useMutation({
    mutationFn: passwordResetOTPVerification,
    onSuccess: (response) => {
      const userId = response.data.userID;
      dispatch(setUserId(userId));

      toast.success('OTP verified successfully', {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });

      setVerified(true);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Verification failed', {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      setVerified(false);
    },
  });

  const onSubmit = (data) => {
    if (timeLeft <= 0) {
      toast.error('OTP has expired. Please request a new one.', {
        autoClose: 3000,
        className: 'bg-[#FFDE11] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      return;
    }

    otpMutation.mutate({ otp: data.otp });
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-start gap-4 mt-6 w-full"
    >
      <OtpInput
        control={control}
        name="otp"
        length={4}
        onAutoSubmit={() => handleSubmit(onSubmit)()}
        verified={verified}
      />

      {!verified && (
        <div>
          {timeLeft > 0 ? (
            <div className="text-sm text-gray-600 text-center">
              OTP expires in:{' '}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
          ) : (
            <div className="text-sm text-gray-600 text-center">
              OTP expired
              <button
                type="button"
                className="font-semibold ml-2 text-blue-600 hover:underline"
                onClick={() => resendOTP({ email })}
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>
      )}

      {verified === true && (
        <p className="text-[#68BD45] text-[15px] flex items-center gap-2">
          Code verified <Check color="#68BD45" />
        </p>
      )}
      {verified === false && (
        <p className="text-[#bd4545] text-[15px] flex items-center gap-2">
          Check code again <X color="#bd4545" />
        </p>
      )}
      {!verified && (
        <button type="submit" className="bg-black text-white py-2 rounded-md">
          Verify
        </button>
      )}
    </form>
  );
}
