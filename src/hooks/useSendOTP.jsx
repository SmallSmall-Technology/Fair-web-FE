import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { requestPasswordResetOTP } from '../api/authAPI';

export const useSendOTP = (onSuccessCallback) =>
  useMutation({
    mutationFn: (email) => requestPasswordResetOTP(email),
    onSuccess: (_, email) => {
      toast.success(`OTP sent to ${email.email}`, {
        autoClose: 2000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
      if (onSuccessCallback) onSuccessCallback(email);
    },
    onError: (error) => {
      const msg = error?.response?.data?.message || 'Failed to send OTP';
      toast.error(msg, {
        autoClose: 3000,
        className:
          'bg-[var(--yellow-primary)] text-black text-sm px-2 py-2 rounded-md',
        closeButton: false,
      });
    },
  });
