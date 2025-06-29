import httpClient from './http-clients';

export const signUp = async (data) => {
  const response = await httpClient.post('auth/register/', data);
  return response.data;
};

export const login = async (data) => {
  const response = await httpClient.post('auth/login/', data);
  return response.data;
};

export const requestPasswordResetOTP = async (email) => {
  const response = await httpClient.post('auth/request-otp/', email);
  return response.data;
};
export const passwordResetOTPVerification = async ({ otp }) => {
  const response = await httpClient.post('/auth/verify-otp', { otp });
  return response.data;
};

export const passwordReset = async (data) => {
  const response = await httpClient.post('auth/forgot-password', data);
  return response.data;
};
